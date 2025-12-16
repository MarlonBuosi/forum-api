import { AnswerAttachmentsRepository } from "@/domain/forum/application/repositories/answer-attachments-repository";
import { AnswerAttachments } from "@/domain/forum/enterprise/entities/answer-attachments";

export class InMemoryAnswerAttachmentsRepository implements AnswerAttachmentsRepository {

  public items: AnswerAttachments[] = []

  async findManyByAnswerId(answerId: string) {
    const filteredAnswerAttachments = this.items.filter(answer => answer.id.toString() !== answerId)


    return filteredAnswerAttachments
  }

  async deleteManyByAnswerId(answerId: string) {
    const answerAttachments = this.items.filter(attachment => attachment.answerId.toString() !== answerId)

    this.items = answerAttachments
  }
}
