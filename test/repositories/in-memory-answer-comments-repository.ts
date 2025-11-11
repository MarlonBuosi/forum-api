import { AnswerCommentsRepository } from "@/domain/application/repositories/answer-comments-repository";
import { AnswerComment } from "@/domain/enterprise/entities/answer-comment";

export class InMemoryAnswerCommentsRepository implements AnswerCommentsRepository {
  public items: AnswerComment[] = []

  async create(answerComment: AnswerComment) {
    this.items.push(answerComment)
  }

  async findById(id: string) {
    const questionComment = this.items.find(item => item.id.toString() === id) ?? null

    return questionComment
  }
  async delete(questionComment: AnswerComment) {
    const index = this.items.findIndex(item => item.id === questionComment.id)
    this.items.splice(index, 1);
  }
}
