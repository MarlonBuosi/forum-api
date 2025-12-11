import { AggregateRoot } from '@/core/entities/aggregate-root'
import type { UniqueEntityId } from '@/core/entities/unique-entity-id'

export interface AnswerAttachmentsProps {
  answerId: UniqueEntityId
  attachmentId: UniqueEntityId
}

export class AnswerAttachments extends AggregateRoot<AnswerAttachmentsProps> {
  get answerId() {
    return this.props.answerId
  }

  get attachmentId() {
    return this.props.attachmentId
  }

  static create(props: AnswerAttachmentsProps, id?: UniqueEntityId) {
    const answerAttachments = new AnswerAttachments(props, id)

    return answerAttachments
  }
}
