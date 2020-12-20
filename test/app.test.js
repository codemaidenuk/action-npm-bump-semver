const core = require('@actions/core')
const app = require('../src/app')

jest.mock('@actions/core')

describe('preRelease parameter', () => {
  it('throws if not provided', () => {
    // Arrange
    expect.hasAssertions()

    // Act
    app()

    // Assert
    expect(core.setFailed).toHaveBeenCalledWith(expect.any(String))
  })

  it('does not throw if provided', () => {
    // Arrange
    expect.hasAssertions()
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
    expect.hasAssertions()
    jest.spyOn(core, 'getInput').mockImplementation(() => {
      throw new Error('An Exception')
    })

    // Act
    app()

    // Assert
    expect(core.setFailed).toHaveBeenCalledWith(expect.any(String))
  })
})
