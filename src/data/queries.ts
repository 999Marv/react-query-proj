import { useQueries, useQuery } from '@tanstack/react-query';
import { getTodo, getTodos } from './data';

export function useTodos() {
  return useQuery({
    queryKey: ['todos'],
    queryFn: getTodos,
  });
}

export function useTodo(ids: (number | undefined)[] | undefined) {
  return useQueries({
    queries: (ids ?? []).map((id) => {
      return {
        queryKey: ['todo', id],
        queryFn: () => getTodo(id!),
      };
    }),
  });
}
