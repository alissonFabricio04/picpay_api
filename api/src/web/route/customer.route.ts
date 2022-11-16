import { ListCustomerUseCase } from "../../modules/customer/use-cases/list/list.customer.use-case"
import { InputListCustomerDto } from "../../modules/customer/use-cases/list/list.customer.dto"

import { CreateCustomerUseCase } from "../../modules/customer/use-cases/create/create.customer.use-case"
import { InputCreateCustomerDto } from "../../modules/customer/use-cases/create/create.customer.dto"
import { NotificationError } from "../../modules/notification/notification.error"

import { CustomerRepositoryAdapter } from "../../modules/customer/infra/customer.repository.adapter"

import { routes } from "../express/express"
import { Request, Response } from "express"
import { toJson } from "../presenter/toJson"

routes.get('/', (req: Request, res: Response) => res.send("oi"))

routes.get('/customer', async (req: Request, res: Response) => {
  const input = <InputListCustomerDto>req.body

  const customerRepository = new CustomerRepositoryAdapter()
  const createCustomerUseCase = new ListCustomerUseCase(customerRepository)

  try {
    const output = await createCustomerUseCase.execute(input)

    return res.send(toJson(output))
  } catch(err) {
    return res.send(toJson({ message: (err as NotificationError).message || "action impossible to complete" }))
  }
})

routes.post('/customer', async (req: Request, res: Response) => {
  const input = <InputCreateCustomerDto>req.body

  if(!input.cpf || !input.email || !input.name || !input.password || !input.phone || !input.username) {
    return res.send(toJson({ message: "action impossible to complete" }))
  }

  const customerRepository = new CustomerRepositoryAdapter()
  const createCustomerUseCase = new CreateCustomerUseCase(customerRepository)

  try {
    const output = await createCustomerUseCase.execute(input)

    return res.send(toJson(output))
  } catch(err) {
    return res.send(toJson({ message: (err as NotificationError).message || "action impossible to complete" }))
  }
})
