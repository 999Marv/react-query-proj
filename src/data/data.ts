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

export const getTodo = async (id: number) => {
  try {
    const data = await fetch(`${BASE_URL}/${id}`);
    const response: Todo[] = await data.json();
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const createTodo = async (data: Todo) => {
  try {
    const response = await fetch('http://localhost:8000/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data), // Send the new todo object
    });

    if (!response.ok) {
      throw new Error('Failed to create todo');
    }

    const newTodo: Todo = await response.json();
    return newTodo; // Return the new todo
  } catch (error) {
    console.error('Error creating todo:', error);
    throw error; // Re-throw for error handling
  }
};
