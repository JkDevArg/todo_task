import { Injectable, Logger } from '@nestjs/common';
import { OpenAI } from 'openai';
import { env } from 'process';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { InjectRepository } from '@nestjs/typeorm';
import { Chat } from './entities/gpt.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GptService {

    constructor(
        @InjectRepository(Chat)
        private readonly chatRepository: Repository<Chat>
    ){}

    async getCompretion(profession: string, attributes: string, tasks: string) {
        /* 
            const openai = new OpenAI({  apiKey: env.CHAT_API_KEY });
            const completion = await openai.chat.completions.create({
                messages: [{ 
                    role: "assistant",
                    content: `Soy un profesional en ${profession} quiero que me devuelvas una lista de mis tareas normales, ${attributes ? `por ejemplo trabajo con o como ${attributes} y quiero que me listes 5 tareas con respecto a lo que hago, ${tasks ? `y que sean relacionadas a las siguientes tareas que ya tengo ${tasks}` : ''}` : 'ejemplo si envio que soy un "Cocinero" que me envies que tipo de cocinero soy, si soy un "Programador" que me envies que tipo de programador, backend, full stack, etc, si soy un "Diseñador" que me envies que tipo de diseñador soy, etc'} .` 
                }],
                model: "gpt-3.5-turbo"
            });

            return completion;
        */
        const genAI = new GoogleGenerativeAI(process.env.CHAT_GEMINI_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-pro"});
        const prompt = `Soy un profesional en ${profession} quiero que me devuelvas una lista de mis tareas habituales en mi área, ${attributes ? `por ejemplo trabajo con o como ${attributes} y quiero que me listes 5 tareas con respecto a lo que hago en una lista simple solo el título y separados por coma ej: "hacer el café, hacer la cena", ${tasks ? `y que sean relacionadas a las siguientes tareas que ya tengo ${tasks}` : ''}` : 'ejemplo si envío que soy un "Cocinero" que me envíes qué tipo de cocinero soy, si soy un "Programador" que me envíes qué tipo de programador, backend, full stack, etc, si soy un "Diseñador" que me envíes qué tipo de diseñador soy, etc.'} .`;
        const result = await model.generateContent(prompt);

        await this.chatRepository.save({ 
            prompt: prompt,
            response: result.response.text(),
            status: '200 Ok'
        });
        
        const tasksArray = result.response.text()
            .split('\n')
            .map(task => task.replace(/^[*-]\s*/, '').trim()) // Remove leading * or - and any space
            .filter(task => task !== '');

        return tasksArray;
    }
}
