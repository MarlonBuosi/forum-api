import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { AnswerComment, AnswerCommentProps } from "@/domain/enterprise/entities/answer-comment";
import { QuestionComment, QuestionCommentProps } from "@/domain/enterprise/entities/question-comment";
import { faker } from '@faker-js/faker'

export function makeAnswerComment(override: Partial<AnswerCommentProps> = {}, id?: UniqueEntityId) {
  const answerComment = AnswerComment.create({
    authorId: new UniqueEntityId(),
    content: faker.lorem.text(),
    answerId: new UniqueEntityId(),
    ...override
  }, id)

  return answerComment
}
