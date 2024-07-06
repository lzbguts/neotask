import { Checkbox } from "@nextui-org/checkbox"
import { Task as TaskModel } from "@prisma/client"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { deleteTask, updateTask } from "../actions"
import { getTranslationKey } from "@/utils/functions"
import { useTranslations } from "next-intl"
import { Button } from "@nextui-org/button"
import { Loader2, Trash2 } from "lucide-react"
import { useDraggable } from '@dnd-kit/core';
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from '@dnd-kit/utilities';

type Props = {
  task: TaskModel;
  id: string;
  activeIndex: number;
}

export const Task = ({ task, id, activeIndex }: Props) => {
  const t = useTranslations();
  const queryClient = useQueryClient();
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const { toast } = useToast();

  const deleteMutation = useMutation({
    mutationFn: async ({ id }: { id: string }) => {
      setIsDeleteLoading(true);
      await deleteTask({ id })
      setIsDeleteLoading(false);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: (error) => {
      toast({
        title: t("titles.error"),
        description: t(`errors.${getTranslationKey(error.message)}`),
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, isDone }: { id: string, isDone: boolean }) => {
      await updateTask({ id, isDone })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: (error) => {
      toast({
        title: t("titles.error"),
        description: t(`errors.${getTranslationKey(error.message)}`),
      });
    },
  });

  const {
    listeners,
    attributes,
    setNodeRef,
    transition,
    transform,
    active,
    isSorting,
    index,
    over
  } = useSortable({
    id
  });

  const isActive = active?.id === id;
  const insertPosition =
    over?.id === id ? (index > activeIndex ? 1 : -1) : undefined;

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div className="flex flex-row justify-between items-center w-full p-4 my-2 bg-white rounded-xl shadow-md" ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <div className="flex flex-row gap-4">
        <Checkbox
          isSelected={task?.isDone}
          onChange={(e) => updateMutation.mutate({ id: task.id, isDone: e.target.checked })}
        />
        <p>{task?.title}</p>
      </div>
      <Button isIconOnly onClick={() => deleteMutation.mutate({ id: task.id })}>
        {isDeleteLoading ? <Loader2 className="animate-spin" /> : <Trash2 />}
      </Button>
    </div>
  )
}