export interface User {
  id : string;
  userName : string;
  password: string;
  email :string;
}

export type postUser = Omit<User, 'id' | 'role' | 'chats' | 'messages'>;

export type updateUser = Partial<Omit<User, 'id' | 'role' | 'chats' >>;