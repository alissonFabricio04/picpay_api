import { CustomerRepository } from "../customer.repository"
import { InputCreateCustomerDto, OutputCreateCustomerDto } from "./create.customer.dto"

import { NotificationInterface } from "../../../notification/notification.interface"
import { Notification } from "../../../notification/notification"
import { NotificationError } from "../../../notification/notification.error"

export class CreateCustomerUseCase {
  protected notification: NotificationInterface

  constructor(private readonly customerRepository: CustomerRepository) {
    this.notification = new Notification()
  }

  async execute(input: InputCreateCustomerDto): Promise<OutputCreateCustomerDto> {
    const cpfExists = await this.customerRepository.findByCpf(input.cpf)
    if(cpfExists) {
      this.notification.addError({ context: "Create Customer", message: "cpf ja cadastrado" })
    }
    
    const emailExists = await this.customerRepository.findByEmail(input.email)
    if(emailExists) {
      this.notification.addError({ context: "Create Customer", message: "email ja cadastrado" })
    }

    const usernameExists = await this.customerRepository.findByUsername(input.username)
    if(usernameExists) {
      this.notification.addError({ context: "Create Customer", message: "username ja cadastrado" })
    }

    if(this.notification.hasErrors()) {
      throw new NotificationError(this.notification.getErrors())
    }

    const customer = await this.customerRepository.create(input)

    return customer
  }
}