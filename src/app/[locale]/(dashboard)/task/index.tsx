import { Checkbox } from "@nextui-org/checkbox";
import { Task as TaskModel } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@nextui-org/button";
import { Loader2, Trash2 } from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { deleteTask, updateTask } from "../actions";

import { getTranslationKey } from "@/utils/functions";
import { useToast } from "@/components/ui/use-toast";

type Props = {
  task: TaskModel;
  id: string;
};

export const Task = ({ task, id }: Props) => {
  const t = useTranslations();
  const queryClient = useQueryClient();
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const { toast } = useToast();

  const deleteMutation = useMutation({
    mutationFn: async ({ id }: { id: string }) => {
      setIsDeleteLoading(true);
      await deleteTask({ id });
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
    mutationFn: async ({ id, isDone }: { id: string; isDone: boolean }) => {
      await updateTask({ id, isDone });
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
  } = useSortable({
    id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      className="flex flex-row justify-between items-center w-full p-4 my-2 bg-box-secondary rounded-xl shadow-md"
      style={style}
      {...attributes}
      {...listeners}
    >
      <div className="flex flex-row gap-4">
        <Checkbox
          isSelected={task?.isDone}
          onChange={(e) =>
            updateMutation.mutate({ id: task.id, isDone: e.target.checked })
          }
        />
        <p>{task?.title}</p>
      </div>
      <Button isIconOnly onClick={() => deleteMutation.mutate({ id: task.id })}>
        {isDeleteLoading ? <Loader2 className="animate-spin" /> : <Trash2 />}
      </Button>
    </div>
  );
};
