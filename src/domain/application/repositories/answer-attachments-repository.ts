import type { AnswerAttachments } from '@/domain/enterprise/entities/answer-attachments'

export interface AnswerAttachmentsRepository {
  findManyByAnswerId(questionId: string): Promise<AnswerAttachments[]>
  deleteManyByAnswerId(questionId: string): Promise<void>
}
