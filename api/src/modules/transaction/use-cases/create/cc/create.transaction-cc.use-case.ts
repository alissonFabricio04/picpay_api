import { TransactionCCRepository } from "../../transaction.repository"
import { InputCreateTransactionCCDto, OutputCreateTransactionCCDto } from "./create.transaction-cc.dto"

import axios from "axios"

export class CreateTransactionCCUseCase {
  constructor(private readonly transactionCCRepository: TransactionCCRepository) {}

  async execute(input: InputCreateTransactionCCDto): Promise<OutputCreateTransactionCCDto> {
    if(input.cpf_sender.length !== 14) {
      throw new Error("cpf com tamanho incorreto")
    }

    if(input.cpf_recipient.length !== 14) {
      throw new Error("cpf com tamanho incorreto")
    }

    if(input.amount >= 100) {
      try {
        await axios.post(`http://localhost:3333/verify/payment`, { amount: input.amount })
      } catch(e) {
        throw new Error("Transação recusada")
      }
    }
    
    const sender = await this.transactionCCRepository.getByCpf(input.cpf_sender)
    if(!sender) {
      throw new Error("cpf do remetente esta incorreto")
    }

    const recipient = await this.transactionCCRepository.getByCpf(input.cpf_recipient)
    if(!recipient) {
      throw new Error("cpf do recebedor esta incorreto")
    }

    if(input.amount > sender.extract()) {
      throw new Error("Impossivel realizar essa transação")
    }

    sender.debit(input.amount)
    recipient.credit(input.amount)
  
    return await this.transactionCCRepository.create(input.amount, sender, recipient)
  }
}