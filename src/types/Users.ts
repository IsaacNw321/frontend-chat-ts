export interface User {
  firstName : string,
  lastName : string;
  password: string;
  email :string;
}

export type createUser = Omit<User, 'id'>  