import type { AnswerComment } from '@/domain/enterprise/entities/answer-comment'
import type { AnswerCommentsRepository } from '../repositories/answer-comments-repository'

type ListAnswerCommentsUseCaseRequest = {
  answerId: string
  page: number
}

type ListAnswerCommentsUseCaseResponse = {
  answerComments: AnswerComment[]
}

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

    return { answerComments }
  }
}
