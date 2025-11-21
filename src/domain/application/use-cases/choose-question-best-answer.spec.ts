import { makeAnswer } from 'test/factories/make-answer'
import { makeQuestion } from 'test/factories/make-question'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { describe, expect, it } from 'vitest'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { ChooseQuestionBestAnswerUseCase } from './choose-question-best-answer'
import { NotAllowedError } from './errors/not-allowed-error'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let inMemoryAnswerRepository: InMemoryAnswersRepository
let sut: ChooseQuestionBestAnswerUseCase

describe('Choose Question Best Answer Use Case', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    inMemoryAnswerRepository = new InMemoryAnswersRepository()
    sut = new ChooseQuestionBestAnswerUseCase(inMemoryAnswerRepository, inMemoryQuestionsRepository)
  })

  it('should be able to create a question', async () => {
    const newQuestion = makeQuestion(
      { authorId: new UniqueEntityId('author-123') },
      new UniqueEntityId('question-123'),
    )

    await inMemoryQuestionsRepository.create(newQuestion)

    const newAnswer = makeAnswer(
      { authorId: new UniqueEntityId('author-123'), questionId: newQuestion.id },
      new UniqueEntityId('answer-123'),
    )

    await inMemoryAnswerRepository.create(newAnswer)

    await sut.execute({
      answerId: 'answer-123',
      authorId: 'author-123',
    })

    expect(inMemoryQuestionsRepository.items[0].bestAnswerId).toEqual(newAnswer.id)
  });

  it('should not be able to choose the best answer if not author', async () => {
    const newQuestion = makeQuestion(
      { authorId: new UniqueEntityId('author-123') },
      new UniqueEntityId('question-123'),
    )
    await inMemoryQuestionsRepository.create(newQuestion)

    const newAnswer = makeAnswer(
      { authorId: new UniqueEntityId('author-123'), questionId: newQuestion.id },
      new UniqueEntityId('answer-123'),
    )
    await inMemoryAnswerRepository.create(newAnswer)

    const result = await sut.execute({
      answerId: 'answer-123',
      authorId: 'author-1234',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  });
});
