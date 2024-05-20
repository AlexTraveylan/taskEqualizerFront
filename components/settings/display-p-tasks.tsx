import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { familyService } from "@/lib/services/family"
import { possibleTaskService } from "@/lib/services/possible-task"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { RowPossibleTask } from "./row_p_task"

export const DisplayPossibleTasks = () => {
  const queryClient = useQueryClient()
  const query = useQuery({ queryKey: ["possibleTasks"], queryFn: familyService.getFamilyPossibleTasks })

  const mutation = useMutation({
    mutationFn: possibleTaskService.deletePossibleTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["possibleTasks"] })
    },
  })

  if (!query.data) {
    return <></>
  }

  return (
    <Card x-chunk="dashboard-06-chunk-0">
      <CardHeader>
        <CardTitle>Possibles tasks</CardTitle>
        <CardDescription>Gestion des taches possibles.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead className="hidden md:table-cell">Description</TableHead>
              <TableHead className="hidden md:table-cell">Total executed</TableHead>
              <TableHead className="hidden md:table-cell">Total time</TableHead>
              <TableHead className="hidden md:table-cell">Created at</TableHead>
              <TableHead className="hidden md:table-cell">Update</TableHead>
              <TableHead className="hidden md:table-cell">Delete</TableHead>

              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {query.data.map((possibleTask, index) => (
              <>
                <RowPossibleTask key={`${index}_${possibleTask.id}`} p_task={possibleTask} />
              </>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
