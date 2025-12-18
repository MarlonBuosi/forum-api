import { type Either, right } from '@/core/either'
import type { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment'
import type { AnswerCommentsRepository } from '../repositories/answer-comments-repository'
import type { ResourceNotFoundError } from '../../../../core/errors/errors/resource-not-found-error'

type ListAnswerCommentsUseCaseRequest = {
  answerId: string
  page: number
}

type ListAnswerCommentsUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    answerComments: AnswerComment[]
  }
>

export class FetchAnswerCommentsUseCase {
  constructor(private AnswerCommentsRepository: AnswerCommentsRepository) { }

  async execute({
    answerId,
    page,
  }: ListAnswerCommentsUseCaseRequest): Promise<ListAnswerCommentsUseCaseResponse> {
    const answerComments =
      await this.AnswerCommentsRepository.findManyByAnswerId(answerId, {
        page,
      })

    if (!answerComments.length) {
      throw new Error('Answer Comments not found')
    }

    return right({ answerComments })
  }
}
