import { create } from 'zustand';

export interface User {
  id: number | string;
  name: string;
}

export interface ChatStoreState {
  selectedUsers: User[];
  addUser: (user: User) => void;
  removeUser: (userId: number | string) => void;
  clearSelectedUsers: () => void;
}

const useChatStore = create<ChatStoreState>((set) => ({
  selectedUsers: [],

  addUser: (user) => set((state) => {
    const isAlreadySelected = state.selectedUsers.some(u => u.id === user.id);
    
    if (isAlreadySelected) {
      return state;
    }

    return {
      selectedUsers: [...state.selectedUsers, user],
    };
  }),

  removeUser: (userId) => set((state) => ({
    selectedUsers: state.selectedUsers.filter(user => user.id !== userId),
  })),

  clearSelectedUsers: () => set({
    selectedUsers: [],
  }),
}));

export default useChatStore;