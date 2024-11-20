import { useQuery } from '@tanstack/react-query';
import { getTodos } from './data';

export function useTodos() {
  return useQuery({
    queryKey: ['todos'],
    queryFn: getTodos,
  });
}
