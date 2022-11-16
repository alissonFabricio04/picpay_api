import { ListSellerUseCase } from "../../modules/seller/use-cases/list/list.seller.use-case"
import { InputListSellerDto } from "../../modules/seller/use-cases/list/list.seller.dto"

import { CreateSellerUseCase } from "../../modules/seller/use-cases/create/create.seller.use-case"
import { InputCreateSellerDto } from "../../modules/seller/use-cases/create/create.seller.dto"
import { NotificationError } from "../../modules/notification/notification.error"

import { SellerRepositoryAdapter } from "../../modules/seller/infra/seller.repository.adapter"

import { routes } from "../express/express"
import { Request, Response } from "express"
import { toJson } from "../presenter/toJson"

routes.get('/seller', async (req: Request, res: Response) => {
  const input = <InputListSellerDto>req.body

  const sellerRepository = new SellerRepositoryAdapter()
  const createSellerUseCase = new ListSellerUseCase(sellerRepository)

  try {
    const output = await createSellerUseCase.execute(input)

    return res.send(toJson(output))
  } catch(err) {
    return res.send(toJson({ message: (err as NotificationError).message || "action impossible to complete" }))
  }
})

routes.post('/seller', async (req: Request, res: Response) => {
  const input = <InputCreateSellerDto>req.body

  if(!input.cnpj || !input.email || !input.name || !input.password || !input.phone || !input.username || !input.razaoSocial) {
    return res.send(toJson({ message: "action impossible to complete" }))
  }

  const sellerRepository = new SellerRepositoryAdapter()
  const createSellerUseCase = new CreateSellerUseCase(sellerRepository)

  try {
    const output = await createSellerUseCase.execute(input)

    return res.send(toJson(output))
  } catch(err) {
    return res.send(toJson({ message: (err as NotificationError).message || "action impossible to complete" }))
  }
})
