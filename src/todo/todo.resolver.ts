import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateTodoInput } from './dto/input/create-todo.input';
import { UpdateTodoInput } from './dto/input/update-todo.input';
import { Todo } from './entity/todo.entity';
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

  @Mutation(() => Todo, {
    name: 'createTodo',
    description: 'Create a new todo item',
  })
  createTodo(@Args('createTodoInput') createTodoInput: CreateTodoInput): Todo {
    return this.todoService.create(createTodoInput);
  }

  @Mutation(() => Todo, {
    name: 'updateTodo',
    description: 'Update an existing todo item',
  })
  updateTodo(@Args('updateTodoInput') updateTodoInput: UpdateTodoInput): Todo {
    return this.todoService.update(updateTodoInput);
  }

  removeTodo(id: number) {
    return { id, deleted: true };
  }
}
