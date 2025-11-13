import type  { Chat, ChatWithMessages } from "../types/Chats";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import type { Message } from "../types/Messages";
const axiosPrivate = useAxiosPrivate()
export const getChatsForUser = async (userId: string): Promise<Chat[]> => {
    const response = await axiosPrivate.get<Chat[]>(`/users/${userId}/chats`);
    if (response.status !== 200) {
        throw new Error(response.statusText || "Failed to fetch chats");
    }
    return response.data;
}

export const getChatById = async (chatId: string): Promise<ChatWithMessages> => {
    const response = await axiosPrivate.get<ChatWithMessages>(`/chats/${chatId}`);
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
    const response = await axiosPrivate.post<Message>(`/chats/${messagePayload.chatId}/messages`, messagePayload);
    if (response.status !== 201) {
        throw new Error(response.statusText || "Failed to send message");
    }
    return response.data;
}

export const getMessagesForChat = async (chatId: string): Promise<Message[]> => {
    const response = await axiosPrivate.get<Message[]>(`/chats/${chatId}/messages`);
    if (response.status !== 200) {
        throw new Error(response.statusText || "Failed to fetch messages");
    }
    return response.data;
}