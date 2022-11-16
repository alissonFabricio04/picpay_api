import { SellerRepository } from "../seller.repository"
import { InputListSellerDto, OutputListSellerDto } from "./list.seller.dto"

export class ListSellerUseCase {
  constructor(private readonly sellerRepository: SellerRepository) {}

  async execute(input: InputListSellerDto): Promise<OutputListSellerDto[]> {
    if(!input?.take) {
      const sellers = await this.sellerRepository.find()

      return sellers
    } else {
      const sellers = await this.sellerRepository.find(input.take)

      return sellers
    }
  }
}