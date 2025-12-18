import { type Either, right } from '@/core/either'
import type { Question } from '@/domain/forum/enterprise/entities/question'
import type { QuestionsRepository } from '../repositories/questions-repository'
import type { ResourceNotFoundError } from '../../../../core/errors/errors/resource-not-found-error'

type FetchRecentQuestionsUseCaseRequest = {
  page: number
}

type FetchRecentQuestionsUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    questions: Question[]
  }
>

export class FetchRecentQuestionsUseCase {
  constructor(private questionRepository: QuestionsRepository) { }

  async execute({
    page,
  }: FetchRecentQuestionsUseCaseRequest): Promise<FetchRecentQuestionsUseCaseResponse> {
    const questions = await this.questionRepository.findManyRecent({ page })

    if (!questions.length) {
      throw new Error('Questions not found')
    }

    return right({ questions })
  }
}
