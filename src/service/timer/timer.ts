import fs from 'fs/promises'

export const retriesForAccessTimer = async (
	seconds: number,
	outputPath: string
) => {
	let retries = 10
	while (retries > 0) {
		try {
			await fs.access(outputPath)
			break
		} catch {
			console.log(`Таймер еще не завершен.\nЖдем еще ${seconds} секунд...`)
			await new Promise(resolve => setTimeout(resolve, seconds * 1000))
			retries--
		}
	}
}
