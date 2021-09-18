import * as core from '@actions/core'

import run from './index'
import { Input } from './input.enum'

jest.mock('@actions/core')

function getInputName(name: string): string {
    return `INPUT_${name.replace(/ /g, '_').toUpperCase()}`
}

function setInput(name: Input, value: string): void {
    process.env[getInputName(name)] = value
}

function clearInputs(): void {
    for (const name of Object.values(Input)) {
        delete process.env[getInputName(name)]
    }
}

beforeAll(() => {
    jest.spyOn(core, 'getInput').mockImplementation((name, options) => {
        return jest.requireActual('@actions/core').getInput(name, options)
    })
    jest.spyOn(core, 'getBooleanInput').mockImplementation((name, options) => {
        return jest
            .requireActual('@actions/core')
            .getBooleanInput(name, options)
    })
    jest.spyOn(core, 'getMultilineInput').mockImplementation(
        (name, options) => {
            return jest
                .requireActual('@actions/core')
                .getMultilineInput(name, options)
        },
    )
})

afterEach(() => {
    clearInputs()
})

test('single seed', () => {
    // Arrange
    setInput(Input.Seed, '1')
    const setOutputMock = jest.spyOn(core, 'setOutput')

    // Act
    run()

    // Assert
    expect(setOutputMock).toHaveBeenCalledTimes(1)
    expect(setOutputMock).toHaveBeenCalledWith('codename', 'familiar-grand')
})

test('simple classic mode', () => {
    // Arrange
    setInput(Input.Seed, '1')
    setInput(Input.AdjectiveCount, '3')
    const setOutputMock = jest.spyOn(core, 'setOutput')

    // Act
    run()

    // Assert
    expect(setOutputMock).toHaveBeenCalledTimes(1)
    expect(setOutputMock).toHaveBeenCalledWith(
        'codename',
        'endurable-satisfying-familiar-grand',
    )
})

test('custom classic mode', () => {
    // Arrange
    setInput(Input.Seed, '1')
    setInput(Input.AdjectiveCount, '3')
    setInput(Input.MaxItemChars, '3')
    setInput(Input.Capitalize, 'true')
    setInput(Input.Separator, '::')
    const setOutputMock = jest.spyOn(core, 'setOutput')

    // Act
    run()

    // Assert
    expect(setOutputMock).toHaveBeenCalledTimes(1)
    expect(setOutputMock).toHaveBeenCalledWith('codename', 'Dry::Sad::Icy::Few')
})

test('simple particles mode', () => {
    // Arrange
    setInput(Input.Seed, '1')
    setInput(Input.Particles, 'noun\nadjective\nnoun')
    const setOutputMock = jest.spyOn(core, 'setOutput')

    // Act
    run()

    // Assert
    expect(setOutputMock).toHaveBeenCalledTimes(1)
    expect(setOutputMock).toHaveBeenCalledWith('codename', 'map-familiar-grand')
})

test('custom particles mode', () => {
    // Arrange
    setInput(Input.Seed, '1')
    setInput(Input.Particles, 'noun\nadjective\nnoun')
    setInput(Input.MaxItemChars, '3')
    setInput(Input.Capitalize, 'true')
    setInput(Input.Separator, '::')
    const setOutputMock = jest.spyOn(core, 'setOutput')

    // Act
    run()

    // Assert
    expect(setOutputMock).toHaveBeenCalledTimes(1)
    expect(setOutputMock).toHaveBeenCalledWith('codename', 'Mix::Icy::Few')
})
