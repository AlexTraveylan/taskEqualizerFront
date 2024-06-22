import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useTranslation } from "@/lib/client-custom"
import { useLngState } from "@/lib/lng-store"
import { familyService } from "@/lib/services/family"
import { useQuery } from "@tanstack/react-query"
import { RowPossibleTask } from "./row_p_task"

export const DisplayPossibleTasks = () => {
  const query = useQuery({ queryKey: ["possibleTasks"], queryFn: familyService.getFamilyPossibleTasks })
  const { lng } = useLngState()
  const t = useTranslation(lng, "create-p-task")

  if (!query.data) {
    return <></>
  }

  return (
    <Card x-chunk="dashboard-06-chunk-0">
      <CardHeader>
        <CardTitle>{t("title")}</CardTitle>
        <CardDescription>{t("description")}</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t("name_label")}</TableHead>
              <TableHead className="hidden md:table-cell">{t("description_label")}</TableHead>
              <TableHead className="hidden md:table-cell">{t("created_at_label")}</TableHead>
              <TableHead className="hidden md:table-cell">{t("updated_at_label")}</TableHead>
              <TableHead className="hidden md:table-cell">{t("delete_label")}</TableHead>

              <TableHead>
                <span className="sr-only">{t("actions_label")}</span>
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
