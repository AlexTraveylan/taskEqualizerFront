import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PossibleTask } from "@/lib/schema/possible-task"

export const PossibleTaskCardForm = ({ possibleTask }: { possibleTask: PossibleTask }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{possibleTask.possible_task_name}</CardTitle>
        <CardDescription>{possibleTask.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <Label>
            <span>Name</span>
            <Input type="text" name="possible_task_name" defaultValue={possibleTask.possible_task_name} />
          </Label>
          <Label>
            <span>Description</span>
            <Input type="text" name="description" defaultValue={possibleTask.description} />
          </Label>
          <Button type="submit">Update</Button>
        </form>
      </CardContent>
    </Card>
  )
}
