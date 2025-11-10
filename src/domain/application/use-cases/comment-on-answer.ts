import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { AnswerComment } from '@/domain/enterprise/entities/answer-comment'
import type { AnswerCommentsRepository } from '../repositories/answer-comments-repository'
import type { AnswerRepository } from '../repositories/answers-repository'

type CommentOnAnswerUseCaseRequest = {
  authorId: string
  answerId: string
  content: string
}

type CommentOnAnswerUseCaseResponse = {
  answerComment: AnswerComment
}

export class CommentOnAnswerUseCase {
  constructor(
    private answerRepository: AnswerRepository,
    private answerCommentRepository: AnswerCommentsRepository,
  ) { }

  async execute({
    authorId,
    answerId,
    content,
  }: CommentOnAnswerUseCaseRequest): Promise<CommentOnAnswerUseCaseResponse> {
    const Answer = this.answerRepository.findById(answerId)

    if (!Answer) {
      throw new Error('Answer Not Found!')
    }

    const answerComment = AnswerComment.create({
      authorId: new UniqueEntityId(authorId),
      answerId: new UniqueEntityId(answerId),
      content,
    })

    await this.answerCommentRepository.create(answerComment)

    return { answerComment }
  }
}
