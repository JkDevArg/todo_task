import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';
import { Repository } from 'typeorm';
import { Person } from 'src/person/entities/person.entity';
import { Chat } from 'src/gpt/entities/gpt.entity';
import { GptService } from 'src/gpt/gpt.service';

@Injectable()
export class TodoService {

  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
    @InjectRepository(Person)
    private readonly  personRepository: Repository<Person>,
    private readonly gptService: GptService,
  ){}
  async create(createTodoDto: CreateTodoDto) {
    return await this.todoRepository.save(createTodoDto);
  }

  async findAll() {
    return await this.todoRepository.find({order: {
      id: 'DESC'
    }});
  }

  findOne(id: number) {
    return `This action returns a #${id} todo`;
  }

  findOneByParam(param: string) {
    return `This action returns a #${param} todo`;
  }

  update(id: number, updateTodoDto: UpdateTodoDto) {
    return `This action updates a #${id} todo`;
  }

  remove(id: number) {
    return `This action removes a #${id} todo`;
  }

  async generateTasks(){
    const persons = await this.personRepository.find();
    if(persons.length === 0) throw new BadRequestException('No hay personas registradas');
    const profession = persons[0]?.profession;
    const attr = persons[0]?.attribute;
    const task = await this.findAll();
    const getcompress = await this.gptService.getCompretion(profession, attr, task[0]?.title);
    return getcompress;
  }
}
