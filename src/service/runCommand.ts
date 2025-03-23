import { spawn } from 'child_process'
import { logStdoutAndStderrOnData } from './log/stdoutAndStderr.js'

export const runCommand = (
	command: string,
	args: string[],
	cwd?: string
): Promise<void> => {
	return new Promise<void>((resolve, reject) => {
		const process = cwd ? spawn(command, args, { cwd }) : spawn(command, args)
		logStdoutAndStderrOnData(process)

		process.on('close', code => {
			if (code === 0) {
				resolve()
			} else {
				reject(new Error(`Ошибка выполнения команды ${command} (код ${code})`))
			}
		})
	})
}
