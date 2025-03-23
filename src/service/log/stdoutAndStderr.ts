import type { ChildProcessWithoutNullStreams } from 'child_process'

export const logStdoutAndStderrOnData = (
	ytDlpProcess: ChildProcessWithoutNullStreams
) => {
	ytDlpProcess.stdout.on('data', data => console.log(`📥 Загрузка: ${data}`))
	ytDlpProcess.stderr.on('data', data => console.error(`⚠️ Ошибка: ${data}`))
}
