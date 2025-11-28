import { AggregateRoot } from '@/core/entities/aggregate-root'
import type { UniqueEntityId } from '@/core/entities/unique-entity-id'

interface QuestionAttachmentsProps {
  questionId: UniqueEntityId
  attachmentId: UniqueEntityId
}

export class QuestionAttachments extends AggregateRoot<QuestionAttachmentsProps> {
  get questionId() {
    return this.props.questionId
  }

  get attachmentId() {
    return this.props.attachmentId
  }

  static create(props: QuestionAttachmentsProps, id?: UniqueEntityId) {
    const questionAttachments = new QuestionAttachments(props, id)

    return questionAttachments
  }
}
