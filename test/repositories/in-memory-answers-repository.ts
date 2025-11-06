import { AnswerRepository } from "@/domain/application/repositories/answers-repository";
import { Answer } from "@/domain/enterprise/entities/answer";

export class InMemoryAnswersRepository implements AnswerRepository {

  public items: Answer[] = [];

  async create(answer: Answer) {
    this.items.push(answer);
  }

  async delete(answer: Answer) {
    const itemIndex = this.items.findIndex(a => {
      return a.id === answer.id
    })

    this.items.splice(itemIndex, 1);
  }

  async findById(id: string) {
    const answer = this.items.find((answer) => answer.id.toString() === id)

    if (!answer) {
      return null
    }

    return answer
  }
}
