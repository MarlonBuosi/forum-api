import { AnswerCommentsRepository } from "@/domain/application/repositories/answer-comments-repository";
import { AnswerComment } from "@/domain/enterprise/entities/answer-comment";

export class InMemoryAnswerCommentsRepository implements AnswerCommentsRepository {
  public items: AnswerComment[] = []

  async create(answerComment: AnswerComment) {
    this.items.push(answerComment)
  }
}
