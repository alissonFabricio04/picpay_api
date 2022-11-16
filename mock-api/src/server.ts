import Fastify from 'fastify'
import cors from '@fastify/cors'
import { config } from 'dotenv'
config()

type Body = {
  amount: number
}

async function bootstrap() {
  const fastify = Fastify({
    logger: true
  })

  await fastify.register(cors, {
    origin: `${process.env.API_URL}`
  })

  fastify.post('/verify/payment', async (req, reply) => {
    const body = <Body>req.body

    if(!body?.amount) {
      reply.code(401)
      return { code: 'Transação não Autorizada', message: 'Transação Recusada' }
    }

    if(body.amount >= 100) {
      reply.code(401)
      return { code: 'Transação não Autorizada', message: 'Transação Recusada' }
    } else {
      reply.code(200)
      return { code: 'Transação Autorizada', message: 'Transação Autorizada' }
    }
  })

  await fastify.listen({ port: 3333, host: '0.0.0.0' })
}

bootstrap()