export interface InputCreateSellerDto {
  cnpj: string
  razaoSocial: string
  name: string
  username: string
  password: string
  email: string
  phone: string
}

export interface OutputCreateSellerDto {
  id: string
  cnpj: string
  razaoSocial: string
  name: string
  username: string
  email: string
  phone: string
  balance: number
}