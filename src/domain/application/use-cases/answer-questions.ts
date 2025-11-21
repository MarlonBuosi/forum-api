import { type Either, right } from '@/core/either'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Answer } from '@/domain/enterprise/entities/answer'
import type { AnswerRepository } from '../repositories/answers-repository'

interface AnswerQuestionsUseCaseRequest {
  questionId: string
  instructorId: string
  content: string
}

type AnswerQuestionsUseCaseResponse = Either<null, { answer: Answer }>

export class AnswerQuestionsUseCase {
  constructor(private answerRepository: AnswerRepository) { }

  async execute({
    instructorId,
    questionId,
    content,
  }: AnswerQuestionsUseCaseRequest): Promise<AnswerQuestionsUseCaseResponse> {
    const answer = Answer.create({
      content,
      authorId: new UniqueEntityId(instructorId),
      questionId: new UniqueEntityId(questionId),
    })
    await this.answerRepository.create(answer)

    return right({ answer })
  }
}
