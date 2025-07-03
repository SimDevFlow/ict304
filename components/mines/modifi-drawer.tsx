"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useVehicleModalStore } from "@/store/state";
import { deleteVehicle, updateVehicle } from "@/utils/register";
import { toast } from "sonner";

export function DrawerDialogDemo() {
  const isOpen = useVehicleModalStore((state) => state.isOpen);
  const toogleOpen = useVehicleModalStore((state) => state.toggleModal);

  return (
    <Dialog open={isOpen} onOpenChange={() => toogleOpen("id")}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Informations sur le véhicule</DialogTitle>
        </DialogHeader>
        <ProfileForm />
      </DialogContent>
    </Dialog>
  );
}

export function ProfileForm({ className }: React.ComponentProps<"form">) {
  const vehicule = useVehicleModalStore((state) => state.vehicle);

  const formRef = React.useRef<HTMLFormElement>(null);

  if (!vehicule) return <p>Aucun véhicule sélectionné.</p>;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = formRef.current;
    if (!form) return;

    const formData = new FormData(form);

    const updatedData = {
      brand: formData.get("brand")?.toString().trim() || "",
      model: formData.get("model")?.toString().trim() || "",
      type: formData.get("type")?.toString().trim() || "",
      plateNumber: formData.get("plateNumber")?.toString().trim() || "",
      year: Number(formData.get("year")) || 0,
      price: Number(formData.get("price")) || 0,
    };

    const hasChanged =
      updatedData.brand !== vehicule.brand ||
      updatedData.model !== vehicule.model ||
      updatedData.type !== vehicule.type ||
      updatedData.plateNumber !== vehicule.plateNumber ||
      updatedData.year !== vehicule.year ||
      updatedData.price !== vehicule.price;

    if (hasChanged) {
      console.log("Changements détectés. Mise à jour en cours...");
      await updateVehicle(vehicule.id, updatedData);
    } else {
      toast("Aucune modification détectée. Pas de mise à jour");
    }
  };

  const handleDelete = async (id:string) => {
    await deleteVehicle(id); // Suppression du véhicule avec ID 3
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className={cn("grid items-start gap-6", className)}
    >
      <div className="grid gap-1">
        <Label htmlFor="brand">Marque</Label>
        <Input
          type="text"
          id="brand"
          name="brand"
          defaultValue={vehicule.brand}
        />
      </div>
      <div className="grid gap-1">
        <Label htmlFor="model">Modèle</Label>
        <Input id="model" name="model" defaultValue={vehicule.model} />
      </div>
      <div className="grid gap-1">
        <Label htmlFor="type">Type</Label>
        <Input id="type" name="type" defaultValue={vehicule.type} />
      </div>
      <div className="grid gap-1">
        <Label htmlFor="plateNumber">Numéro de plaque</Label>
        <Input
          id="plateNumber"
          name="plateNumber"
          defaultValue={vehicule.plateNumber}
        />
      </div>
      <div className="grid gap-1">
        <Label htmlFor="year">Année</Label>
        <Input
          id="year"
          name="year"
          type="number"
          defaultValue={vehicule.year}
        />
      </div>
      <div className="grid gap-1">
        <Label htmlFor="price">Prix</Label>
        <Input
          id="price"
          name="price"
          type="number"
          defaultValue={vehicule.price}
        />
      </div>
      <div className="flex justify-between">
        <Button type="button" className="bg-red-500" onClick={()=>handleDelete(vehicule.id)}>Supprimer</Button>
        <Button type="submit">Mettre à jour</Button>
      </div>
    </form>
  );
}
