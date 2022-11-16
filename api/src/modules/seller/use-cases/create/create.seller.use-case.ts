import { SellerRepository } from "../seller.repository"
import { InputCreateSellerDto, OutputCreateSellerDto } from "./create.seller.dto"

import { NotificationInterface } from "../../../notification/notification.interface"
import { Notification } from "../../../notification/notification"
import { NotificationError } from "../../../notification/notification.error"

export class CreateSellerUseCase {
  protected notification: NotificationInterface

  constructor(private readonly sellerRepository: SellerRepository) {
    this.notification = new Notification()
  }

  async execute(input: InputCreateSellerDto): Promise<OutputCreateSellerDto> {
    const cnpjExists = await this.sellerRepository.findByCnpj(input.cnpj)
    if(cnpjExists) {
      this.notification.addError({ context: "Create Seller", message: "cnpj ja cadastrado" })
    }
    
    const emailExists = await this.sellerRepository.findByEmail(input.email)
    if(emailExists) {
      this.notification.addError({ context: "Create Seller", message: "email ja cadastrado" })
    }

    const usernameExists = await this.sellerRepository.findByUsername(input.username)
    if(usernameExists) {
      this.notification.addError({ context: "Create Seller", message: "username ja cadastrado" })
    }

    if(this.notification.hasErrors()) {
      throw new NotificationError(this.notification.getErrors())
    }

    const seller = await this.sellerRepository.create(input)

    return seller
  }
}