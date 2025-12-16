import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { AnswerAttachments, AnswerAttachmentsProps } from "@/domain/forum/enterprise/entities/answer-attachments";
import { faker } from '@faker-js/faker'

export function makeAnswerAttachment(override: Partial<AnswerAttachmentsProps> = {}, id?: UniqueEntityId) {
  const answerAttachment = AnswerAttachments.create({
    answerId: new UniqueEntityId(),
    attachmentId: new UniqueEntityId(),
    ...override
  }, id)

  return answerAttachment
}
