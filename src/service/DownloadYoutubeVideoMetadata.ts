import { parseMetadataToJSON } from './ytdl.js'
import { spawn } from 'child_process'

export async function getYouTubeVideoMetadata(
	videoUrl: string
): Promise<any | null> {
	return new Promise<any>((resolve, reject) => {
		console.log('Запрашиваем метаданные...')
		const ytDlpProcess = spawn('yt-dlp', ['--dump-json', videoUrl])

		let jsonData = ''
		let errorData = ''

		ytDlpProcess.stdout.on('data', data => (jsonData += data.toString()))

		ytDlpProcess.stderr.on('data', data => (errorData += data.toString()))

		ytDlpProcess.on('close', code => {
			if (code === 0) {
				try {
					const metadata = parseMetadataToJSON(jsonData)
					resolve(metadata)
				} catch (error) {
					reject(`Ошибка парсинга метаданных: ${error}`)
				}
			} else
				reject(`❌ yt-dlp завершился с кодом ${code}. Ошибка: ${errorData}`)
		})
	})
}
