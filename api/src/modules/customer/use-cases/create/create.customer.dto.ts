export interface InputCreateCustomerDto {
  cpf: string
  name: string
  username: string
  password: string
  email: string 
  phone: string
}

export interface OutputCreateCustomerDto {
  id: string
  cpf: string
  name: string
  username: string 
  email: string 
  phone: string
  balance: number
}