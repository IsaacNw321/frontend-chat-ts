import type { Message } from "./Messages";
export interface Chat {
  id: string;
}

export interface ChatWithMessages extends Chat {
    messages: Message[];
}