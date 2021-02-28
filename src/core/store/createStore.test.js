import {createStore} from './createStore'

describe('TEST', () => {
  test('test22', () => {
    const store = createStore(() => {}, {})
    expect(store).toBeDefined()
  })
})
