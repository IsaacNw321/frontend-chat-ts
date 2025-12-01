import type { Message } from "./Messages";
import type { User } from "./Users";
export interface Chat {
  id: string;
}

export interface ChatWitUsers extends Chat {
    users: User[];
}

export interface ChatWithMessages extends Chat {
    messages: Message[];
}

export interface PostChatPayload {
  userIds: string[];
}

export interface UserChatProps {
    chatId: string;
    currentUser: User | undefined;
    allUsers: User[];
}

export interface UserChats {
  chats : ChatWitUsers[];
}