import { PaginationParams } from "@/core/repositories/pagination-params";
import { QuestionAttachmentsRepository } from "@/domain/application/repositories/question-attachments-repository";
import { QuestionsRepository } from "@/domain/application/repositories/questions-repository";
import { Question } from "@/domain/enterprise/entities/question";

export class InMemoryQuestionsRepository implements QuestionsRepository {

  public items: Question[] = [];

  constructor(
    private questionAttachmentsRepository: QuestionAttachmentsRepository
  ) { }

  async findBySlug(slug: string) {
    const question = this.items.find(question => question.slug.value === slug)

    if (!question) {
      return null
    }

    return question
  }

  async findById(id: string) {
    const question = this.items.find((question) => question.id.toString() === id)

    if (!question) {
      return null
    }

    return question
  }

  async findManyRecent({ page }: PaginationParams) {
    this.items.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())

    const startIndex = (page - 1) * 20
    const endIndex = page * 20
    const questions = this.items.slice(startIndex, endIndex)

    return questions
  }

  async create(question: Question) {
    this.items.push(question);
  }

  async delete(question: Question) {
    const itemIndex = this.items.findIndex(q => {
      return q.id === question.id
    });

    this.items.splice(itemIndex, 1);

    console.log('chamada do metodo', this.questionAttachmentsRepository)
    this.questionAttachmentsRepository.deleteManyByQuestionId(question.id.toString())
  }

  async save(question: Question) {
    const itemIndex = this.items.findIndex(q => q.id === question.id)

    this.items[itemIndex] = question
  }
}
