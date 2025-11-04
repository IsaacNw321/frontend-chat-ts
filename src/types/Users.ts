export interface User {
  id : string;
  firstName : string,
  lastName : string;
  password: string;
  email :string;
}

export type postUser = Omit<User, 'id'>  