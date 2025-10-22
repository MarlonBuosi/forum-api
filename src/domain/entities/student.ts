export class Student {
  public id: string
  public name: string

  constructor(name: string, id?: string) {
    this.id = id ?? crypto.randomUUID()
    this.name = name
  }
}
