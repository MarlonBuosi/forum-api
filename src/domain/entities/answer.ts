interface AnswerProps {
  content: string
  authorId: string
  questionId: string
  id?: string
}

export class Answer {
  public content: string
  public id: string
  public authorId: string
  public questionId: string

  constructor(props: AnswerProps) {
    this.id = props.id ?? crypto.randomUUID()
    this.content = props.content
    this.authorId = props.authorId
    this.questionId = props.questionId
  }
}
