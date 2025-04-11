import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({
    timestamps:true
})
export class Quiz{

    @Prop()
    question: string;

    @Prop()
    option1:string;

    @Prop()
    option2:string;

    @Prop()
    option3:string;

    @Prop()
    option4:string;

    @Prop()
    correctAnswer: string;
}

export const QuizSchema = SchemaFactory.createForClass(Quiz)