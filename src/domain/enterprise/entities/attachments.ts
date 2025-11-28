import { Entity } from '@/core/entities/entity'
import type { UniqueEntityId } from '@/core/entities/unique-entity-id'

interface AttachmentsProps {
  title: string
  link: string
}

export class Attachments extends Entity<AttachmentsProps> {
  get title() {
    return this.props.title
  }

  get link() {
    return this.props.title
  }

  static create(props: AttachmentsProps, id?: UniqueEntityId) {
    const attachments = new Attachments(props, id)

    return attachments
  }
}
