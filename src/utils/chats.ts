import type  { ChatWithMessages, ChatWitUsers, PostChatPayload } from "../types/Chats";
import axios from "axios";
import type { Message } from "../types/Messages";
import { apiClient } from "./users";
export const getChatByUsers = async (userIds: string[]): Promise<ChatWitUsers | undefined> => {
    try {
        const response = await apiClient.get<ChatWitUsers>(`/chats/find`, {
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

export const createChat = async (payload : PostChatPayload): Promise<ChatWitUsers| undefined> =>{
  try {
     const response = await apiClient.post<ChatWitUsers>(`/chats`, payload);
    if (response.status !== 201) {
        throw new Error(response.statusText || "Failed to create chats");
    }
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export const getChatById = async (chatId: string): Promise<ChatWithMessages> => {
    const response = await apiClient.get<ChatWithMessages>(`/chats/${chatId}`);
    if (response.status !== 200) {
        throw new Error(response.statusText || "Failed to fetch chat details");
    }
    return response.data;
}

export type postMessage = Omit<Message, 'id' | 'createdAt' | 'fromId' | 'chatId'> & {
    fromId: string;
    chatId: string;
};


export const sendMessage = async (messagePayload: postMessage): Promise<Message> => {
    const response = await apiClient.post<Message>(`/messages`, messagePayload);
    if (response.status !== 201) {
        throw new Error(response.statusText || "Failed to send message");
    }
    return response.data;
}

export const getMessagesForChat = async (chatId: string): Promise<ChatWithMessages> => {
    const response = await apiClient.get<ChatWithMessages>(`/chats/${chatId}`);
    if (response.status !== 200) {
        throw new Error(response.statusText || "Failed to fetch messages");
    }
    return response.data;
}