import { Customer } from "../domain/customer.entity";
import { InputCreateCustomerDto, OutputCreateCustomerDto } from "../use-cases/create/create.customer.dto";
import { CustomerRepository } from "../use-cases/customer.repository";

import { randomUUID } from "crypto";

export class CustomerRepositoryAdapter implements CustomerRepository {
  private customers: { id: string, customer: Customer }[]

  create(data: InputCreateCustomerDto): Promise<OutputCreateCustomerDto> {
    const customer = new Customer(data.cpf, data.name, data.username, data.email, data.phone, 0)

    const id = randomUUID()

    this.customers.push({ id, customer })

    return new Promise((resolve) => resolve({
      id,
      cpf: customer.cpf,
      name: customer.name,
      username: customer.username, 
      email: customer.email,
      phone: customer.phone,
      balance: customer.extract(),
    }))
  }

  findByCpf(cpf: string): Promise<Customer> {
    const { customer } = this.customers.find(item => item.customer.cpf === cpf)
    if(!customer) {
      return new Promise((resolve) => resolve(null))
    }

    return new Promise((resolve) => resolve(customer))
  }

  findByEmail(email: string): Promise<Customer> {
    const { customer } = this.customers.find(item => item.customer.email === email)
    if(!customer) {
      return new Promise((resolve) => resolve(null))
    }

    return new Promise((resolve) => resolve(customer))
  }

  findByUsername(username: string): Promise<Customer> {
    const { customer } = this.customers.find(item => item.customer.username === username)
    if(!customer) {
      return new Promise((resolve) => resolve(null))
    }

    return new Promise((resolve) => resolve(customer))
  }

  find(take?: number): Promise<OutputCreateCustomerDto[]> {
    if(!take) {
      this.customers.map(item => {
        return {
          id: item.id,
          cpf: item.customer.cpf,
          name: item.customer.name,
          username: item.customer.username, 
          email: item.customer.email,
          phone: item.customer.phone,
          balance: item.customer.extract(),
        }
      })

      return new Promise((resolve) => resolve(null))
    }
  }
}