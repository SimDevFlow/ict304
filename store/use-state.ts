import { create } from 'zustand';

export interface User {
  id: string;
  name: string;
  password: string;
}

interface UserModalStore {
  isOpen: boolean;
  reload: boolean;
  selectedId: string | null;
  user: User | null;
  users: User[];

  openModal: (id: string) => void;
  closeModal: () => void;
  toggleModal: (id?: string) => void;

  setUser: (user: User) => void;
  setUsers: (users: User[]) => void;
  toggleReload: () => void;
}

export const useUserModalStore = create<UserModalStore>((set, get) => ({
  isOpen: false,
  reload: false,
  selectedId: null,
  user: null,
  users: [],

  openModal: (id: string) =>
    set({ isOpen: true, selectedId: id, user: null }),

  closeModal: () =>
    set({ isOpen: false, selectedId: null, user: null, reload: false }),

  toggleModal: (id?: string) => {
    const { isOpen, selectedId } = get();
    if (isOpen) {
      set({ isOpen: false, selectedId: null, user: null });
    } else if (id && selectedId !== id) {
      set({ isOpen: true, selectedId: id, user: null });
    }
  },

  toggleReload: () => {
    const { reload } = get();
    set({ reload: !reload });
  },

  setUser: (user: User) => set({ user }),

  setUsers: (users: User[]) => set({ users }),
}));
