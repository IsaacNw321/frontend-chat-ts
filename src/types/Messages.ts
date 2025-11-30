export interface Message {
  id: string;
  body: string;
  fromId: string;
  chatId: string;
  createdAt: string; 
}

export type postMessage = Omit<Message, 'id' | 'createdAt' | 'fromId' | 'chatId'> & {
  fromId: string;
  chatId: string;
};