import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Question } from '@/domain/enterprise/entities/question'
import type { QuestionsRepository } from '../repositories/questions-repository'

type CreateQuestionsUseCaseRequest = {
  authorId: string
  title: string
  content: string
}

type CreateQuestionsUseCaseResponse = {
  question: Question
}

export class CreateQuestionsUseCase {
  constructor(private questionRepository: QuestionsRepository) { }

  async execute({
    authorId,
    title,
    content,
  }: CreateQuestionsUseCaseRequest): Promise<CreateQuestionsUseCaseResponse> {
    const question = Question.create({
      authorId: new UniqueEntityId(authorId),
      title,
      content,
    })

    await this.questionRepository.create(question)

    return { question }
  }
}
