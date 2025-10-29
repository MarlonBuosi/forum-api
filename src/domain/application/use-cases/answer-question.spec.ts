import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { describe, expect, it } from 'vitest'
import { AnswerQuestionsUseCase } from './answer-questions'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: AnswerQuestionsUseCase

describe('Create Question Use Case', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new AnswerQuestionsUseCase(inMemoryAnswersRepository)
  })

  it('should be able to create a question', async () => {
    const { answer } = await sut.execute({
      content: 'This is an example answer content.',
      instructorId: 'instructor-123',
      questionId: 'question-123',
    })

    expect(answer).toEqual(
      expect.objectContaining({
        _id: expect.objectContaining({ value: expect.any(String) }),
      }),
    )
    expect(inMemoryAnswersRepository.items[0].id).toEqual(answer.id)
  })
})
