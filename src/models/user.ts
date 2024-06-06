export interface User {
  name: string;
  contact: string
  roleId: string | undefined
}


export const initialValueUser: User = {
    name: '',
    contact: '',
    roleId: ''
}