// vehicleModalStore.ts
import { create } from 'zustand';

export interface Vehicle {
    brand: string;
    model: string;
    type: string;
    plateNumber: string;
    year: number;
    price: number;
    id:string
}

interface VehicleModalStore {
    isOpen: boolean;
    reload: boolean;
    selectedId: string | null;
    vehicle: Vehicle | null;
    setReload: ()=>void;
    openModal: (id: string) => void;
    closeModal: () => void;
    toggleModal: (id?: string) => void;
    setVehicle: (vehicle: Vehicle) => void;
    setVehicles: (vehicles: Vehicle[]) => void;
    vehicles: Vehicle[];
    
}

export const useVehicleModalStore = create<VehicleModalStore>((set, get) => ({
    isOpen: false,
    selectedId: null,
    vehicle: null,
    vehicles: [],
    reload:false,

    openModal: (id: string) =>
        set({ isOpen: true, selectedId: id, vehicle: null }),

    closeModal: () =>
        set({ isOpen: false, selectedId: null, vehicle: null }),

    toggleModal: (id?: string) => {
        const { isOpen } = get();
        if (isOpen) {
            set({ isOpen: false, selectedId: null, vehicle: null });
        } else if (id) {
            set({ isOpen: true, selectedId: id, vehicle: null });
        }
    },
    setReload: ()=>{
        const {reload} = get()
        set({reload:!reload})
    },
    setVehicles: (vehicles: Vehicle[]) => set({ vehicles }),
    setVehicle: (vehicle: Vehicle) => set({ vehicle }),
}));
