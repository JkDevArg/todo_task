import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';
import { GptModule } from 'src/gpt/gpt.module';
import { Person } from 'src/person/entities/person.entity';
import { GptService } from 'src/gpt/gpt.service';

@Module({
  imports: [TypeOrmModule.forFeature([Todo, Person]), GptModule],
  controllers: [TodoController],
  providers: [TodoService]
})
export class TodoModule {}
