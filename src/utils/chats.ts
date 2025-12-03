import type { ChatWithMessages, ChatWitUsers, PostChatPayload } from "../types/Chats";
import axios from "axios";
import {type AxiosInstance, isAxiosError } from "axios";
import type { Message, postMessage } from "../types/Messages";
import { apiClient } from "./users"; 

export const getChatByUsers = async (
  axiosPrivate: AxiosInstance,
  userIds: string[], 
  signal: AbortSignal
): Promise<ChatWitUsers | undefined> => {
  try {
    const response = await axiosPrivate.get<ChatWitUsers>(`/chats/find`, {
      params: {
        userIds: userIds
      },
      signal: signal
    });
    return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 404) {
      return undefined; 
    }
    if (isAxiosError(error) && error.code !== 'ERR_CANCELED') {
      throw error;
    }
    throw error;
  }
};

export const createChat = async (
  axiosPrivate: AxiosInstance,
  payload: PostChatPayload
): Promise<ChatWitUsers> => {
  try {
    const response = await axiosPrivate.post<ChatWitUsers>(`/chats`, payload);
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data?.message || error.response?.statusText || "Failed to create chat");
    }
    throw error;
  }
};


export const getChatById = async (chatId: string): Promise<ChatWithMessages> => {
    try {
        const response = await apiClient.get<ChatWithMessages>(`/chats/${chatId}`);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message || error.response?.statusText || "Failed to fetch chat details");
        }
        throw error;
    }
}

export const sendMessage = async (
  axiosPrivate: AxiosInstance,
  messagePayload: postMessage
): Promise<Message> => {
  try {
    const response = await axiosPrivate.post<Message>(`/messages`, messagePayload);
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data?.message || error.response?.statusText || "Failed to send message");
    }
    throw error;
  }
};

export const getMessagesForChat = async (
  axiosPrivate: AxiosInstance,
  chatId: string,
  signal: AbortSignal
): Promise<ChatWithMessages> => {
  try {
    const response = await axiosPrivate.get<ChatWithMessages>(`/chats/${chatId}`, {
      signal: signal
    });
    return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.code !== 'ERR_CANCELED') {
      throw new Error(error.response?.data?.message || error.response?.statusText || "Failed to fetch messages");
    }
    throw error;
  }
};