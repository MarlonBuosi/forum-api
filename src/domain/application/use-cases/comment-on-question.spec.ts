import { makeQuestion } from 'test/factories/make-question'
import { InMemoryQuestionCommentsRepository } from 'test/repositories/in-memory-question-comments-repository'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { describe, expect, it } from 'vitest'
import { CommentOnQuestionUseCase } from './comment-on-question'

let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository
let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: CommentOnQuestionUseCase

describe('Comment on Question Use Case', () => {
  beforeEach(() => {
    inMemoryQuestionCommentsRepository =
      new InMemoryQuestionCommentsRepository()
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new CommentOnQuestionUseCase(
      inMemoryQuestionsRepository,
      inMemoryQuestionCommentsRepository,
    )
  })

  it('should be able to comment a question', async () => {
    const question = makeQuestion({})

    const { questionComment } = await sut.execute({
      authorId: 'author-123',
      content: 'This is an example question content.',
      questionId: question.id.toString(),
    })

    expect(questionComment).toEqual(
      expect.objectContaining({
        _id: expect.objectContaining({ value: expect.any(String) }),
      }),
    )
  })
})
