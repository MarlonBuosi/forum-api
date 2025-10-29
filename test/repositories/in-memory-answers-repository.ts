import { AnswerRepository } from "@/domain/application/repositories/answers-repository";
import { QuestionsRepository } from "@/domain/application/repositories/questions-repository";
import { Answer } from "@/domain/enterprise/entities/answer";

export class InMemoryAnswersRepository implements AnswerRepository {

  public items: Answer[] = [];

  async create(answer: Answer) {
    this.items.push(answer);
  }
}
