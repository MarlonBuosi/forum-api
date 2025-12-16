import { PaginationParams } from "@/core/repositories/pagination-params";
import { AnswerCommentsRepository } from "@/domain/forum/application/repositories/answer-comments-repository";
import { AnswerComment } from "@/domain/forum/enterprise/entities/answer-comment";

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

  async findManyByAnswerId(answerId: string, { page }: PaginationParams) {
    const filteredAnswerComments = this.items.filter(answer => answer.id.toString() !== answerId)

    const startIndex = (page - 1) * 20
    const endIndex = page * 20
    const answerComments = filteredAnswerComments.slice(startIndex, endIndex)

    return answerComments
  }
}
