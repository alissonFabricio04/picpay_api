import { Customer } from "./customer.entity"

describe("Customer", () => {
  it("should be instance customer and credit 10", () => {
    const customer = new Customer("909.136.030-58", "Marcio", "marcioferreira", "marcio.fake@gmail.com", "+55 (11) 96581-4115", 0)

    expect(customer.credit(10)).toEqual(10)
  })

  it("should be instance customer and debit 10", () => {
    const customer = new Customer("909.136.030-58", "Marcio", "marcioferreira", "marcio.fake@gmail.com", "+55 (11) 96581-4115", 10)

    expect(customer.debit(10)).toEqual(0)
  })

  it("should not be debit 10", () => {
    const customer = new Customer("909.136.030-58", "Marcio", "marcioferreira", "marcio.fake@gmail.com", "+55 (11) 96581-4115", 0)

    expect(() => customer.debit(10)).toThrowError("não é possivel debitar mais credito que se possui")
  })

  it("should not be instance customer if cpf is invalid", () => {
    expect(() => {
      new Customer("909.136.030", "Marcio", "marcioferreira", "marcio.fake@gmail.com", "+55 (11) 96581-4115", 0)
    }).toThrowError("Customer: cpf invalido")
  })

  it("should not be instance customer if email is invalid", () => {
    expect(() => {
      new Customer("909.136.030-58", "Marcio", "marcioferreira", "marcio", "+55 (11) 96581-4115", 0)
    }).toThrowError("User: email invalido")
  })

  it("should not be instance customer if phone is invalid", () => {
    expect(() => {
      new Customer("909.136.030-58", "Marcio", "marcioferreira", "marcio.fake@gmail.com", "1196581411", 0)
    }).toThrowError("User: telefone invalido")
  })
})