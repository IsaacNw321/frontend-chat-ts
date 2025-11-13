import axios from "axios";
import type { postUser, User, updateUser } from "../types";
import type { LoginFormFields } from "../validations/loginSchema";


export const apiClient = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true, 

});

export const axiosPrivate = axios.create({
  baseURL : 'http://localhost:3000',
  withCredentials : true
})

export const getUsers = async (): Promise<User[]> => {
  const response = await apiClient.get<User[]>("/users");
  if (response.status !== 200) {
    throw new Error(response.statusText || "Failed to fetch users");
  }
  return response.data;
};

export const getUserById = async (id: string): Promise<User> => {
  const response = await apiClient.get<User>(`/users/${id}`);
  if (response.status !== 200) {
    throw new Error(response.statusText || "Failed to fetch user");
  }
  return response.data;
};

export const createUser = async (user: postUser): Promise<User> => {
  const response = await apiClient.post<User>("/auth/signup", user);
  if (response.status !== 201) {
    throw new Error(response.statusText || "Failed to create user");
  }
  return response.data;
};

export const loginUser = async (credentials: LoginFormFields): Promise<any> => {
  const response = await apiClient.post("/auth/login", credentials);
  if (response.status !== 200) {
    throw new Error(response.statusText || "Login failed");
  }
  return response.data;
};

export const deleteUser = async (id: string): Promise<void> => {
  const response = await apiClient.delete(`/users/${id}`);
  if (response.status !== 200 && response.status !== 204) {
    throw new Error(response.statusText || "Failed to delete user");
  }
};


export const patchUser = async (id: string, data: updateUser): Promise<User> => {
  const response = await apiClient.patch<User>(`/users/${id}`, data);
  if (response.status !== 200) {
    throw new Error(response.statusText || "Failed to update user");
  }
  return response.data;
}