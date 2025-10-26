import { Args, Float, Int, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class HelloWorldResolver {
  @Query(() => String, {
    name: 'hello',
    description: 'A simple Hello World query',
  })
  helloWorld(): string {
    return 'Hello World!';
  }

  @Query(() => Float, {
    name: 'randomNumber',
    description: 'Get a random float number between 0 and 1',
  })
  getRandom(): number {
    return Math.random() * 100;
  }

  @Query(() => Int, {
    name: 'randomFromZeroTo',
    description:
      'Get a random integer number between 0 and the provided "to" value (exclusive)',
  })
  getRandomFromZeroTo(
    @Args('to', { type: () => Int, nullable: true }) to: number = 6,
  ): number {
    return Math.floor(Math.random() * to);
  }
}
