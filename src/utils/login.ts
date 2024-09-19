"use server"
import { signIn, signOut } from "../auth"

export async function login(provider: string) {
  const res = await signIn(provider)
  return res
}

export async function logout() {
  const res = await signOut()
  return res
}