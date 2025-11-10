import { makeAnswer } from 'test/factories/make-answer'
import { InMemoryAnswerCommentsRepository } from 'test/repositories/in-memory-answer-comments-repository'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { describe, expect, it } from 'vitest'
import { CommentOnAnswerUseCase } from './comment-on-answer'

let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository
let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: CommentOnAnswerUseCase

describe('Comment on Answer Use Case', () => {
  beforeEach(() => {
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository()
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new CommentOnAnswerUseCase(
      inMemoryAnswersRepository,
      inMemoryAnswerCommentsRepository,
    )
  })

  it('should be able to comment a answer', async () => {
    const question = makeAnswer({})

    const { answerComment } = await sut.execute({
      authorId: 'author-123',
      content: 'This is an example question content.',
      answerId: question.id.toString(),
    })

    expect(answerComment).toEqual(
      expect.objectContaining({
        _id: expect.objectContaining({ value: expect.any(String) }),
      }),
    )
  })
})
