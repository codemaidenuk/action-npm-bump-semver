const app = require('../src/app')

describe('preRelease parameter', () => {
  test('throws if not provided', () => {
    // Arrange
    const core = require('@actions/core')
    core.setFailed = jest.fn()

    // Act
    app()

    // Assert
    expect(core.setFailed).toHaveBeenCalled()
  })

  test('does not throw if provided', () => {
    // Arrange
    const core = require('@actions/core')
    core.setFailed = jest.fn()
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
