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
import { createVehicle, deleteVehicle, updateVehicle } from "@/utils/register";
import { toast } from "sonner";

export function DrawerDialogAdd() {

  return (
    <Dialog>
        <DialogTrigger asChild>
          <Button className="max-w-[150px] cursor-pointer mx-5">Ajouter un véhicule</Button>
        </DialogTrigger>
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
      
      await createVehicle(updatedData);
    
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
          name="brand" required
        />
      </div>
      <div className="grid gap-1">
        <Label htmlFor="model">Modèle</Label>
        <Input id="model" name="model" required/>
      </div>
      <div className="grid gap-1">
        <Label htmlFor="type">Type</Label>
        <Input id="type" name="type" required/>
      </div>
      <div className="grid gap-1">
        <Label htmlFor="plateNumber">Numéro de plaque</Label>
        <Input
          id="plateNumber"
          name="plateNumber" required
        />
      </div>
      <div className="grid gap-1">
        <Label htmlFor="year">Année</Label>
        <Input
          id="year"
          name="year"
          type="number" required
        />
      </div>
      <div className="grid gap-1">
        <Label htmlFor="price">Prix</Label>
        <Input
          id="price"
          name="price"
          type="number" required
        />
      </div>
        <Button type="submit">Ajouter</Button>
    </form>
  );
}
