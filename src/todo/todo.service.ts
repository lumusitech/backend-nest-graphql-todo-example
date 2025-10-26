import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoInput } from './dto/input/create-dto.input';
import { Todo } from './entity/todo.entity';

@Injectable()
export class TodoService {
  private todos: Todo[] = [
    { id: 1, description: 'Learn NestJS', done: true },
    { id: 2, description: 'Build a GraphQL API', done: false },
    { id: 3, description: 'Write unit tests', done: false },
    { id: 4, description: 'Deploy to production', done: false },
  ];

  findAll(): Todo[] {
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

  update(id: number, description: string, done: boolean): Todo | undefined {
    const todo = this.findOne(id);
    if (todo) {
      todo.description = description;
      todo.done = done;
    }
    return todo;
  }

  remove(id: number): { id: number; deleted: boolean } {
    const index = this.todos.findIndex((todo) => todo.id === id);
    if (index !== -1) {
      const [deleted] = this.todos.splice(index, 1);
      return { id: deleted.id, deleted: true };
    }
    return { id, deleted: false };
  }
}
