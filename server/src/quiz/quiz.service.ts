import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Quiz } from './schemas/quiz.schema';
import * as mongoose from 'mongoose';
import { UpdateQuizDto } from './dto/update-quiz.dto';

@Injectable()
export class QuizService {
    constructor(
        @InjectModel(Quiz.name)
        private quizModel: mongoose.Model<Quiz>
    ){}

    async findAll(): Promise<Quiz[]>{
        const quizs = await this.quizModel.find();
        return quizs;
    }

    async create(quiz: Quiz): Promise<Quiz>{
        const res = await this.quizModel.create(quiz);
        return res;
    }

    async findById(id: string): Promise<Quiz> {
        const quiz = await this.quizModel.findById(id);
        if (!quiz) {
            throw new Error('Quiz not found');
        }
        return quiz;
    }
    
    async UpdateById(id: string, quiz: UpdateQuizDto): Promise<Quiz | null> {
        return this.quizModel.findByIdAndUpdate(id, quiz, { new: true }).exec();
      }
      


    async DeleteById(id: string): Promise<Quiz | null> {
        return await this.quizModel.findByIdAndDelete(id);
    }
    
    
}
