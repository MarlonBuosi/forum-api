import type { Answer } from '@/domain/enterprise/entities/answer'
import type { AnswerRepository } from '../repositories/answers-repository'

type FetchQuestionAnswersUseCaseRequest = {
  questionId: string
  page: number
}

type FetchQuestionAnswersUseCaseResponse = {
  answers: Answer[]
}

export class FetchQuestionAnswersUseCase {
  constructor(private answersRepository: AnswerRepository) { }

  async execute({
    questionId,
    page,
  }: FetchQuestionAnswersUseCaseRequest): Promise<FetchQuestionAnswersUseCaseResponse> {
    const answers = await this.answersRepository.findManyByQuestionId(questionId, { page })

    if (!answers.length) {
      throw new Error('Answers not found')
    }

    return { answers }
  }
}
