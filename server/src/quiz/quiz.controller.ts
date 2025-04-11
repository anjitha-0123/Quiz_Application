import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { Quiz } from './schemas/quiz.schema';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';

@Controller('quizs')
export class QuizController {
    constructor(private quizService: QuizService){}

    @Get()
    async getAllQuizs(): Promise<Quiz[]>{
        return this.quizService.findAll();
    }

    @Post()
  async createQuiz(@Body() quiz: CreateQuizDto): Promise<Quiz> {
  console.log('Quiz Received:', quiz); 
  return this.quizService.create(quiz);
}

    @Get(':id')
    async getQuiz(@Param('id')id:string ): Promise<Quiz>{
        return this.quizService.findById(id);
    }

    @Put(':id')
    async updateQuiz(
      @Param('id') id: string,
      @Body() quiz: UpdateQuizDto
    ): Promise<Quiz | null> {
      return this.quizService.UpdateById(id, quiz);
    }
    
    @Delete(':id')
    async deleteQuiz(@Param('id') id: string): Promise<Quiz | null> {
        return await this.quizService.DeleteById(id);
    }
    
}
