import process from 'process'
import { downloadYoutubeVideoHandler } from './service/DownloadYoutubeVideo.js'
import { rl, showAllCommands } from './static/variables/variables.js'

export async function runApp() {
	console.log(showAllCommands)

	const args = process.argv.slice(2)

	if (args.length > 0) {
		console.log('args.length > 0')
		const usercommand = args.join(' ')
		await downloadYoutubeVideoHandler(usercommand)
		process.exit(0)
	}

	for await (const line of rl) {
		const userCommand = line.trim()
		console.log(line)

		if (userCommand === 'exit') process.exit(0)

		if (userCommand === 'help') {
			console.log(showAllCommands)
			continue
		}

		if (userCommand.endsWith('-E')) {
			await downloadYoutubeVideoHandler(userCommand)
			process.exit(0)
		}

		await downloadYoutubeVideoHandler(userCommand)
	}
}

runApp()
