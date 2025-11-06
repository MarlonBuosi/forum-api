import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { Answer, AnswerProps } from "@/domain/enterprise/entities/answer";
import { Question, QuestionProps } from "@/domain/enterprise/entities/question";
import { Slug } from "@/domain/enterprise/entities/value-objects/slug";
import { faker } from '@faker-js/faker'

export function makeAnswer(override: Partial<AnswerProps> = {}, id?: UniqueEntityId) {
  const answer = Answer.create({
    authorId: new UniqueEntityId(),
    content: faker.lorem.text(),
    questionId: new UniqueEntityId(),
    ...override
  }, id)

  return answer
}
