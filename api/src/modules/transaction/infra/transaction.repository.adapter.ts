import { OutputCreateTransactionCCDto } from "../use-cases/create/cc/create.transaction-cc.dto";
import { OutputCreateTransactionCSDto } from "../use-cases/create/cs/create.transaction-cs.dto";
import { TransactionCCRepository, TransactionCSRepository } from "../use-cases/transaction.repository";

import { Customer } from "src/modules/customer/domain/customer.entity";

import { SellerRepositoryAdapter } from "src/modules/seller/infra/seller.repository.adapter";
import { CustomerRepositoryAdapter } from "src/modules/customer/infra/customer.repository.adapter";
import { Seller } from "src/modules/seller/domain/seller.entity";

export class TransactionCCRepositoryAdapter implements TransactionCCRepository {
  getByCpf(cpf: string): Promise<Customer> {
    const customerRepositoryAdapter = new CustomerRepositoryAdapter();
    return customerRepositoryAdapter.findByCpf(cpf)
  }

  create(amount: number, sender: Customer, recipient: Customer): Promise<OutputCreateTransactionCCDto> {
    return new Promise((resolve) => resolve({
      cpf_sender: sender.cpf,
      cpf_recipient: recipient.cpf,
      amount
    }))
  }
}

export class TransactionCSRepositoryAdapter implements TransactionCSRepository {
  create(amount: number, sender: Customer, recipient: Seller): Promise<OutputCreateTransactionCSDto> {
    return new Promise((resolve) => resolve({
      cpf_sender: sender.cpf,
      cnpj_recipient: recipient.cnpj,
      amount
    }))
  }

  getByCnpj(cnpj: string): Promise<Seller> {
    const sellerRepositoryAdapter = new SellerRepositoryAdapter();
    return sellerRepositoryAdapter.findByCnpj(cnpj)
  }

  getByCpf(cpf: string): Promise<Customer> {
    const customerRepositoryAdapter = new CustomerRepositoryAdapter();
    return customerRepositoryAdapter.findByCpf(cpf)
  }
}