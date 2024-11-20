import { useMutation } from "@tanstack/react-query";
import { Todo } from "../types";

export function useCreateTodo() {
    return useMutation({
        mutationFn: (data: Todo) => 
    })
}