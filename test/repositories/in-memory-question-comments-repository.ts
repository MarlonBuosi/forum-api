import { QuestionCommentsRepository } from "@/domain/application/repositories/question-comments-repository";
import { QuestionComment } from "@/domain/enterprise/entities/question-comment";

export class InMemoryQuestionCommentsRepository implements QuestionCommentsRepository {
  public items: QuestionComment[] = []

  async create(questionComment: QuestionComment) {
    this.items.push(questionComment)
  }
}
