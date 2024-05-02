import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Person } from './entities/person.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PersonService {

  constructor(
    @InjectRepository(Person)
    private readonly personRepository: Repository<Person>
  ){}

  create(createPersonDto: CreatePersonDto) {
    const existPerson = this.personRepository.count({});
    if(existPerson){
      throw new BadRequestException('Solo puede haber una persona registrada');
    }
    return this.personRepository.save(createPersonDto);
  }

  findAll() {
    return this.personRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} person`;
  }

  update(id: number, updatePersonDto: UpdatePersonDto) {
    return `This action updates a #${id} person`;
  }

  remove(id: number) {
    return `This action removes a #${id} person`;
  }
}
