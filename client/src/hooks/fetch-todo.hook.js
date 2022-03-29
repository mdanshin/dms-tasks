import { useCallback } from "react"
import TaskService from "../services/task-service"

export function useFetchTodo() {
    
    const fetchTodo = useCallback(async () => {
        const tasks = await TaskService.getTasks()
        return tasks
      }, [])

      return {
        fetchTodo
      }
}
