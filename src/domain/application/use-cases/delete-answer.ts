import type { AnswerRepository } from '../repositories/answers-repository'

interface DeleteAnswerUseCaseRequest {
  answerId: string
  authorId: string
}

type DeleteAnswerUseCaseResponse = {}

export class DeleteAnswerUseCase {
  constructor(private answersRepository: AnswerRepository) { }

  async execute({
    authorId,
    answerId,
  }: DeleteAnswerUseCaseRequest): Promise<DeleteAnswerUseCaseResponse> {
    const question = await this.answersRepository.findById(answerId)

    if (!question) {
      throw new Error('Question not found.')
    }

    if (authorId !== question.authorId.toString()) {
      throw new Error('Not allowed.')
    }

    await this.answersRepository.delete(question)

    return {}
  }
}
