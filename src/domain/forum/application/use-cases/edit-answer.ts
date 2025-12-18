import { type Either, left, right } from '@/core/either'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import type { Answer } from '@/domain/forum/enterprise/entities/answer'
import { AnswerAttachmentList } from '@/domain/forum/enterprise/entities/answer-attachment-list'
import { AnswerAttachments } from '@/domain/forum/enterprise/entities/answer-attachments'
import type { AnswerAttachmentsRepository } from '../repositories/answer-attachments-repository'
import type { AnswerRepository } from '../repositories/answers-repository'
import { NotAllowedError } from '../../../../core/errors/errors/not-allowed-error'
import { ResourceNotFoundError } from '../../../../core/errors/errors/resource-not-found-error'

interface EditAnswerUseCaseRequest {
  questionId: string
  authorId: string
  content: string
  attachmentIds: string[]
}

type EditAnswerUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    answer: Answer
  }
>

export class EditAnswerUseCase {
  constructor(
    private answersRepository: AnswerRepository,
    private answerAttachmentsRepository: AnswerAttachmentsRepository,
  ) { }

  async execute({
    questionId,
    authorId,
    content,
    attachmentIds,
  }: EditAnswerUseCaseRequest): Promise<EditAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(questionId)

    if (!answer) {
      return left(new ResourceNotFoundError())
    }

    if (authorId !== answer.authorId.toString()) {
      return left(new NotAllowedError())
    }

    const currentAnswerAttachments =
      await this.answerAttachmentsRepository.findManyByAnswerId(questionId)

    const currentAttachmentList = new AnswerAttachmentList(
      currentAnswerAttachments,
    )

    const answerAttachments = attachmentIds.map((attachmentId) => {
      return AnswerAttachments.create({
        attachmentId: new UniqueEntityId(attachmentId),
        answerId: answer.id,
      })
    })

    currentAttachmentList.update(answerAttachments)

    answer.attachments = currentAttachmentList

    answer.content = content

    await this.answersRepository.save(answer)

    return right({ answer })
  }
}
