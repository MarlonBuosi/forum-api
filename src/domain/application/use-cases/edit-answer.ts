import type { AnswerRepository } from '../repositories/answers-repository'

interface EditAnswerUseCaseRequest {
  questionId: string
  authorId: string
  content: string
}

type EditAnswerUseCaseResponse = {}

export class EditAnswerUseCase {
  constructor(private answersRepository: AnswerRepository) { }

  async execute({
    questionId,
    authorId,
    content,
  }: EditAnswerUseCaseRequest): Promise<EditAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(questionId)

    if (!answer) {
      throw new Error('Answer not found.')
    }

    if (authorId !== answer.authorId.toString()) {
      throw new Error('Not allowed.')
    }

    answer.content = content

    await this.answersRepository.save(answer)

    return {}
  }
}
