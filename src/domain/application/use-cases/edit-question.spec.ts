import { makeQuestion } from 'test/factories/make-question'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { describe, expect, it } from 'vitest'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { EditQuestionUseCase } from './edit-question'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: EditQuestionUseCase

describe('Edit Question Use Case', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new EditQuestionUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to edit a question', async () => {
    const newQuestion = makeQuestion({ authorId: new UniqueEntityId('author-123') }, new UniqueEntityId('question-123'))

    await inMemoryQuestionsRepository.create(newQuestion)

    await sut.execute({
      questionId: 'question-123',
      authorId: 'author-123',
      title: 'Updated Question Title',
      content: 'Updated question content.',
    })

    expect(inMemoryQuestionsRepository.items[0]).toMatchObject({
      title: 'Updated Question Title',
      content: 'Updated question content.',
    })
  })

  it('should not be able to delete a question if not author', async () => {
    const newQuestion = makeQuestion({ authorId: new UniqueEntityId('author-123') }, new UniqueEntityId('question-123'))

    await inMemoryQuestionsRepository.create(newQuestion)

    expect(() =>
      sut.execute({
        questionId: 'question-123',
        authorId: 'author-1234',
        title: 'Updated Question Title',
        content: 'Updated question content.',
      })
    ).rejects.toBeInstanceOf(Error)
  })
})
