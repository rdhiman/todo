export interface TodoResponse {
  todos: Partial<Todo>[];
}

export interface Todo {
  id: string,
  description: string,
  isComplete: boolean,
  dueDate: string
}
