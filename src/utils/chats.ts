import type { ChatWithMessages, ChatWitUsers, PostChatPayload } from "../types/Chats";
import axios from "axios";
import type { Message } from "../types/Messages";
import { apiClient } from "./users"; 
import { axiosPrivate } from "./users";
export const getChatByUsers = async (userIds: string[]): Promise<ChatWitUsers | undefined> => {
  try {
    const response = await axiosPrivate.get<ChatWitUsers>(`/chats/find`, {
      params: {
     userIds: userIds
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return undefined;
    }
    throw error;
  }
}

export const createChat = async (payload : PostChatPayload): Promise<ChatWitUsers> =>{
 try {
  const response = await apiClient.post<ChatWitUsers>(`/chats`, payload);
  return response.data;
 } catch (error) {

    if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || error.response?.statusText || "Failed to create chat");
    }
  throw error;
 }
}


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

export type postMessage = Omit<Message, 'id' | 'createdAt' | 'fromId' | 'chatId'> & {
  fromId: string;
  chatId: string;
};

export const sendMessage = async (messagePayload: postMessage): Promise<Message> => {
    try {
        const response = await apiClient.post<Message>(`/messages`, messagePayload);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message || error.response?.statusText || "Failed to send message");
        }
        throw error;
    }
}
export const getMessagesForChat = async (chatId: string): Promise<ChatWithMessages> => {
    try {
        const response = await apiClient.get<ChatWithMessages>(`/chats/${chatId}`);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message || error.response?.statusText || "Failed to fetch messages");
        }
        throw error;
    }
}