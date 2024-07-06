"use server"

import { Link } from "@/types"
import { api } from "@/utils/api"
import { prisma } from "@/utils/prisma"
import type { Task } from "@prisma/client"

export const getSocialMedia = async (): Promise<Link[]> => {
  try {
    const res = await api.get("/social")
    return res.data
  }
  catch (error) {
    console.error(error)
    return []
  }
}

export const getTasks = async ({ userId }: { userId: string }): Promise<Task[]> => {
  try {
    const tasks = await prisma.task.findMany({
      where: {
        userId
      },
      orderBy: [
        { order: "desc" },
        { createdAt: "desc" }
      ]
    })
    return tasks
  }
  catch (error) {
    console.error(error)
    return []
  }
}

export const createTask = async ({ userId, title }: { userId: string, title: string }): Promise<Task | null> => {
  try {
    const task = await prisma.task.create({
      data: {
        title,
        userId
      }
    })
    return task
  }
  catch (error) {
    console.error(error)
    return null
  }
}

export const deleteTask = async ({ id }: { id: string }): Promise<Task | null> => {
  try {
    const task = await prisma.task.delete({
      where: {
        id
      }
    })
    return task
  }
  catch (error) {
    console.error(error)
    return null
  }
}

export const updateTask = async ({ id, isDone, order }: { id: string, isDone: boolean, order: number }): Promise<Task | null> => {
  try {
    const task = await prisma.task.update({
      where: {
        id
      },
      data: {
        isDone,
        order
      }
    })
    return task
  }
  catch (error) {
    console.error(error)
    return null
  }
}