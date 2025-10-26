import { Field, InputType, Int } from '@nestjs/graphql';
import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

@InputType()
export class UpdateTodoInput {
  @Field(() => Int, {
    description: 'ID of the todo item to update',
  })
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  id: number;

  @Field(() => String, {
    description: 'Description of the todo item',
    nullable: true,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  @IsOptional()
  description?: string;

  @Field(() => Boolean, {
    description: 'Completion status of the todo item',
    nullable: true,
  })
  @IsOptional()
  @IsBoolean()
  done?: boolean;
}
