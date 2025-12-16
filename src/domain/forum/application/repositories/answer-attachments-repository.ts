import type { AnswerAttachments } from '@/domain/forum/enterprise/entities/answer-attachments'

export interface AnswerAttachmentsRepository {
  findManyByAnswerId(questionId: string): Promise<AnswerAttachments[]>
  deleteManyByAnswerId(questionId: string): Promise<void>
}
