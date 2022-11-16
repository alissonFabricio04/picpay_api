import { CustomerRepository } from "../customer.repository"
import { InputListCustomerDto, OutputListCustomerDto } from "./list.customer.dto"

export class ListCustomerUseCase {
  constructor(private readonly customerRepository: CustomerRepository) {}

  async execute(input: InputListCustomerDto): Promise<OutputListCustomerDto[]> {
    if(!input?.take) {
      const customers = await this.customerRepository.find()

      return customers
    } else {
      const customers = await this.customerRepository.find(input.take)

      return customers
    }
  }
}