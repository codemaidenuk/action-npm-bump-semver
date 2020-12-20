const core = require('@actions/core')
const app = require('../src/app')

jest.mock('@actions/core')

describe('preRelease parameter', () => {
  it('throws if not provided', () => {
    expect.hasAssertions()

    // Act
    app()

    // Assert
    expect(core.setFailed).toHaveBeenCalled()
  })

  it('does not throw if provided', () => {
    // Arrange
    jest.spyOn(core, 'getInput').mockImplementation((param) => {
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
  it('exceptions do not bubble up', () => {
    // Arrange
    const core = require('@actions/core')
    jest.spyOn(core, 'getInput').mockImplementation(() => {
      throw new Error('An Exception')
    })

    // Act
    app()

    // Assert
    expect(core.setFailed).toHaveBeenCalled()
  })
})
