import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { Todo } from './todo.entity';
import { TodoService } from './todo.service';

@Resolver()
export class TodoResolver {
  constructor(private readonly todoService: TodoService) {}

  //TODO: implement below methods
  @Query(() => [Todo], {
    name: 'todos',
    description: 'Retrieve all todo items',
  })
  findAll(): Todo[] {
    return this.todoService.findAll();
  }

  @Query(() => Todo, {
    name: 'todo',
    description: 'Retrieve a todo item by its ID',
  })
  findOne(@Args('id', { type: () => Int }) id: number): Todo {
    return this.todoService.findOne(id);
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
