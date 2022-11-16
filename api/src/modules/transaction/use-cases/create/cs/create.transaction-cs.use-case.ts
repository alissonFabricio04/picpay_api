import { TransactionCSRepository } from "../../transaction.repository"
import { InputCreateTransactionCSDto, OutputCreateTransactionCSDto } from "./create.transaction-cs.dto"

import axios from "axios"

export class CreateTransactionCSUseCase {
  constructor(private readonly transactionCSRepository: TransactionCSRepository) {}

  async execute(input: InputCreateTransactionCSDto): Promise<OutputCreateTransactionCSDto> {
    if(input.cpf_sender.length !== 14) {
      throw new Error("cpf com tamanho incorreto")
    }

    if(input.cnpj_recipient.length !== 18) {
      throw new Error("cnpj com tamanho incorreto")
    }

    if(input.amount >= 100) {
      try {
        await axios.post(`http://localhost:3333/verify/payment`, { amount: input.amount })
      } catch(e) {
        throw new Error("Transação recusada")
      }
    }
    
    const sender = await this.transactionCSRepository.getByCpf(input.cpf_sender)
    if(!sender) {
      throw new Error("cpf do remetente esta incorreto")
    }

    const recipient = await this.transactionCSRepository.getByCnpj(input.cnpj_recipient)
    if(!recipient) {
      throw new Error("cnpj do recebedor esta incorreto")
    }

    if(input.amount > sender.extract()) {
      throw new Error("Impossivel realizar essa transação")
    }
  
    sender.debit(input.amount)
    recipient.credit(input.amount)

    return await this.transactionCSRepository.create(input.amount, sender, recipient)
  }
}