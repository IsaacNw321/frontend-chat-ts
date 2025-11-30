export const Role = {
USER: 'USER',
SUPERUSER: 'SUPERUSER',
} as const;

export type Role = (typeof Role)[keyof typeof Role];

export interface User {
  id : string;
  userName : string;
  password: string;
  email :string;
  role : Role
}

export type postUser = Omit<User, 'id' | 'role' | 'chats' | 'messages'| 'role'>;

export type updateUser = Partial<Omit<User, 'id' | 'role' | 'chats' >>;

export interface Master {
  id: number;
  name: string;
  image: string; 
  profession: string;
  description: string;
}

export interface SearcherProps {
  users: User[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}