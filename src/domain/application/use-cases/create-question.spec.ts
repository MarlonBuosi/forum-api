import { describe, expect, it } from 'vitest'
import type { QuestionsRepository } from '../repositories/questions-repository'
import { CreateQuestionsUseCase } from './create-question'

const fakeQuestionRepository: QuestionsRepository = {
  create: async () => {
    return
  },
}

describe('Create Question Use Case', () => {
  it('should be able to create a question', async () => {
    const questionUseCase = new CreateQuestionsUseCase(fakeQuestionRepository)
    const { question } = await questionUseCase.execute({
      authorId: 'author-123',
      title: 'Example Question Title',
      content: 'This is an example question content.',
    })

    expect(question).toEqual(
      expect.objectContaining({
        _id: expect.objectContaining({ value: expect.any(String) }),
      }),
    )
  })
})
