import { type Either, left, right } from '@/core/either'
import type { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment'
import type { QuestionCommentsRepository } from '../repositories/question-comments-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

type ListQuestionCommentsUseCaseRequest = {
  questionId: string
  page: number
}

type ListQuestionCommentsUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    questionComments: QuestionComment[]
  }
>

export class FetchQuestionCommentsUseCase {
  constructor(private questionCommentsRepository: QuestionCommentsRepository) { }

  async execute({
    questionId,
    page,
  }: ListQuestionCommentsUseCaseRequest): Promise<ListQuestionCommentsUseCaseResponse> {
    const questionComments =
      await this.questionCommentsRepository.findManyByQuestionId(questionId, {
        page,
      })

    if (!questionComments.length) {
      return left(new ResourceNotFoundError())
    }

    return right({ questionComments })
  }
}
