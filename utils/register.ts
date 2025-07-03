

import { useVehicleModalStore } from "@/store/state";
import { toast } from "sonner";

export async function registerUser(name: string, password: string) {
  const apiUrl = "https://fortunate-nariko-williamslenkeu-1c5c9d04.koyeb.app/auth/register";

  console.log("Tentative d'enregistrement avec :", { name, password });

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, password }),
    });

    console.log("Statut de la réponse :", response.status);

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Erreur lors de l'enregistrement :", errorData);
      return null;
    }

    const data = await response.json();
    toast("Utilisateur créer connectez-vous")
    console.log("Utilisateur enregistré avec succès :", data);
    return data;
  } catch (error) {
    console.error("Erreur réseau ou serveur :", error);
    return null;
  }
}


export async function loginUser(name: string, password: string): Promise<void> {
  const apiUrl = "https://fortunate-nariko-williamslenkeu-1c5c9d04.koyeb.app/auth/login";

  console.log("Tentative de connexion avec :", { name, password });

  try {
    const res = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, password }),
    });

    console.log("Statut de la réponse :", res.status);

    if (!res.ok) {
      const errorData = await res.json();
      console.error("Échec de la connexion :", errorData);
      return;
    }

    const data = await res.json();
    const token = data.token;

    if (token) {
      localStorage.setItem("jwtToken", token);
          toast("Connexion réussie")
    } else {
      console.warn("Token manquant dans la réponse !");
    }
  } catch (error) {
    console.error("Erreur réseau ou serveur :", error);
  }
}

export async function getVehiclesFromApi(): Promise<void> {
  const token = localStorage.getItem("jwtToken");

  if (!token) {
    console.error("Token JWT manquant !");
    return;
  }

  try {
    const res = await fetch("https://fortunate-nariko-williamslenkeu-1c5c9d04.koyeb.app/api/vehicles", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const error = await res.json();
      console.error("Erreur API :", error);
      return;
    }

    const data = await res.json();
    localStorage.setItem('number',data.length)
    useVehicleModalStore.getState().setVehicles(data);
    console.log("Véhicules chargés dans le store Zustand :", data);

  } catch (err) {
    console.error("Erreur réseau :", err);
  }
}

// utils/updateVehicle.ts

export type VehicleUpdatePayload = {
  brand: string;
  model: string;
  type: string;
  plateNumber: string;
  year: number;
  price: number;
};

export async function updateVehicle(id: string, updatedData: VehicleUpdatePayload): Promise<void> {
  const token = localStorage.getItem("jwtToken");

  if (!token) {
    console.error("Token JWT manquant !");
    return;
  }

  try {
    const res = await fetch(`https://fortunate-nariko-williamslenkeu-1c5c9d04.koyeb.app/api/vehicles/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedData),
    });

    console.log("Statut de la réponse :", res.status);

    if (!res.ok) {
      const error = await res.json();
      console.error("Erreur lors de la mise à jour du véhicule :", error);
      return;
    }

    const data = await res.json();
    toast("Mise à jour réussie")
        useVehicleModalStore.getState().setReload()
        useVehicleModalStore.getState().toggleModal()
  } catch (error) {
    console.error("Erreur réseau ou serveur :", error);
  }
}

// utils/deleteVehicle.ts

export async function deleteVehicle(id: string): Promise<void> {
  const token = localStorage.getItem("jwtToken");

  if (!token) {
    console.error("Token JWT manquant !");
    return;
  }

  try {
    const res = await fetch(`https://fortunate-nariko-williamslenkeu-1c5c9d04.koyeb.app/api/vehicles/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Statut de la réponse :", res.status);

    if (res.status === 204) {
      toast(`✅ Véhicule #${id} supprimé avec succès.`)
      useVehicleModalStore.getState().setReload()
      useVehicleModalStore.getState().toggleModal()
    } else {
      const errorData = await res.json();
      console.log("❌ Erreur lors de la suppression :", errorData);
    }
  } catch (error) {
    console.error("❌ Erreur réseau ou serveur :", error);
  }
}

// utils/createVehicle.ts

export type VehiclePayload = {
  brand: string;
  model: string;
  type: string;
  plateNumber: string;
  year: number;
  price: number;
};

export async function createVehicle(data: VehiclePayload): Promise<void> {
  const token = localStorage.getItem("jwtToken");

  if (!token) {
    console.error("Token JWT manquant !");
    return;
  }

  try {
    const res = await fetch("https://fortunate-nariko-williamslenkeu-1c5c9d04.koyeb.app/api/vehicles", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    console.log("Statut de la réponse :", res.status);

    if (res.status === 200) {
      const created = await res.json();
      toast("✅ Véhicule créé avec succès")
      useVehicleModalStore.getState().setReload()
      useVehicleModalStore.getState().toggleModal()
      
    } else {
      const error = await res.json();
      console.log(error)
      toast("❌ Erreur lors de la création")
      useVehicleModalStore.getState().setReload()
      useVehicleModalStore.getState().toggleModal()
    }
  } catch (err) {
    console.error("❌ Erreur réseau ou serveur :", err);
  }
}
