"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { TableCell, TableRow } from "@/components/ui/table"
import { useTranslation } from "@/lib/client-custom"
import { useLngState } from "@/lib/lng-store"
import { PossibleTask } from "@/lib/schema/possible-task"
import { possibleTaskService } from "@/lib/services/possible-task"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { SquareArrowOutUpRight, Trash } from "lucide-react"

export const RowPossibleTask = ({ p_task }: { p_task: PossibleTask }) => {
  const queryClient = useQueryClient()
  const { lng } = useLngState()
  const t = useTranslation(lng, "create-p-task")

  const handleSubmitUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const possible_task_name = formData.get("possible_task_name") as string
    const description = formData.get("description") as string

    if (!possible_task_name || !description) {
      return
    }

    updateMutation.mutate({ id: p_task.id, possible_task_name, description })
  }

  const deleteMutation = useMutation({
    mutationFn: possibleTaskService.deletePossibleTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["possibleTasks"] })
    },
  })

  const updateMutation = useMutation({
    mutationFn: possibleTaskService.updatePossibleTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["possibleTasks"] })
    },
  })

  return (
    <TableRow>
      <TableCell className="font-medium">{p_task.possible_task_name}</TableCell>
      <TableCell className="hidden md:table-cell">{p_task.description}</TableCell>
      <TableCell className="hidden md:table-cell">{new Date(p_task.created_at).toLocaleString()}</TableCell>
      <TableCell>
        <Dialog>
          <DialogTrigger asChild>
            <SquareArrowOutUpRight className="cursor-pointer" />
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <form onSubmit={handleSubmitUpdate}>
              <DialogHeader>
                <DialogTitle>{t("dialog_edit")}</DialogTitle>
                <DialogDescription>{t("dialog_description")}</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="possible_task_name" className="text-right">
                    {t("dialog_name_label")}
                  </Label>
                  <Input id="possible_task_name" defaultValue={p_task.possible_task_name} className="col-span-3" name="possible_task_name" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">
                    {t("dialog_description_label")}
                  </Label>
                  <Input id="description" defaultValue={p_task.description} className="col-span-3" name="description" />
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="submit">{t("dialog_button_label")}</Button>
                </DialogClose>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </TableCell>
      <TableCell>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Trash className="cursor-pointer text-destructive" />
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{t("alert_delete_title")}</AlertDialogTitle>
              <AlertDialogDescription>{t("alert_delete_description")}</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>{t("alert_delete_cancel")}</AlertDialogCancel>
              <AlertDialogAction onClick={() => deleteMutation.mutate(p_task.id)} className="cursor-pointer">
                {t("alert_delete_confirm")}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </TableCell>
    </TableRow>
  )
}
