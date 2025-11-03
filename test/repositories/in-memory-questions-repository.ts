import { QuestionsRepository } from "@/domain/application/repositories/questions-repository";
import { Question } from "@/domain/enterprise/entities/question";

export class InMemoryQuestionsRepository implements QuestionsRepository {


  public items: Question[] = [];

  async create(question: Question) {
    this.items.push(question);
  }

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

  async delete(question: Question) {
    const itemIndex = this.items.findIndex(q => {
      return q.id === question.id
    });

    this.items.splice(itemIndex, 1);
  }
}
