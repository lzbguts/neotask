import { NewTask } from "./task/new";

import { createClient } from "@/utils/supabase/server";
import { TasksContainer } from "./task/container";
import { User } from "@supabase/supabase-js";

export default async function Home() {
  const supabase = createClient();
  const {
    data: { user: user },
  } = await supabase.auth.getUser() as { data: { user: User } };

  return (
    <div className="flex flex-col bg-box w-6/12 h-[80vh] rounded-3xl">
      <NewTask user={user} />
      <TasksContainer user={user} />
    </div>
  );
}
