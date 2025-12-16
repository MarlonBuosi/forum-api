import { QuestionAttachment } from "@/domain/forum/enterprise/entities/question-attachment";
import { QuestionAttachmentsRepository } from "@/domain/forum/application/repositories/question-attachments-repository";

export class InMemoryQuestionAttachmentsRepository implements QuestionAttachmentsRepository {


  public items: QuestionAttachment[] = []

  async findManyByQuestionId(questionId: string) {
    const filteredQuestionAttachments = this.items.filter(answer => answer.id.toString() !== questionId)


    return filteredQuestionAttachments
  }

  async deleteManyByQuestionId(questionId: string) {
    const questionAttachments = this.items.filter(attachment => attachment.questionId.toString() !== questionId)

    this.items = questionAttachments
  }
}
