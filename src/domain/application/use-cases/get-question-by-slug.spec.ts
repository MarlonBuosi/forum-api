import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { describe, expect, it } from 'vitest'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Question } from '@/domain/enterprise/entities/question'
import { Slug } from '@/domain/enterprise/entities/value-objects/slug'
import { GetQuestionBySlugUseCase } from './get-question-by-slug'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: GetQuestionBySlugUseCase

describe('Get Question by Slug Use Case', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new GetQuestionBySlugUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to get a question by slug', async () => {
    const newQuestion = Question.create({
      authorId: new UniqueEntityId(),
      title: 'Example Question Title',
      content: 'This is an example question content.',
      slug: Slug.create('example-question-title'),
    })

    inMemoryQuestionsRepository.items.push(newQuestion)


    const { question } = await sut.execute({ slug: 'example-question-title' })

    expect(question?.title).toEqual(newQuestion.title)
  })
})
