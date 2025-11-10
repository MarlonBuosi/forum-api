import type { QuestionComment } from '@/domain/enterprise/entities/question-comment'

export interface QuestionsCommentsRepository {
  create(questionComment: QuestionComment): Promise<void>
}
