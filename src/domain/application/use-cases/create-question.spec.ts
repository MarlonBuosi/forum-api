import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { describe, expect, it } from 'vitest'
import { CreateQuestionUseCase } from './create-question'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: CreateQuestionUseCase

describe('Create Question Use Case', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new CreateQuestionUseCase(
      inMemoryQuestionsRepository,
    )
  })

  it('should be able to create a question', async () => {
    const { question } = await sut.execute({
      authorId: 'author-123',
      title: 'Example Question Title',
      content: 'This is an example question content.',
    })

    expect(question).toEqual(
      expect.objectContaining({
        _id: expect.objectContaining({ value: expect.any(String) }),
      }),
    )
    expect(inMemoryQuestionsRepository.items[0].id).toEqual(question.id)

  })
})
