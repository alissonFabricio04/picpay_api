import { Customer } from "../domain/customer.entity"
import { InputCreateCustomerDto, OutputCreateCustomerDto } from "./create/create.customer.dto"

export interface CustomerRepository {
  create(data: InputCreateCustomerDto): Promise<OutputCreateCustomerDto>
  findByCpf(cpf: string): Promise<Customer | null>
  findByEmail(email: string): Promise<Customer | null>
  findByUsername(username: string): Promise<Customer | null>
  find(take?: number): Promise<OutputCreateCustomerDto[]>
}
