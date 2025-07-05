"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { createUser } from "@/utils/user"

export function DrawerDialogAddUser() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="max-w-[150px] cursor-pointer mx-5">Ajouter un utilisateur</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Ajouter un utilisateur</DialogTitle>
        </DialogHeader>
        <ProfileForm />
      </DialogContent>
    </Dialog>
  )
}

export function ProfileForm({ className }: React.ComponentProps<"form">) {
  const formRef = React.useRef<HTMLFormElement>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = formRef.current
    if (!form) return

    const formData = new FormData(form)

    const newUser = {
      name: formData.get("name")?.toString().trim() || "",
      password: formData.get("password")?.toString().trim() || "",
    }

    if (!newUser.name || !newUser.password) {
      toast("Veuillez remplir tous les champs.")
      return
    }

    await createUser(newUser)
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className={cn("grid items-start gap-6", className)}
    >
      <div className="grid gap-1">
        <Label htmlFor="name">Nom</Label>
        <Input id="name" name="name" required />
      </div>
      <div className="grid gap-1">
        <Label htmlFor="password">Mot de passe</Label>
        <Input id="password" name="password" type="password" required />
      </div>
      <Button type="submit">Ajouter</Button>
    </form>
  )
}
