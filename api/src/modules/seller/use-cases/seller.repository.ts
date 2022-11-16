import { Seller } from "../domain/seller.entity"
import { InputCreateSellerDto, OutputCreateSellerDto } from "./create/create.seller.dto"

export interface SellerRepository {
  create(data: InputCreateSellerDto): Promise<OutputCreateSellerDto>
  findByCnpj(cpf: string): Promise<Seller | null>
  findByEmail(email: string): Promise<Seller | null>
  findByUsername(username: string): Promise<Seller | null>
  find(take?: number): Promise<OutputCreateSellerDto[]>
}
