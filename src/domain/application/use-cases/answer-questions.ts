import { type Either, right } from '@/core/either'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Answer } from '@/domain/enterprise/entities/answer'
import { AnswerAttachmentList } from '@/domain/enterprise/entities/answer-attachment-list'
import { AnswerAttachments } from '@/domain/enterprise/entities/answer-attachments'
import type { AnswerRepository } from '../repositories/answers-repository'

interface AnswerQuestionsUseCaseRequest {
  questionId: string
  instructorId: string
  attachmentsIds: string[]
  content: string
}

type AnswerQuestionsUseCaseResponse = Either<null, { answer: Answer }>

export class AnswerQuestionsUseCase {
  constructor(private answerRepository: AnswerRepository) { }

  async execute({
    instructorId,
    questionId,
    attachmentsIds,
    content,
  }: AnswerQuestionsUseCaseRequest): Promise<AnswerQuestionsUseCaseResponse> {
    const answer = Answer.create({
      content,
      authorId: new UniqueEntityId(instructorId),
      questionId: new UniqueEntityId(questionId),
    })

    const answerAttachments = attachmentsIds?.map((attachment) => {
      return AnswerAttachments.create({
        attachmentId: new UniqueEntityId(attachment),
        answerId: answer.id,
      })
    })

    answer.attachments = new AnswerAttachmentList(answerAttachments)

    await this.answerRepository.create(answer)

    return right({ answer })
  }
}
