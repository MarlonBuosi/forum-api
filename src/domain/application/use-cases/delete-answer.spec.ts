import { makeAnswer } from 'test/factories/make-answer'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { describe, expect, it } from 'vitest'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { DeleteAnswerUseCase } from './delete-answer'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: DeleteAnswerUseCase

describe('Delete Question Use Case', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new DeleteAnswerUseCase(inMemoryAnswersRepository)
  })

  it('should be able to delete a question', async () => {
    const newAnswer = makeAnswer(
      { authorId: new UniqueEntityId('author-123') },
      new UniqueEntityId('answer-123'),
    )

    await inMemoryAnswersRepository.create(newAnswer)

    await sut.execute({
      answerId: 'answer-123',
      authorId: 'author-123',
    })

    expect(inMemoryAnswersRepository.items).toHaveLength(0)
  })

  it('should not be able to delete a question if not author', async () => {
    const newAnswer = makeAnswer(
      { authorId: new UniqueEntityId('author-123') },
      new UniqueEntityId('answer-123'),
    )

    await inMemoryAnswersRepository.create(newAnswer)

    expect(() =>
      sut.execute({
        answerId: 'answer-123',
        authorId: 'author-1234',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
