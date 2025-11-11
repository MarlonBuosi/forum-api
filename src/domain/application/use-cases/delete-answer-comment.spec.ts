import { makeAnswerComment } from 'test/factories/make-answer-comment'
import { InMemoryAnswerCommentsRepository } from 'test/repositories/in-memory-answer-comments-repository'
import { describe, expect, it } from 'vitest'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { DeleteAnswerCommentUseCase } from './delete-answer-comment'

let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository
let sut: DeleteAnswerCommentUseCase

describe('Delete Answer Comment Use Case', () => {
  beforeEach(() => {
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository()
    sut = new DeleteAnswerCommentUseCase(inMemoryAnswerCommentsRepository)
  })

  it('should be able to delete a Answer comment', async () => {
    const newAnswerComment = makeAnswerComment(
      { authorId: new UniqueEntityId('author-123') },
      new UniqueEntityId('answer-comment-123'),
    )

    await inMemoryAnswerCommentsRepository.create(newAnswerComment)

    await sut.execute({
      answerCommentId: 'answer-comment-123',
      authorId: 'author-123',
    })

    expect(inMemoryAnswerCommentsRepository.items).toHaveLength(0)
  })

  it('should not be able to delete an answer comment if not author', async () => {
    const newAnswerComment = makeAnswerComment(
      { authorId: new UniqueEntityId('author-123') },
      new UniqueEntityId('answer-comment-123'),
    )

    await inMemoryAnswerCommentsRepository.create(newAnswerComment)

    expect(() =>
      sut.execute({
        answerCommentId: 'answer-123',
        authorId: 'author-1234',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
