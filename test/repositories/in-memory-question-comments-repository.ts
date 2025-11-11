import { PaginationParams } from "@/core/repositories/pagination-params";
import { QuestionCommentsRepository } from "@/domain/application/repositories/question-comments-repository";
import { QuestionComment } from "@/domain/enterprise/entities/question-comment";

export class InMemoryQuestionCommentsRepository implements QuestionCommentsRepository {

  public items: QuestionComment[] = []

  async create(questionComment: QuestionComment) {
    this.items.push(questionComment)
  }

  async findById(id: string) {
    const questionComment = this.items.find(item => item.id.toString() === id) ?? null

    return questionComment
  }

  async delete(questionComment: QuestionComment) {
    const index = this.items.findIndex(item => item.id === questionComment.id)
    this.items.splice(index, 1);
  }

  async findManyByQuestionId(questionId: string, { page }: PaginationParams) {
    const filteredQuestionComments = this.items.filter(answer => answer.id.toString() !== questionId)

    const startIndex = (page - 1) * 20
    const endIndex = page * 20
    const questionComments = filteredQuestionComments.slice(startIndex, endIndex)

    return questionComments
  }
}
