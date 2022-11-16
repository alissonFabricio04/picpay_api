import { Seller } from "./seller.entity"

describe("Seller", () => {
  it("should be instance seller and credit 10", () => {
    const seller = new Seller("14.689.049/0001-08", "M&R Solis", "Marcio", "marcioferreira", "marcio.fake@gmail.com", "+55 (11) 96581-4115", 0)

    expect(seller.credit(10)).toEqual(10)
  })

  it("should not be instance seller if cnpj is invalid", () => {
    expect(() => {
      new Seller("14.689.049/0001-0", "M&R Solis", "Marcio", "marcioferreira", "marcio.fake@gmail.com", "+55 (11) 96581-4115", 0)
    }).toThrowError("Seller: cpnj invalido")
  })

  it("should not be instance seller if email is invalid", () => {
    expect(() => {
      new Seller("14.689.049/0001-08", "M&R Solis", "Marcio", "marcioferreira", "marcio", "+55 (11) 96581-4115", 0)
    }).toThrowError("User: email invalido")
  })

  it("should not be instance seller if phone is invalid", () => {
    expect(() => {
      new Seller("14.689.049/0001-08", "M&R Solis", "Marcio", "marcioferreira", "marcio.fake@gmail.com", "1196581411", 0)
    }).toThrowError("User: telefone invalido")
  })
})