import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from './todo.entity';

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

  create(description: string): Todo {
    const newTodo = {
      id: this.todos.length + 1,
      description,
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
