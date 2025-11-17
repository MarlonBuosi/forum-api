import { type Either, left, right } from './either'

function doSomething(isSuccess: boolean): Either<string, number> {
  if (isSuccess) {
    return right(10)
  }
  return left('error')
}

test('success result', () => {
  const successResult = doSomething(true)

  expect(successResult.isLeft()).toBe(false)
  expect(successResult.isRight()).toBe(true)
})

test('error result', () => {
  const errorResult = doSomething(false)

  expect(errorResult.isLeft()).toBe(true)
  expect(errorResult.isRight()).toBe(false)

})
