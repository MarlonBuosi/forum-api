import { describe, expect, it } from 'vitest'
import { ReadNotificationUseCase } from './read-notification'
import { InMemoryNotificationsRepository } from 'test/repositories/in-memory-send-notification-repository'
import { makeNotification } from 'test/factories/make-notification'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'

let inMemoryNotificationsRepository: InMemoryNotificationsRepository
let sut: ReadNotificationUseCase

describe('Read Notification Use Case', () => {
  beforeEach(() => {
    inMemoryNotificationsRepository = new InMemoryNotificationsRepository()
    sut = new ReadNotificationUseCase(inMemoryNotificationsRepository)
  })

  it('should be able to read a notification', async () => {
    const notification = makeNotification(
      { recipientId: new UniqueEntityId('1') },
      new UniqueEntityId('1'),
    )

    await inMemoryNotificationsRepository.create(notification)

    const result = await sut.execute({
      notificationId: '1',
      recipientId: '1',
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryNotificationsRepository.items[0].readAt).toEqual(
      expect.any(Date),
    )
  })

  it('should not be able to read a notification if not author', async () => {
    const notification = makeNotification(
      { recipientId: new UniqueEntityId('1') },
      new UniqueEntityId('1'),
    )

    await inMemoryNotificationsRepository.create(notification)

    const result = await sut.execute({
      notificationId: '1',
      recipientId: '2',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
