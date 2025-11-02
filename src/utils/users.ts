import axios from "axios";
import type { User } from "../types";

export const getUsers = async () =>{
  const users =  await axios.get("http://localhost:3000/users") 
  return users.status === 200 ? 
  users.data : 
  users.statusText
}

export const getUserById = async (id: string) =>{
  const  user = await axios.get(`http://localhost:3000/users/${id}`) 
  return user.status === 200 ? 
    user.data : 
    user.statusText;
}

export const createUser = async (User : User) =>{
  const newUser = await axios.post("http://localhost:3000/auth/signup", User)
  return newUser.status === 201 ? 
  newUser.headers  :
  newUser.statusText
}

export const deleteUser = async (id :string) =>{
  const deletedUser = await axios.delete(`http://localhost:3000/users/${id}`) 
  return deletedUser.status === 200 ?
    deletedUser.status : 
    deletedUser.statusText
}

export const pathcUser = async (id :string, data : User) =>{
  const updateddUser = await axios.patch(`http://localhost:3000/users/${id}`,data) 
  return updateddUser
}