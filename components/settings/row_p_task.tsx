import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { TableCell, TableRow } from "@/components/ui/table"
import { PossibleTask } from "@/lib/schema/possible-task"
import { possibleTaskService } from "@/lib/services/possible-task"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { MoreHorizontal } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { Input } from "../ui/input"
import { Label } from "../ui/label"

export const RowPossibleTask = ({ p_task }: { p_task: PossibleTask }) => {
  const queryClient = useQueryClient()

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
      <TableCell className="hidden md:table-cell">0</TableCell>
      <TableCell className="hidden md:table-cell">0</TableCell>
      <TableCell className="hidden md:table-cell">{p_task.created_at}</TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button aria-haspopup="true" size="icon" variant="ghost">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <Dialog>
              <DropdownMenuItem>
                <DialogTrigger asChild>
                  <button>Edit</button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>Make changes to your profile here. Click save when you're done.</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Name
                      </Label>
                      <Input id="name" defaultValue="Pedro Duarte" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="username" className="text-right">
                        Username
                      </Label>
                      <Input id="username" defaultValue="@peduarte" className="col-span-3" />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Save changes</Button>
                  </DialogFooter>
                </DialogContent>
              </DropdownMenuItem>
            </Dialog>
            <DropdownMenuItem onClick={() => deleteMutation.mutate(p_task.id)}>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  )
}
