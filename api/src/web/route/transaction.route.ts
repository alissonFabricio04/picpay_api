import { CreateTransactionCCUseCase } from "../../modules/transaction/use-cases/create/cc/create.transaction-cc.use-case"
import { InputCreateTransactionCCDto } from "../../modules/transaction/use-cases/create/cc/create.transaction-cc.dto"

import { CreateTransactionCSUseCase } from "../../modules/transaction/use-cases/create/cs/create.transaction-cs.use-case"
import { InputCreateTransactionCSDto } from "../../modules/transaction/use-cases/create/cs/create.transaction-cs.dto"

import { NotificationError } from "../../modules/notification/notification.error"

import { TransactionCCRepositoryAdapter, TransactionCSRepositoryAdapter } from "../../modules/transaction/infra/transaction.repository.adapter"

import { routes } from "../express/express"
import { Request, Response } from "express"
import { toJson } from "../presenter/toJson"

routes.post('/transaction/for-seller', async (req: Request, res: Response) => {
  const input = <InputCreateTransactionCSDto>req.body

  if(!input.cpf_sender || !input.cnpj_recipient || !input.amount) {
    return res.send(toJson({ message: "action impossible to complete" }))
  }

  const transactionRepository = new TransactionCSRepositoryAdapter()
  const createTransactionUseCase = new CreateTransactionCSUseCase(transactionRepository)

  try {
    const output = await createTransactionUseCase.execute(input)

    return res.send(toJson(output))
  } catch(err) {
    return res.send(toJson({ message: (err as NotificationError).message || "action impossible to complete" }))
  }
})

routes.post('/transaction/for-customer', async (req: Request, res: Response) => {
  const input = <InputCreateTransactionCCDto>req.body

  if(!input.cpf_sender || !input.cpf_recipient || !input.amount) {
    return res.send(toJson({ message: "action impossible to complete" }))
  }

  const transactionRepository = new TransactionCCRepositoryAdapter()
  const createTransactionUseCase = new CreateTransactionCCUseCase(transactionRepository)

  try {
    const output = await createTransactionUseCase.execute(input)

    return res.send(toJson(output))
  } catch(err) {
    return res.send(toJson({ message: (err as NotificationError).message || "action impossible to complete" }))
  }
})
