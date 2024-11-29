export interface User {
  name: string;
  email: string
  perfil: string | undefined
}


export const initialValueUser: User = {
    name: '',
    email: '',
    perfil: ''
}