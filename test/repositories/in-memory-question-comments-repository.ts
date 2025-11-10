import { QuestionsCommentsRepository } from "@/domain/application/repositories/question-comments-repository";
import { QuestionComment } from "@/domain/enterprise/entities/question-comment";

export class InMemoryQuestionCommentsRepository implements QuestionsCommentsRepository {
  public items: QuestionComment[] = []

  async create(questionComment: QuestionComment) {
    this.items.push(questionComment)
  }
}
