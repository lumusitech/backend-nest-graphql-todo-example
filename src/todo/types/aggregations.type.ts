import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'Aggregated todo statistics' })
export class Aggregations {
  @Field(() => Number, { description: 'Total number of todos' })
  total: number;

  @Field(() => Number, { description: 'Number of completed todos' })
  completed: number;

  @Field(() => Number, { description: 'Number of pending todos' })
  pending: number;

  @Field({
    description: 'An obsolete field for demonstration purposes',
    deprecationReason:
      'This field is no longer in use and will be removed in future versions.',
  })
  obsoleteField: string;
}
