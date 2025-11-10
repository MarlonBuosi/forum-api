import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { QuestionComment } from '@/domain/enterprise/entities/question-comment'
import type { QuestionCommentsRepository } from '../repositories/question-comments-repository'
import type { QuestionsRepository } from '../repositories/questions-repository'

type CommentOnQuestionUseCaseRequest = {
  authorId: string
  questionId: string
  content: string
}

type CommentOnQuestionUseCaseResponse = {
  questionComment: QuestionComment
}

export class CommentOnQuestionUseCase {
  constructor(
    private questionRepository: QuestionsRepository,
    private questionCommentRepository: QuestionCommentsRepository,
  ) { }

  async execute({
    authorId,
    questionId,
    content,
  }: CommentOnQuestionUseCaseRequest): Promise<CommentOnQuestionUseCaseResponse> {
    const question = this.questionRepository.findById(questionId)

    if (!question) {
      throw new Error('Question Not Found!')
    }

    const questionComment = QuestionComment.create({
      authorId: new UniqueEntityId(authorId),
      questionId: new UniqueEntityId(questionId),
      content,
    })

    await this.questionCommentRepository.create(questionComment)

    return { questionComment }
  }
}
