import { makeAnswer } from 'test/factories/make-answer'
import { makeAnswerAttachment } from 'test/factories/make-answer-attachment'
import { InMemoryAnswerAttachmentsRepository } from 'test/repositories/in-memory-answer-attachments-repository'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { describe, expect, it } from 'vitest'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { EditAnswerUseCase } from './edit-answer'
import { NotAllowedError } from './errors/not-allowed-error'

let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository
let inMemoryAnswerRepository: InMemoryAnswersRepository
let sut: EditAnswerUseCase

describe('Edit Question Use Case', () => {
  beforeEach(() => {
    inMemoryAnswerAttachmentsRepository =
      new InMemoryAnswerAttachmentsRepository()
    inMemoryAnswerRepository = new InMemoryAnswersRepository(inMemoryAnswerAttachmentsRepository)
    sut = new EditAnswerUseCase(
      inMemoryAnswerRepository,
      inMemoryAnswerAttachmentsRepository,
    )
  })

  it('should be able to edit a question', async () => {
    const newAnswer = makeAnswer(
      { authorId: new UniqueEntityId('author-123') },
      new UniqueEntityId('question-123'),
    )

    await inMemoryAnswerRepository.create(newAnswer)

    inMemoryAnswerAttachmentsRepository.items.push(
      makeAnswerAttachment({
        answerId: newAnswer.id,
        attachmentId: new UniqueEntityId('attachment-1'),
      }),
      makeAnswerAttachment({
        answerId: newAnswer.id,
        attachmentId: new UniqueEntityId('attachment-2'),
      }),
    )

    await sut.execute({
      questionId: 'question-123',
      authorId: 'author-123',
      content: 'Updated question content.',
      attachmentIds: ['attachment-1', 'attachment-3']
    })

    expect(inMemoryAnswerRepository.items[0]).toMatchObject({
      content: 'Updated question content.',
    })
    expect(inMemoryAnswerRepository.items[0].attachments.currentItems).toHaveLength(2)
    expect(inMemoryAnswerRepository.items[0].attachments.currentItems).toEqual([
      expect.objectContaining({ attachmentId: new UniqueEntityId('attachment-1') }),
      expect.objectContaining({ attachmentId: new UniqueEntityId('attachment-3') })
    ],
    )
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
      attachmentIds: []
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
