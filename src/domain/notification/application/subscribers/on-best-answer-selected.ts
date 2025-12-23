import { DomainEvents } from "@/core/events/domain-events";
import { EventHandler } from "@/core/events/event-handler";
import { SendNotificationUseCase } from "../use-cases/send-notification";
import { AnswerRepository } from "@/domain/forum/application/repositories/answers-repository";
import { BestAnswerSelectedEvent } from "@/domain/forum/enterprise/events/best-answer-selected-event";

export class OnBestAnswerSelected implements EventHandler {
  constructor(private answerRepository: AnswerRepository, private sendNotification: SendNotificationUseCase) {
    this.setupSubscriptions()
  }

  setupSubscriptions(): void {
    DomainEvents.register(this.sendBestAnswerSelectedNotification.bind(this), BestAnswerSelectedEvent.name)
  }

  private async sendBestAnswerSelectedNotification({ question, bestAnswerId }: BestAnswerSelectedEvent) {
    const answer = await this.answerRepository.findById(bestAnswerId.toString())

    if (answer?.id) {
      await this.sendNotification.execute({
        title: `Your answer has been chosen`,
        recipientId: answer?.authorId.toString(),
        content: `Your answer for ${question.title.substring(0, 40).concat('...')} has been selected as the best answer by the question author. Congratulations!`
      })
    }
  }
}
