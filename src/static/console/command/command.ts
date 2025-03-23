import fs from 'fs/promises'
import { homedir } from 'os'
import path from 'path'
import { downloadYouTubeVideo } from '../../../service/DownloadYoutubeVideo.js'

export async function insertIntoDirectoryDownloadedVideo(
	userCommand: string,
	match: RegExpMatchArray
) {
	const args = userCommand.trim().split(' ')
	const dFlag = args.includes('-d')
	const urlIndex = args.findIndex(arg => arg.startsWith('http'))
	const url = args.slice(urlIndex).join(' ').replace(' -E', '')
	const dirname = match[1].trim()
	const metadata = args.includes('-dljson')
	const format = args.includes('webm') ? 'webm' : undefined

	console.log('args', args)
	console.log('url', url)
	console.log('dirname', dirname)
	console.log('metadata', metadata)
	console.log('format', format)

	if (!dFlag) await downloadYouTubeVideo(url, metadata, format)

	const [outputPath, pathToJsonFile, filename] = await Promise.all(
		await downloadYouTubeVideo(url, metadata, format)
	)

	await fs.mkdir(dirname, { recursive: true })

	await tryToCreateDirectoryAndMoveFile(dirname, [
		outputPath,
		pathToJsonFile,
		filename,
	])

	console.log('Download complete:', outputPath)
}

const tryToCreateDirectoryAndMoveFile = async (
	dirname: string,
	[outputPath, pathToJsonFile, filename]: string[]
) => {
	try {
		const newPath = path.join(homedir(), dirname, `${filename}.mp4`)
		if (!pathToJsonFile) await fs.rename(outputPath, newPath)
		else {
			await fs.rename(
				pathToJsonFile,
				path.join(homedir(), dirname, pathToJsonFile)
			)

			await fs.rename(outputPath, newPath)
		}
	} catch (error) {
		console.error('Ошибка при перемещении файла:', error)
	}
}

export async function moveAllDownloadedFilesToRootDirectory(
	userCommand: string
) {
	const args = userCommand.slice(3).trim().split(' ')
	const downloadMetadataUserCommand = args.pop()
	let downloadMetadata = false

	if (downloadMetadataUserCommand?.toLowerCase() === '-dljson')
		downloadMetadata = true

	userCommand.includes('mp4')
		? await downloadYouTubeVideo(userCommand, downloadMetadata, 'mp4')
		: await downloadYouTubeVideo(userCommand, downloadMetadata)
}
