const core = require('@actions/core')
const app = require('../src/app')

jest.mock('@actions/core')

describe('preRelease parameter', () => {
  test('throws if not provided', () => {
    // Act
    app()

    // Assert
    expect(core.setFailed).toHaveBeenCalled()
  })

  test('does not throw if provided', () => {
    // Arrange
    core.getInput = jest.fn(param => {
      if (param === 'preRelease') {
        return 'true'
      }

      return undefined
    })

    // Act
    app()

    // Assert
    expect(core.setFailed).not.toHaveBeenCalled()
  })
})

describe('error handling', () => {
  test('exceptions do not bubble up', () => {
    // Arrange
    const core = require('@actions/core')
    core.getInput = jest.fn(() => {
      throw new Error('An Exception')
    })

    // Act
    app()

    // Assert
    expect(core.setFailed).toHaveBeenCalled()
  })
})
