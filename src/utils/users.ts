import axios from "axios";
import type { User } from "../types";
const apiClient = axios.create({
  baseURL: 'http://localhost:3000', 
  withCredentials: true, 
});
export const getUsers = async () =>{
  const users =  await apiClient.get("/users") 
  return users.status === 200 ? 
  users.data : 
  users.statusText
}

export const getUserById = async (id: string) =>{
  const  user = await apiClient.get(`/users/${id}`) 
  return user.status === 200 ? 
    user.data : 
    user.statusText;
}

export const createUser = async (User : User) =>{
  const newUser = await apiClient.post("/auth/signup", User)
  return newUser.status === 201 ? 
  newUser.headers  :
  newUser.statusText
}

export const deleteUser = async (id :string) =>{
  const deletedUser = await apiClient.delete(`/users/${id}`) 
  return deletedUser.status === 200 ?
    deletedUser.status : 
    deletedUser.statusText
}

export const pathcUser = async (id :string, data : User) =>{
  const updateddUser = await apiClient.patch(`/users/${id}`,data) 
  return updateddUser
}