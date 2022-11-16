import { Customer } from "../../../../customer/domain/customer.entity"
import { CreateTransactionCCUseCase } from "./create.transaction-cc.use-case"

describe("Customer", () => {
  it("should be create transaction", async () => {
    const customer01 = new Customer("909.136.030-58", "Marcio", "marcioferreira", "marcio.fake@gmail.com", "+55 (11) 96581-4115", 10)
    const customer02 = new Customer("909.136.030-57", "Marcio 02", "marcioferreira02", "marcio.fake02@gmail.com", "+55 (11) 96581-4116", 0)

    const transactionUseCase = new CreateTransactionCCUseCase({
      create: jest.fn(),
      getByCpf: (cpf: string) => cpf === customer01.cpf ? new Promise((resolve) => resolve(customer01)) : new Promise((resolve) => resolve(customer02))
    })

    await expect(transactionUseCase.execute({
      amount: 10, cpf_sender: customer01.cpf, cpf_recipient: customer02.cpf
    })).resolves.not.toThrow()
  })

  it("should not be create transaction if cpf of sender is length !== 14", async () => {
    const customer01 = new Customer("909.136.030-58", "Marcio", "marcioferreira", "marcio.fake@gmail.com", "+55 (11) 96581-4115", 10)
    const customer02 = new Customer("909.136.030-57", "Marcio 02", "marcioferreira02", "marcio.fake02@gmail.com", "+55 (11) 96581-4116", 0)

    const transactionUseCase = new CreateTransactionCCUseCase({
      create: jest.fn(),
      getByCpf: (cpf: string) => cpf === customer01.cpf ? new Promise((resolve) => resolve(customer01)) : new Promise((resolve) => resolve(customer02))
    })

    await expect(transactionUseCase.execute({
      amount: 10, cpf_sender: "909.136.030-5", cpf_recipient: customer02.cpf
    })).rejects.toThrowError("cpf com tamanho incorreto")
  })

  it("should not be create transaction if cpf of recipient is length !== 14", async () => {
    const customer01 = new Customer("909.136.030-58", "Marcio", "marcioferreira", "marcio.fake@gmail.com", "+55 (11) 96581-4115", 10)
    const customer02 = new Customer("909.136.030-57", "Marcio 02", "marcioferreira02", "marcio.fake02@gmail.com", "+55 (11) 96581-4116", 0)

    const transactionUseCase = new CreateTransactionCCUseCase({
      create: jest.fn(),
      getByCpf: (cpf: string) => cpf === customer01.cpf ? new Promise((resolve) => resolve(customer01)) : new Promise((resolve) => resolve(customer02))
    })

    await expect(transactionUseCase.execute({
      amount: 10, cpf_sender: customer01.cpf, cpf_recipient: "909.136.030-5"
    })).rejects.toThrowError("cpf com tamanho incorreto")
  })

  it("should not be create transaction if cpf of sender not exists", async () => {
    const customer01 = new Customer("909.136.030-58", "Marcio", "marcioferreira", "marcio.fake@gmail.com", "+55 (11) 96581-4115", 10)
    const customer02 = new Customer("909.136.030-57", "Marcio 02", "marcioferreira02", "marcio.fake02@gmail.com", "+55 (11) 96581-4116", 0)

    const transactionUseCase = new CreateTransactionCCUseCase({
      create: jest.fn(),
      getByCpf: () => new Promise((resolve) => resolve(null))
    })

    await expect(transactionUseCase.execute({
      amount: 10, cpf_sender: customer01.cpf, cpf_recipient: customer02.cpf
    })).rejects.toThrowError("cpf do remetente esta incorreto")
  })

  it("should not be create transaction if cpf of recipient not exists", async () => {
    const customer01 = new Customer("909.136.030-58", "Marcio", "marcioferreira", "marcio.fake@gmail.com", "+55 (11) 96581-4115", 10)
    const customer02 = new Customer("909.136.030-57", "Marcio 02", "marcioferreira02", "marcio.fake02@gmail.com", "+55 (11) 96581-4116", 0)

    const transactionUseCase = new CreateTransactionCCUseCase({
      create: jest.fn(),
      getByCpf: (cpf: string) => cpf !== customer01.cpf ? new Promise((resolve) => resolve(null)) : new Promise((resolve) => resolve(customer02))
    })

    await expect(transactionUseCase.execute({
      amount: 10, cpf_sender: customer01.cpf, cpf_recipient: customer02.cpf
    })).rejects.toThrowError("cpf do recebedor esta incorreto")
  })

  it("should not be create transaction if the amount you want to send is greater than what you have", async () => {
    const customer01 = new Customer("909.136.030-58", "Marcio", "marcioferreira", "marcio.fake@gmail.com", "+55 (11) 96581-4115", 10)
    const customer02 = new Customer("909.136.030-57", "Marcio 02", "marcioferreira02", "marcio.fake02@gmail.com", "+55 (11) 96581-4116", 0)

    const transactionUseCase = new CreateTransactionCCUseCase({
      create: jest.fn(),
      getByCpf: (cpf: string) => cpf === customer01.cpf ? new Promise((resolve) => resolve(customer01)) : new Promise((resolve) => resolve(customer02))
    })

    await expect(transactionUseCase.execute({
      amount: 11, cpf_sender: customer01.cpf, cpf_recipient: customer02.cpf
    })).rejects.toThrowError("Impossivel realizar essa transação")
  })

  it("should not be create transaction if amount >= 100", async () => {
    const customer01 = new Customer("909.136.030-58", "Marcio", "marcioferreira", "marcio.fake@gmail.com", "+55 (11) 96581-4115", 100)
    const customer02 = new Customer("909.136.030-57", "Marcio 02", "marcioferreira02", "marcio.fake02@gmail.com", "+55 (11) 96581-4116", 0)

    const transactionUseCase = new CreateTransactionCCUseCase({
      create: jest.fn(),
      getByCpf: (cpf: string) => cpf === customer01.cpf ? new Promise((resolve) => resolve(customer01)) : new Promise((resolve) => resolve(customer02))
    })

    await expect(transactionUseCase.execute({
      amount: 100, cpf_sender: customer01.cpf, cpf_recipient: customer02.cpf
    })).rejects.toThrowError("Transação recusada")
  })
})