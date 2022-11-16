export interface InputListCustomerDto {
  take?: number
}

export interface OutputListCustomerDto {
  id: string
  cpf: string
  name: string
  username: string 
  email: string 
  phone: string
  balance: number
}