import { Customer } from "../../customer/domain/customer.entity"
import { Seller } from "../../seller/domain/seller.entity"
import { OutputCreateTransactionCCDto } from "./create/cc/create.transaction-cc.dto"
import { OutputCreateTransactionCSDto } from "./create/cs/create.transaction-cs.dto"

export interface TransactionCCRepository {
  create(amount: number, sender: Customer, recipient: Customer): Promise<OutputCreateTransactionCCDto>
  getByCpf(cpf: string): Promise<Customer | null>
}

export interface TransactionCSRepository {
  create(amount: number, sender: Customer, recipient: Seller): Promise<OutputCreateTransactionCSDto>
  getByCpf(cpf: string): Promise<Customer | null>
  getByCnpj(cnpj: string): Promise<Seller | null>
}

// export interface ListTransactionsConsumer {
//   listBySender(sender: Consumer): Promise<unknown>
//   listByRecipient(recipient: Consumer): Promise<unknown>
// }

// export interface ListTransactionsSeller {
//   listByRecipient(recipient: Seller): Promise<unknown>
// }