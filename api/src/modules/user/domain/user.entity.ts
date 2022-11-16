import { NotificationInterface } from "../../notification/notification.interface"
import { Notification } from "../../notification/notification"
import { NotificationError } from "../../notification/notification.error"

export abstract class User {
  name: string
  username: string

  email: string
  phone: string

  protected balance: number

  protected notification: NotificationInterface

  constructor(name: string, username: string, email: string, phone: string, balance: number) {
    this.name = name
    this.username = username
    this.email = email
    this.phone = phone
    this.balance = balance

    this.notification = new Notification()

    const regexEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    if(!regexEmail.test(this.email)) {
      this.notification.addError({ context: "User", message: "email invalido" })
    }

    const regexPhone = /^(?:\+)[0-9]{2}\s?(?:\()[0-9]{2}(?:\))\s?[0-9]{4,5}(?:-)[0-9]{4}$/
    if(!regexPhone.test(this.phone)) {
      this.notification.addError({ context: "User", message: "telefone invalido" })
    }

    if(this.notification.hasErrors()) {
      throw new NotificationError(this.notification.getErrors())
    }
  }

  credit(amount: number): number {
    this.balance = this.balance + amount
    return this.balance
  }

  extract(): number {
    return this.balance
  }

  // validate(): void {
  //   const regexEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  //   if(!regexEmail.test(this.email)) {
  //     this.notification.addError({ context: "User", message: "email invalido" })
  //     // throw new Error("email invalido")
  //   }

  //   const regexPhone = /^(?:\+)[0-9]{2}\s?(?:\()[0-9]{2}(?:\))\s?[0-9]{4,5}(?:-)[0-9]{4}$/
  //   if(!regexPhone.test(this.phone)) {
  //     this.notification.addError({ context: "User", message: "telefone invalido" })
  //     // throw new Error("telefone invalido")
  //   }
  // }
}