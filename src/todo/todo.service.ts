import { Injectable, NotFoundException } from '@nestjs/common';

import { StatusArgs } from './dto/args/status.args';
import { CreateTodoInput, UpdateTodoInput } from './dto/inputs';
import { Todo } from './entity/todo.entity';

@Injectable()
export class TodoService {
  private todos: Todo[] = [
    { id: 1, description: 'Learn NestJS', done: true },
    { id: 2, description: 'Build a GraphQL API', done: false },
    { id: 3, description: 'Write unit tests', done: false },
    { id: 4, description: 'Deploy to production', done: false },
  ];

  get totalTodos(): number {
    return this.todos.length;
  }

  get pendingTodos(): number {
    return this.todos.filter((todo) => !todo.done).length;
  }

  get completedTodos(): number {
    return this.todos.filter((todo) => todo.done).length;
  }

  findAll(statusArgs: StatusArgs): Todo[] {
    const { status } = statusArgs;
    if (status !== undefined) {
      return this.todos.filter((todo) => todo.done === status);
    }
    return this.todos;
  }

  findOne(id: number): Todo {
    const todo = this.todos.find((todo) => todo.id === id);
    if (!todo) throw new NotFoundException(`Todo with ID ${id} not found`);
    return todo;
  }

  create(createTodoInput: CreateTodoInput): Todo {
    if (
      !createTodoInput.description ||
      createTodoInput.description.trim() === ''
    ) {
      throw new Error('Description cannot be empty');
    }

    const newTodo = {
      id: Math.max(...this.todos.map((todo) => todo.id), 0) + 1,
      ...createTodoInput,
      done: false,
    };
    this.todos.push(newTodo);
    return newTodo;
  }

  update(id: number, updateTodoInput: UpdateTodoInput): Todo {
    const todo = this.findOne(id);

    if (todo) {
      todo.description = updateTodoInput.description ?? todo.description;
      todo.done = updateTodoInput.done ?? todo.done;
    }
    return todo;
  }

  remove(id: number): boolean {
    this.findOne(id); // Ensure the todo exists

    this.todos = this.todos.filter((todo) => todo.id !== id);
    return true;
  }
}
