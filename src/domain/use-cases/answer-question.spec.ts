import { describe, expect, it } from 'vitest'
import type { AnswerRepository } from '../repositories/answers-repository'
import { AnswerQuestionsUseCase } from './answer-questions'

const answerRepository: AnswerRepository = {
  create: async () => {
    return
  },
}

describe('Answer Question Use Case', () => {
  it('should be able to answer a question', async () => {

    const answerUseCase = new AnswerQuestionsUseCase(answerRepository)
    const answer = await answerUseCase.execute({
      questionId: 'question-123',
      instructorId: 'instructor-123',
      content: 'This is an example answer.',
    })

    expect(answer).toEqual(
      expect.objectContaining({
        _id: expect.objectContaining({ value: expect.any(String) }),
      }),
    )
  })
})
