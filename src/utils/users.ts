import axios from "axios";
import type { postUser, User, updateUser } from "../types";
import type { LoginFormFields } from "../validations/loginSchema";
import * as qs from 'qs';
import { type AuthState } from "../context/AuthProvider";
import type { SetStateAction } from "react";
import { type AxiosInstance, isAxiosError } from "axios";

export const apiClient = axios.create({
 baseURL: `${import.meta.env.VITE_BACKEND_URL_AUTH}`,
 withCredentials: true, 
 paramsSerializer: params => {
    return qs.stringify(params, { arrayFormat: 'repeat' });
 }
});

export const axiosPrivate = axios.create({
 baseURL : `${import.meta.env.VITE_BACKEND_URL_AUTH}`,
 withCredentials : true,
  paramsSerializer: params => {
    return qs.stringify(params, { arrayFormat: 'repeat' });
 }
})


export const getUsers = async (): Promise<User[]> => {
    try {
        const response = await apiClient.get<User[]>("/users");
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message || error.response?.statusText || "Failed to fetch users");
        }
        throw error;
    }
};

export const getUserById = async (id: string): Promise<User> => {
    try {
        const response = await apiClient.get<User>(`/users/${id}`);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message || error.response?.statusText || "Failed to fetch user");
        }
        throw error;
    }
};

export const createUser = async (user: postUser): Promise<User> => {
    try {
        const response = await apiClient.post<User>("/auth/signup", user);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message || error.response?.statusText || "Failed to create user");
        }
        throw error;
    }
};

export const loginUser = async (credentials: LoginFormFields): Promise<SetStateAction<AuthState>> => {
    try {
        const response = await apiClient.post("/auth/login", credentials);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message || error.response?.statusText || "Login failed");
        }
        throw error;
    }
};
export const deleteUser = async (
  axiosPrivate: AxiosInstance, 
  id: string | null,
  controller: AbortController 
): Promise<boolean | undefined> => {
  try {
    const response = await axiosPrivate.delete(`/users/${id}`, {
      signal: controller.signal
    });
    if (response.status === 200) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
      if (isAxiosError(error)) {
        throw new Error(error.response?.data?.message || error.response?.statusText || "Failed to delete user");
    }
    throw error;
  }
};

export const patchUser = async (id: string, data: updateUser): Promise<User> => {
    try {
        const response = await apiClient.patch<User>(`/users/${id}`, data);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message || error.response?.statusText || "Failed to update user");
        }
        throw error;
    }
}