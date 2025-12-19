import { AggregateRoot } from "../entities/aggregate-root";
import { UniqueEntityId } from "../entities/unique-entity-id";
import { DomainEvent } from "./domain-event";
import { DomainEvents } from "./domain-events";

class CustomAggregateCreated implements DomainEvent {
  public occurredAt: Date;
  private aggregate: CustomAggregate

  constructor(aggregate: CustomAggregate) {
    this.occurredAt = new Date()
    this.aggregate = aggregate
  }

  public getAggregateId(): UniqueEntityId {
    return this.aggregate.id
  }
}

class CustomAggregate extends AggregateRoot<null> {
  static create() {
    const aggregate = new CustomAggregate(null)

    aggregate.addDomainEvent(new CustomAggregateCreated(aggregate))

    return aggregate
  }
}

describe('Domain Events', () => {
  it('should be able to dispatch and listen to events', () => {
    const callbackSpy = vi.fn()

    //Subscriber has been registered (listening events)
    DomainEvents.register(callbackSpy, CustomAggregateCreated.name)

    //Creating an event, but not saving on the database (yet)
    const aggregate = CustomAggregate.create()

    //Assuring event has been created but NOT dispatched yet
    expect(aggregate.domainEvents).toHaveLength(1)

    //Saving event on database and dispatching (save should always come before)
    DomainEvents.dispatchEventsForAggregate(aggregate.id)

    //Subscriber listens and executes the actions of the event (after save and dispatch)
    expect(callbackSpy).toHaveBeenCalled()
    expect(aggregate.domainEvents).toHaveLength(0)
  })
})
