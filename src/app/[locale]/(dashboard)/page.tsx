import { NewTask } from "./task/new";
import { TasksContainer } from "./task/container";
import { useSession } from "next-auth/react"
import { auth } from "@/auth";

export default async function Home() {
  const session = await auth()
  const user = session?.user

  return (
    <div className="flex flex-col bg-box w-full sm:w-6/12 h-[80vh] rounded-3xl">
      <NewTask user={user} />
      <TasksContainer user={user} />
    </div>
  );
}
