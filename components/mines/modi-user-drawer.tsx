"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { toast } from "sonner"
import { useUserModalStore } from "@/store/use-state"
import { deleteUser, updateUser } from "@/utils/user"

export function DrawerDialogDemo() {
  const isOpen = useUserModalStore((state) => state.isOpen)
  const toggleOpen = useUserModalStore((state) => state.toggleModal)

  return (
    <Dialog open={isOpen} onOpenChange={() => toggleOpen("id")}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Informations sur l'utilisateur</DialogTitle>
        </DialogHeader>
        <ProfileForm />
      </DialogContent>
    </Dialog>
  )
}

export function ProfileForm({ className }: React.ComponentProps<"form">) {
  const user = useUserModalStore((state) => state.user)
  const formRef = React.useRef<HTMLFormElement>(null)

  if (!user) return <p>Aucun utilisateur sélectionné.</p>

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = formRef.current
    if (!form) return

    const formData = new FormData(form)
    const updatedData = {
      name: formData.get("name")?.toString().trim() || "",
      password: formData.get("password")?.toString().trim() || "",
    }

    const hasChanged =
      updatedData.name !== user.name ||
      updatedData.password !== user.password

    if (hasChanged) {
      console.log("Changements détectés. Mise à jour en cours...")
      await updateUser(user.id, updatedData)
    } else {
      toast("Aucune modification détectée. Pas de mise à jour")
    }
  }

  const handleDelete = async (id: string) => {
    await deleteUser(id)
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className={cn("grid items-start gap-6", className)}
    >
      <div className="grid gap-1">
        <Label htmlFor="name">Nom</Label>
        <Input id="name" name="name" defaultValue={user.name} />
      </div>
      <div className="grid gap-1">
        <Label htmlFor="password">Mot de passe</Label>
        <Input
          id="password"
          name="password"
          type="password"
          defaultValue={user.password}
        />
      </div>
      <div className="flex justify-between">
        <Button
          type="button"
          className="bg-red-500"
          onClick={() => handleDelete(user.id)}
        >
          Supprimer
        </Button>
        <Button type="submit">Mettre à jour</Button>
      </div>
    </form>
  )
}
