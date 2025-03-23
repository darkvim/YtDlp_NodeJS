import {
	insertIntoDirectoryDownloadedVideo,
	moveAllDownloadedFilesToRootDirectory,
} from '../static/console/command/command.js'
import { sanitizeFilename } from '../static/regularExp.js'
import type { DownloadType } from '../static/types/downloadType.js'
import { matchPathToDirectory } from '../static/variables/variables.js'
import { getYouTubeVideoMetadata } from './DownloadYoutubeVideoMetadata.js'
import { createUniqueMetadataJSONFile } from './FileSystemService.js'
import { runCommand } from './runCommand.js'

export async function downloadYoutubeVideoHandler(userCommand: string) {
	const match = matchPathToDirectory(userCommand)
	console.log('userCommand', userCommand)
	console.log('match ', match)
	if (match) await insertIntoDirectoryDownloadedVideo(userCommand, match)
	else await moveAllDownloadedFilesToRootDirectory(userCommand)
}

export async function downloadYouTubeVideo(
	videoUrl: string,
	downloadVideoMetadata?: boolean,
	format?: string
): Promise<[string, string, string]> {
	const youtubeVideoMetadata = await getYouTubeVideoMetadata(videoUrl)
	const youtubeVideoTitle = sanitizeFilename(await youtubeVideoMetadata.title)

	if (downloadVideoMetadata && youtubeVideoMetadata) {
		console.log('__downloadVideoMetadata && youtubeVideoMetadata')
		const uniqueMetadataJSONFile = await createUniqueMetadataJSONFile(
			youtubeVideoTitle,
			youtubeVideoMetadata
		)

		console.log('uniqueMetadataJSONFile', uniqueMetadataJSONFile)

		const outputPath = await downloadProcess(
			videoUrl,
			youtubeVideoTitle,
			format
		)

		console.log('videoUrl', videoUrl)
		console.log('youtubeVideoTitle', youtubeVideoTitle)
		console.log('format', format)
		return [outputPath, uniqueMetadataJSONFile, youtubeVideoTitle]
	}
	console.log('youtubeVideoTitle', youtubeVideoTitle)
	console.log('!!!!downloadVideoMetadata && youtubeVideoMetadata')
	const outputPath = await downloadProcess(videoUrl, youtubeVideoTitle, format)
	console.log('DownloadYoutubeVideo', videoUrl, youtubeVideoTitle)
	return [outputPath, '', youtubeVideoTitle]
}

const downloadProcess = async (
	videoUrl: string,
	youtubeVideoTitle: string,
	format?: string
): Promise<string> => {
	console.log(
		`videoUrl youtubeVideoTitle format`,
		videoUrl,
		youtubeVideoTitle,
		format
	)

	if (format === 'webm') {
		console.log('Скачиваем в формате webm')
		return await downloadVideo({
			videoTitle: youtubeVideoTitle,
			videoUrl: videoUrl,
		})
	} else {
		console.log('Скачиваем в формате mp4')

		return await downloadMP4({
			videoTitle: youtubeVideoTitle,
			videoUrl: videoUrl,
		})
	}
}

export const downloadMP4 = async ({ videoTitle, videoUrl }: DownloadType) => {
	const outputPath = `${videoTitle}.mp4`
	await runCommand('yt-dlp', [
		'-f',
		'bestvideo[ext=mp4][vcodec^=avc1]+bestaudio[ext=m4a]/best[ext=mp4]',
		'--merge-output-format',
		'mp4',
		'-o',
		outputPath,
		videoUrl,
	])
	return outputPath
}

const downloadVideo = async ({ videoTitle, videoUrl }: DownloadType) => {
	const outputPath = `${videoTitle}.webm`
	await runCommand('yt-dlp', ['-o', outputPath, videoUrl])
	return outputPath
}
