"use client"

import { Task } from "@/lib/schema/task"
import { familyService } from "@/lib/services/family"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"


export const CurrentTaskForm = ({ currentTask}: {currentTask: Task}) => {
    const query = useQuery({ queryKey: ["possibleTasks"], queryFn: familyService.getFamilyPossibleTasks })

    if (!query.data) {
        return <></>
    }

    const currentPossibleTask = query.data.find((possibleTask) => possibleTask.id === currentTask.related_possible_task)

    const now = new Date()
    const task_stated_at = new Date(currentTask.created_at)
    const diff = now.getTime() - task_stated_at.getTime();

    const [second, setSecond] = useState(Math.floor(diff / 1000));

    useEffect(() => {
        const interval = setInterval(() => {
            setSecond((second) => second + 1)
        }, 1000)
        return () => clearInterval(interval)
    }, [])

    return (
        <Card>
            <CardHeader>
            <CardTitle>{currentPossibleTask?.possible_task_name}</CardTitle>
            <CardDescription>{currentPossibleTask?.description}</CardDescription>
            </CardHeader>
            <CardContent>

            <div className="flex items-center justify-between">
                <p>{second} seconds</p>
                <Button>Finish</Button>
            </div>

            </CardContent>
        </Card>
    )
}
