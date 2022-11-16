import { User } from "../../user/domain/user.entity"

import { NotificationError } from "../../notification/notification.error"

export class Seller extends User {
  cnpj: string
  razaoSocial: string

  constructor(cnpj: string, razaoSocial: string, name: string, username: string, email: string, phone: string, balance: number) {
    super(name, username, email, phone, balance)

    const regexCnpj = /^[0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}\-?[0-9]{2}$/
    if(!regexCnpj.test(cnpj)) {
      this.notification.addError({ context: "Seller", message: "cpnj invalido" })
      // throw new Error("cpnj invalido")
    }

    this.cnpj = cnpj

    this.razaoSocial = razaoSocial

    if(this.notification.hasErrors()) {
      throw new NotificationError(this.notification.getErrors())
    }
  }
}