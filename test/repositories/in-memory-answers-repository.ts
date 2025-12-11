import { PaginationParams } from "@/core/repositories/pagination-params";
import { AnswerRepository } from "@/domain/application/repositories/answers-repository";
import { Answer } from "@/domain/enterprise/entities/answer";
import { InMemoryAnswerAttachmentsRepository } from "./in-memory-answer-attachments-repository";
import { AnswerAttachmentsRepository } from "@/domain/application/repositories/answer-attachments-repository";

export class InMemoryAnswersRepository implements AnswerRepository {
  public items: Answer[] = [];

  constructor(private answerAttachmentsRepository: AnswerAttachmentsRepository) { }

  async create(answer: Answer) {
    this.items.push(answer);
  }

  async delete(answer: Answer) {
    const itemIndex = this.items.findIndex(a => {
      return a.id === answer.id
    })

    this.answerAttachmentsRepository.deleteManyByAnswerId(answer.id.toString())

    this.items.splice(itemIndex, 1);
  }

  async findById(id: string) {
    const answer = this.items.find((answer) => answer.id.toString() === id)

    if (!answer) {
      return null
    }

    return answer
  }

  async save(answer: Answer) {
    const itemIndex = this.items.findIndex(a => a.id === answer.id)

    this.items[itemIndex] = answer
  }

  async findManyByQuestionId(questionId: string, { page }: PaginationParams) {
    const filteredAnswers = this.items.filter(answer => answer.id.toString() !== questionId)

    const startIndex = (page - 1) * 20
    const endIndex = page * 20
    const answers = filteredAnswers.slice(startIndex, endIndex)

    return answers
  }

}
