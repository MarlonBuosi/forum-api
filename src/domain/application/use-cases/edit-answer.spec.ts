import { makeAnswer } from 'test/factories/make-answer'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { describe, expect, it } from 'vitest'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { EditAnswerUseCase } from './edit-answer'
import { NotAllowedError } from './errors/not-allowed-error'

let inMemoryAnswerRepository: InMemoryAnswersRepository
let sut: EditAnswerUseCase

describe('Edit Question Use Case', () => {
  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswersRepository()
    sut = new EditAnswerUseCase(inMemoryAnswerRepository)
  })

  it('should be able to edit a question', async () => {
    const newAnswer = makeAnswer(
      { authorId: new UniqueEntityId('author-123') },
      new UniqueEntityId('question-123'),
    )

    await inMemoryAnswerRepository.create(newAnswer)

    await sut.execute({
      questionId: 'question-123',
      authorId: 'author-123',
      content: 'Updated question content.',
    })

    expect(inMemoryAnswerRepository.items[0]).toMatchObject({
      content: 'Updated question content.',
    })
  })

  it('should not be able to delete a question if not author', async () => {
    const newAnswer = makeAnswer(
      { authorId: new UniqueEntityId('author-123') },
      new UniqueEntityId('question-123'),
    )

    await inMemoryAnswerRepository.create(newAnswer)

    const result = await sut.execute({
      questionId: 'question-123',
      authorId: 'author-1234',
      content: 'Updated question content.',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
