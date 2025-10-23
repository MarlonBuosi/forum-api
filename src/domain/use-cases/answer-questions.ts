import { Answer } from '../entities/answer'
import { Slug } from '../entities/value-objects/slug'
import type { AnswerRepository } from '../repositories/answers-repository'

interface AnswerQuestionsUseCaseRequest {
  questionId: string
  instructorId: string
  content: string
}

export class AnswerQuestionsUseCase {
  constructor(private answerRepository: AnswerRepository) { }

  async execute({
    instructorId,
    questionId,
    content,
  }: AnswerQuestionsUseCaseRequest) {
    const answer = new Answer({ content, authorId: instructorId, questionId })

    await this.answerRepository.create(answer)

    return answer
  }
}
