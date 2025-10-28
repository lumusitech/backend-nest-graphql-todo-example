import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CreateTodoInput, StatusArgs, UpdateTodoInput } from './dto';
import { Todo } from './entity/todo.entity';
import { TodoService } from './todo.service';
import { Aggregations } from './types/aggregations.type';

@Resolver(() => Todo)
export class TodoResolver {
  constructor(private readonly todoService: TodoService) {}

  @Query(() => [Todo], {
    name: 'todos',
    description: 'Retrieve all todo items',
  })
  findAll(@Args() statusArgs: StatusArgs): Todo[] {
    return this.todoService.findAll(statusArgs);
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
    return this.todoService.update(updateTodoInput.id, updateTodoInput);
  }

  @Mutation(() => Boolean, {
    name: 'removeTodo',
    description: 'Remove a todo item by its ID',
  })
  removeTodo(@Args('id', { type: () => Int }) id: number) {
    return this.todoService.remove(id);
  }

  // Aggregations
  @Query(() => Int, {
    name: 'completedTodos',
    description: 'Get the total number of completed todos',
  })
  completedTodos(): number {
    return this.todoService.completedTodos;
  }

  @Query(() => Int, {
    name: 'pendingTodos',
    description: 'Get the total number of pending todos',
  })
  pendingTodos(): number {
    return this.todoService.pendingTodos;
  }

  @Query(() => Int, {
    name: 'totalTodos',
    description: 'Get the total number of todos',
  })
  totalTodos(): number {
    return this.todoService.totalTodos;
  }

  @Query(() => Aggregations, {
    name: 'todoAggregations',
    description: 'Get aggregated statistics of todos',
  })
  aggregations(): Aggregations {
    return {
      total: this.todoService.totalTodos,
      completed: this.todoService.completedTodos,
      pending: this.todoService.pendingTodos,
      obsoleteField: 'This field is obsolete',
    };
  }
}
