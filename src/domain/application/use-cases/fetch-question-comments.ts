import type { QuestionComment } from '@/domain/enterprise/entities/question-comment'
import type { QuestionCommentsRepository } from '../repositories/question-comments-repository'

type ListQuestionCommentsUseCaseRequest = {
  questionId: string
  page: number
}

type ListQuestionCommentsUseCaseResponse = {
  questionComments: QuestionComment[]
}

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
      throw new Error('Answer Comments not found')
    }

    return { questionComments }
  }
}
