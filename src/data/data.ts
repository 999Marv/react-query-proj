import { Todo } from '../types';

const BASE_URL = 'http://localhost:8000/todos';

export const getTodos = async () => {
  try {
    const data = await fetch(BASE_URL);
    const response: Todo[] = await data.json();
    return response;
  } catch (error) {
    console.error(error);
  }
};
