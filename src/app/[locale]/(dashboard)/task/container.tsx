"use client";

import { useQuery } from "@tanstack/react-query";
import { User } from "@supabase/supabase-js";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useEffect, useState } from "react";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { getTasks, updateTaskOrder } from "../actions";

import { Task } from ".";

type Props = {
  user: User;
};

export const TasksContainer = ({ user }: Props) => {
  const t = useTranslations();
  const tasks = useQuery({
    queryKey: ["tasks"],
    queryFn: () => getTasks({ userId: user.id }),
  });
  const [items, setItems] = useState<string[]>([]);

  useEffect(() => {
    setItems(tasks.data?.map((task) => task.id) || []);
  }, [tasks.data]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragEnd = async (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = items.indexOf(active.id);
      const newIndex = items.indexOf(over.id);
      const arrayM = arrayMove(items, oldIndex, newIndex);

      setItems(arrayM);
      await updateTaskOrder({
        tasks: arrayM.map((id, index) => ({ id, index })),
      });
    }
  };

  return (
    <div
      className={`flex flex-col w-full h-full p-4 ${tasks.isLoading && "justify-center items-center"}`}
      id="tasks"
    >
      {tasks.isLoading && <Loader2 className="animate-spin" />}
      {tasks.isError && (
        <p>
          {t("titles.error")}: {tasks.error.message}
        </p>
      )}
      <DndContext
        collisionDetection={closestCenter}
        sensors={sensors}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
          {items?.map((item) => (
            <Task
              key={item}
              id={item}
              task={tasks.data?.find((task) => task.id === item) as any}
            />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
};
