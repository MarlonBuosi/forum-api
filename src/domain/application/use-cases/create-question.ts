import { type Either, right } from '@/core/either'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Question } from '@/domain/enterprise/entities/question'
import { QuestionAttachments } from '@/domain/enterprise/entities/question-attachments'
import type { QuestionsRepository } from '../repositories/questions-repository'

type CreateQuestionUseCaseRequest = {
  authorId: string
  title: string
  content: string
  attachmentsIds: string[]
}

type CreateQuestionUseCaseResponse = Either<
  null,
  {
    question: Question
  }
>

export class CreateQuestionUseCase {
  constructor(private questionRepository: QuestionsRepository) { }

  async execute({
    authorId,
    title,
    content,
    attachmentsIds,
  }: CreateQuestionUseCaseRequest): Promise<CreateQuestionUseCaseResponse> {
    const question = Question.create({
      authorId: new UniqueEntityId(authorId),
      title,
      content,
    })

    const questionAttachments = attachmentsIds?.map((attachment) => {
      return QuestionAttachments.create({
        attachmentId: new UniqueEntityId(attachment),
        questionId: question.id,
      })
    })

    question.attachments = questionAttachments ?? []

    await this.questionRepository.create(question)

    return right({ question })
  }
}
