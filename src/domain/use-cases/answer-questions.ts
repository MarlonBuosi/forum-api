import { UniqueEntityId } from '../../core/entities/unique-entity-id'
import { Answer } from '../entities/answer'
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
    const answer = Answer.create({ content, authorId: new UniqueEntityId(instructorId), questionId: new UniqueEntityId(questionId) })
    await this.answerRepository.create(answer)

    return answer
  }
}
