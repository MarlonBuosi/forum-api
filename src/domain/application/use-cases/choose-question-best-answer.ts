import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import type { Question } from '@/domain/enterprise/entities/question'
import type { AnswerRepository } from '../repositories/answers-repository'
import type { QuestionsRepository } from '../repositories/questions-repository'

type ChooseQuestionBestAnswerUseCaseRequest = {
  authorId: string
  answerId: string
}

type ChooseQuestionBestAnswerUseCaseResponse = {
  question: Question
}

export class ChooseQuestionBestAnswerUseCase {
  constructor(
    private answersRepository: AnswerRepository,
    private questionRepository: QuestionsRepository,
  ) { }

  async execute({
    authorId,
    answerId,
  }: ChooseQuestionBestAnswerUseCaseRequest): Promise<ChooseQuestionBestAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId)

    if (!answer) {
      throw new Error('Answer not found.')
    }

    const question = await this.questionRepository.findById(answer?.questionId.toValue() ?? '')

    if (!question) {
      throw new Error('Question not found.')
    }

    if (question.authorId.toString() !== authorId) {
      throw new Error('Not allowed.')
    }

    question.bestAnswerId = answer.id

    await this.questionRepository.save(question)

    return { question }
  }
}
