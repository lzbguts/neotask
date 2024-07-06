"use client"

import { useQuery } from "@tanstack/react-query"
import { getTasks } from "../actions"
import { User } from "@supabase/supabase-js"
import { Loader2 } from "lucide-react"
import { Checkbox } from "@nextui-org/checkbox";
import { Task } from "."
import { useTranslations } from "next-intl"

type Props = {
  user: User
}

export const TasksContainer = ({ user }: Props) => {
  const t = useTranslations()
  const tasks = useQuery({
    queryKey: ["tasks"],
    queryFn: () => getTasks({ userId: user.id })
  })

  return (
    <div id="tasks" className={`flex flex-col w-full h-full p-4 ${tasks.isLoading && "justify-center items-center"}`}>
      {tasks.isLoading && <Loader2 className="animate-spin" />}
      {tasks.isError && <p>{t("titles.error")}: {tasks.error.message}</p>}
      {tasks.data?.map((task) => <Task key={task.id} task={task} />)}
    </div>
  )
}