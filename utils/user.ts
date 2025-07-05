import { useUserModalStore } from "@/store/use-state";
import { toast } from "sonner";

export async function getUsersFromApi(): Promise<void> {
  const token = localStorage.getItem("jwtToken");

  if (!token) {
    console.error("Token JWT manquant !");
    return;
  }

  try {
    const res = await fetch("https://cheap-impala-simdevflow-3748da79.koyeb.app/api/users", {
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
    localStorage.setItem('userCount', data.length);
    useUserModalStore.getState().setUsers(data);
    console.log("Utilisateurs chargés dans le store Zustand :", data);
  } catch (err) {
    console.error("Erreur réseau :", err);
  }
}

export type UserPayload = {
  name: string;
  password: string;
};

export async function createUser(data: UserPayload): Promise<void> {
  const token = localStorage.getItem("jwtToken");

  if (!token) {
    console.error("Token JWT manquant !");
    return;
  }

  try {
    const res = await fetch("https://cheap-impala-simdevflow-3748da79.koyeb.app/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (res.status === 200) {
      const created = await res.json();
      toast("✅ Utilisateur créé avec succès");
      useUserModalStore.getState().toggleReload();
      useUserModalStore.getState().toggleModal();
    } else {
      const error = await res.json();
      console.log(error);
      toast("❌ Erreur lors de la création");
      useUserModalStore.getState().toggleReload();
      useUserModalStore.getState().toggleModal();
    }
  } catch (err) {
    console.error("❌ Erreur réseau ou serveur :", err);
  }
}

export type UserUpdatePayload = {
  name: string;
  password: string;
};

export async function updateUser(id: string, updatedData: UserUpdatePayload): Promise<void> {
  const token = localStorage.getItem("jwtToken");

  if (!token) {
    console.error("Token JWT manquant !");
    return;
  }

  try {
    const res = await fetch(`https://cheap-impala-simdevflow-3748da79.koyeb.app/api/users/${id}`, {
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
      console.error("Erreur lors de la mise à jour de l'utilisateur :", error);
      return;
    }

    const data = await res.json();
    toast("Mise à jour réussie");
    useUserModalStore.getState().toggleReload();
    useUserModalStore.getState().toggleModal();
  } catch (error) {
    console.error("Erreur réseau ou serveur :", error);
  }
}

export async function deleteUser(id: string): Promise<void> {
  const token = localStorage.getItem("jwtToken");

  if (!token) {
    console.error("Token JWT manquant !");
    return;
  }

  try {
    const res = await fetch(`https://cheap-impala-simdevflow-3748da79.koyeb.app/api/users/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Statut de la réponse :", res.status);

    if (res.status === 204) {
      toast(`✅ Utilisateur #${id} supprimé avec succès.`);
      useUserModalStore.getState().toggleReload();
      useUserModalStore.getState().toggleModal();
    } else {
      const errorData = await res.json();
       toast("❌ Erreur lors de la suppression");
      console.log("❌ Erreur lors de la suppression :", errorData);
    }
  } catch (error) {
    console.error("❌ Erreur réseau ou serveur :", error);
  }
}
