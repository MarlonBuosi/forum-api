import type { PaginationParams } from '@/core/repositories/pagination-params'
import type { Question } from '@/domain/enterprise/entities/question'

export interface QuestionsRepository {
  findById(questionId: string): Promise<Question | null>
  findBySlug(slug: string): Promise<Question | null>
  findManyRecent({ page }: PaginationParams): Promise<Question[]>
  create(question: Question): Promise<void>
  save(question: Question): Promise<void>
  delete(question: Question): Promise<void>
}
