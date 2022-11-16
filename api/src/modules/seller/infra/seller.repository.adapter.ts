import { Seller } from "../domain/seller.entity";
import { InputCreateSellerDto, OutputCreateSellerDto } from "../use-cases/create/create.seller.dto";
import { SellerRepository } from "../use-cases/seller.repository";

import { randomUUID } from "crypto";

export class SellerRepositoryAdapter implements SellerRepository {
  private sellers: { id: string, seller: Seller }[]

  create(data: InputCreateSellerDto): Promise<OutputCreateSellerDto> {
    const seller = new Seller(data.cnpj, data.razaoSocial, data.name, data.username, data.email, data.phone, 0)

    const id = randomUUID()

    this.sellers.push({ id, seller })

    return new Promise((resolve) => resolve({
      id,
      cnpj: seller.cnpj,
      razaoSocial: seller.razaoSocial,
      name: seller.name,
      username: seller.username,
      email: seller.email,
      phone: seller.phone,
      balance: seller.extract()
    }))
  }

  findByCnpj(cnpj: string): Promise<Seller> {
    const { seller } = this.sellers.find(item => item.seller.cnpj === cnpj)
    if(!seller) {
      return new Promise((resolve) => resolve(null))
    }

    return new Promise((resolve) => resolve(seller))
  }

  findByEmail(email: string): Promise<Seller> {
    const { seller } = this.sellers.find(item => item.seller.email === email)
    if(!seller) {
      return new Promise((resolve) => resolve(null))
    }

    return new Promise((resolve) => resolve(seller))
  }

  findByUsername(username: string): Promise<Seller> {
    const { seller } = this.sellers.find(item => item.seller.username === username)
    if(!seller) {
      return new Promise((resolve) => resolve(null))
    }

    return new Promise((resolve) => resolve(seller))
  }

  find(take?: number): Promise<OutputCreateSellerDto[]> {
    if(!take) {
      this.sellers.map(item => {
        return {
          id: item.id,
          cpf: item.seller.cnpj,
          name: item.seller.name,
          username: item.seller.username, 
          email: item.seller.email,
          phone: item.seller.phone,
          balance: item.seller.extract(),
        }
      })

      return new Promise((resolve) => resolve(null))
    }
  }
}