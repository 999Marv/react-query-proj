import { useTodos } from '../data/queries';

export default function Todos() {
  const todos = useTodos();

  if (todos.isLoading) {
    return <span>Loading...</span>;
  }

  if (todos.isError) {
    return <span>there is an error</span>;
  }

  return (
    <span>
      {todos.data?.map((todo) => {
        return <p key={todo.id}>{todo.title}</p>;
      })}
    </span>
  );
}
