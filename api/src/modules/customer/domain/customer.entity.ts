import { User } from "../../user/domain/user.entity"

import { NotificationError } from "../../notification/notification.error"

export class Customer extends User {
  cpf: string

  constructor(cpf: string, name: string, username: string, email: string, phone: string, balance: number) {
    super(name, username, email, phone, balance)

    const regexCpf = /^[0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}$/
    if(!regexCpf.test(cpf)) {
      this.notification.addError({ context: "Customer", message: "cpf invalido" })
      // throw new Error("cpf invalido")
    }

    this.cpf = cpf

    if(this.notification.hasErrors()) {
      throw new NotificationError(this.notification.getErrors())
    }
  }

  debit(amount: number): number {
    if(amount > this.balance) {
      throw new Error("não é possivel debitar mais credito que se possui")
    }
    
    this.balance = this.balance - amount

    return this.balance
  }
}