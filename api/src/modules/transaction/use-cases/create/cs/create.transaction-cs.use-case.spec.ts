import { Customer } from "../../../../customer/domain/customer.entity"
import { Seller } from "../../../../seller/domain/seller.entity"
import { CreateTransactionCSUseCase } from "./create.transaction-cs.use-case"

describe("Seller", () => {
  it("should be create transaction", async () => {
    const customer01 = new Customer("909.136.030-58", "Marcio", "marcioferreira", "marcio.fake@gmail.com", "+55 (11) 96581-4115", 10)
    const seller01 = new Seller("14.689.049/0001-08", "M&R Solis", "Marcio", "marcioferreira", "marcio.fake@gmail.com", "+55 (11) 96581-4115", 0)

    const transactionUseCase = new CreateTransactionCSUseCase({
      create: jest.fn(),
      getByCpf: () => new Promise((resolve) => resolve(customer01)),
      getByCnpj: () => new Promise((resolve) => resolve(seller01)),
    })

    await expect(transactionUseCase.execute({
      amount: 10, cpf_sender: customer01.cpf, cnpj_recipient: seller01.cnpj
    })).resolves.not.toThrow()
  })

  it("should not be create transaction if cpf of sender is length !== 14", async () => {
    const customer01 = new Customer("909.136.030-58", "Marcio", "marcioferreira", "marcio.fake@gmail.com", "+55 (11) 96581-4115", 10)
    const seller01 = new Seller("14.689.049/0001-08", "M&R Solis", "Marcio", "marcioferreira", "marcio.fake@gmail.com", "+55 (11) 96581-4115", 0)

    const transactionUseCase = new CreateTransactionCSUseCase({
      create: jest.fn(),
      getByCpf: () => new Promise((resolve) => resolve(customer01)),
      getByCnpj: () => new Promise((resolve) => resolve(seller01)),
    })

    await expect(transactionUseCase.execute({
      amount: 10, cpf_sender: "909.136.030-5", cnpj_recipient: seller01.cnpj
    })).rejects.toThrowError("cpf com tamanho incorreto")
  })

  it("should not be create transaction if cnpj of recipient is length !== 14", async () => {
    const customer01 = new Customer("909.136.030-58", "Marcio", "marcioferreira", "marcio.fake@gmail.com", "+55 (11) 96581-4115", 10)
    const seller01 = new Seller("14.689.049/0001-08", "M&R Solis", "Marcio", "marcioferreira", "marcio.fake@gmail.com", "+55 (11) 96581-4115", 0)

    const transactionUseCase = new CreateTransactionCSUseCase({
      create: jest.fn(),
      getByCpf: () => new Promise((resolve) => resolve(customer01)),
      getByCnpj: () => new Promise((resolve) => resolve(seller01)),
    })

    await expect(transactionUseCase.execute({
      amount: 10, cpf_sender: customer01.cpf, cnpj_recipient: "14.689.049/0001-0"
    })).rejects.toThrowError("cnpj com tamanho incorreto")
  })

  it("should not be create transaction if cpf of sender not exists", async () => {
    const customer01 = new Customer("909.136.030-58", "Marcio", "marcioferreira", "marcio.fake@gmail.com", "+55 (11) 96581-4115", 10)
    const seller01 = new Seller("14.689.049/0001-08", "M&R Solis", "Marcio", "marcioferreira", "marcio.fake@gmail.com", "+55 (11) 96581-4115", 0)

    const transactionUseCase = new CreateTransactionCSUseCase({
      create: jest.fn(),
      getByCpf: () => new Promise((resolve) => resolve(null)),
      getByCnpj: () => new Promise((resolve) => resolve(seller01)),
    })

    await expect(transactionUseCase.execute({
      amount: 10, cpf_sender: customer01.cpf, cnpj_recipient: seller01.cnpj
    })).rejects.toThrowError("cpf do remetente esta incorreto")
  })

  it("should not be create transaction if cnpj of recipient not exists", async () => {
    const customer01 = new Customer("909.136.030-58", "Marcio", "marcioferreira", "marcio.fake@gmail.com", "+55 (11) 96581-4115", 10)
    const seller01 = new Seller("14.689.049/0001-08", "M&R Solis", "Marcio", "marcioferreira", "marcio.fake@gmail.com", "+55 (11) 96581-4115", 0)

    const transactionUseCase = new CreateTransactionCSUseCase({
      create: jest.fn(),
      getByCpf: () => new Promise((resolve) => resolve(customer01)),
      getByCnpj: () => new Promise((resolve) => resolve(null)),
    })

    await expect(transactionUseCase.execute({
      amount: 10, cpf_sender: customer01.cpf, cnpj_recipient: seller01.cnpj
    })).rejects.toThrowError("cnpj do recebedor esta incorreto")
  })

  it("should not be create transaction if the amount you want to send is greater than what you have", async () => {
    const customer01 = new Customer("909.136.030-58", "Marcio", "marcioferreira", "marcio.fake@gmail.com", "+55 (11) 96581-4115", 10)
    const seller01 = new Seller("14.689.049/0001-08", "M&R Solis", "Marcio", "marcioferreira", "marcio.fake@gmail.com", "+55 (11) 96581-4115", 0)

    const transactionUseCase = new CreateTransactionCSUseCase({
      create: jest.fn(),
      getByCpf: () => new Promise((resolve) => resolve(customer01)),
      getByCnpj: () => new Promise((resolve) => resolve(seller01)),
    })

    await expect(transactionUseCase.execute({
      amount: 11, cpf_sender: customer01.cpf, cnpj_recipient: seller01.cnpj
    })).rejects.toThrowError("Impossivel realizar essa transação")
  })

  it("should not be create transaction if amount >= 100", async () => {
    const customer01 = new Customer("909.136.030-58", "Marcio", "marcioferreira", "marcio.fake@gmail.com", "+55 (11) 96581-4115", 100)
    const seller01 = new Seller("14.689.049/0001-08", "M&R Solis", "Marcio", "marcioferreira", "marcio.fake@gmail.com", "+55 (11) 96581-4115", 0)

    const transactionUseCase = new CreateTransactionCSUseCase({
      create: jest.fn(),
      getByCpf: () => new Promise((resolve) => resolve(customer01)),
      getByCnpj: () => new Promise((resolve) => resolve(seller01)),
    })

    await expect(transactionUseCase.execute({
      amount: 100, cpf_sender: customer01.cpf, cnpj_recipient: seller01.cnpj
    })).rejects.toThrowError("Transação recusada")
  })
})