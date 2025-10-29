import type { Answer } from '@/domain/enterprise/entities/answer'

export interface AnswerRepository {
  create(answer: Answer): Promise<void>
}
