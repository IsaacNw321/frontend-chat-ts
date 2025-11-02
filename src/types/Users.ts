export interface User {
  id : string;  
  firstName : string,
  lastName : string;
  password: string;
  email :string;
}

export type createUser = Omit<User, 'id'>  