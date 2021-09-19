import * as core from '@actions/core'
import codenamize from '@codenamize/codenamize'

import { Input } from './input.enum'
import { Output } from './output.enum'

function isError(candidate: unknown): candidate is Error {
    return (
        typeof candidate === 'object' && !!candidate && 'message' in candidate
    )
}

function getInputAsInt(
    name: string,
    options?: core.InputOptions,
): number | undefined {
    const value = parseInt(core.getInput(name, options))
    if (isNaN(value) || value < 0) {
        return undefined
    }
    return value
}

function getInputAsBoolean(
    name: string,
    options?: core.InputOptions,
): boolean | undefined {
    const value = core.getInput(name, options)
    if (value === '') return undefined

    const trueValue = ['true', 'True', 'TRUE']
    const falseValue = ['false', 'False', 'FALSE']
    if (trueValue.includes(value)) return true
    if (falseValue.includes(value)) return false

    throw new TypeError(
        `Input does not meet YAML 1.2 "Core Schema" specification: ${name}\n` +
            `Support boolean input list: \`true | True | TRUE | false | False | FALSE\``,
    )
}

function getInputAsArray(
    name: string,
    options?: core.InputOptions,
): string[] | undefined {
    const input = core.getInput(name, options)
    if (!input) return undefined
    const inputs = input.split('\n').filter(x => x !== '')
    return inputs
}

function run(): void {
    try {
        const options = {
            seed: core.getInput(Input.Seed, { required: true }),
            adjectiveCount: getInputAsInt(Input.AdjectiveCount),
            particles: getInputAsArray(Input.Particles),
            maxItemChars: getInputAsInt(Input.MaxItemChars),
            capitalize: getInputAsBoolean(Input.Capitalize),
            separator: core.getInput(Input.Separator) || undefined,
        }

        core.debug(
            `Running codenamize with options: ${JSON.stringify(
                options,
                null,
                2,
            )}`,
        )

        const codename = codenamize(options)

        core.info(`Codename generated: ${codename}`)

        core.setOutput(Output.Codename, codename)
    } catch (error: unknown) {
        core.setFailed(
            isError(error) ? error.message : `Unknown error: ${error}`,
        )
    }
}

run()

export default run
