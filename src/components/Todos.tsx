import { useTodo, useTodos } from '../data/queries';

export default function Todos() {
  const { data, isPending, isError, fetchStatus, status } = useTodos();

  const todoQuery = useTodo([6, 7, 8]);

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>there is an error</span>;
  }

  return (
    <span>
      <p>Todos function status: {fetchStatus}</p>
      <p>Todos data status: {status}</p>
      {data?.map((todo) => {
        return <p key={todo.id}>{todo.title}</p>;
      })}

      <ul>
        {todoQuery.map(({ data }, id) => {
          return <li key={id}>{data?.title}</li>;
        })}
      </ul>
    </span>
  );
}
