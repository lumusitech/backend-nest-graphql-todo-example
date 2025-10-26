import { Query, Resolver } from '@nestjs/graphql';
import { Todo } from './todo.entity';

@Resolver()
export class TodoResolver {
  //TODO: implement below methods
  @Query(() => [Todo], {
    name: 'todos',
    description: 'Retrieve all todo items',
  })
  findAll(): Todo[] {
    return [];
  }

  findOne(id: number): Todo {
    return { id, description: 'Sample Todo', done: false };
  }

  createTodo(description: string): Todo {
    return { id: 1, description };
  }

  updateTodo(id: number, description: string, done: boolean) {
    return { id, description, done };
  }

  removeTodo(id: number) {
    return { id, deleted: true };
  }
}
