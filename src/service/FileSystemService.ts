import fs from 'fs/promises'
import path from 'path'

export async function createNewDirectory(directory: string): Promise<string> {
	const isDirectoryExists = await tryToAccessDirectoryOrFile(directory)
	if (isDirectoryExists) return ''
	else {
		await fs
			.mkdir(directory, { recursive: true })
			.then(() => console.log(`${directory}`))
			.catch(err => console.error('Ошибка при создании директории: ', err))
		return directory
	}
}

export const moveFilesToDirectory = async (
	directory: string,
	files: string[] | string
) => {
	if (Array.isArray(files) && files.every(file => typeof file === 'string')) {
		try {
			console.log(
				'moveFilesToDirectory:\n',
				'directory -> ',
				directory,
				'files -> ',
				files
			)

			files.forEach(async file => {
				const fileName = path.basename(file)
				const newPath = path.join(directory, fileName)
				await fs.rename(file, newPath)
			})
		} catch (err) {
			console.error('[moveFileToDirectory] ERROR: ', err)
		}
	} else if (typeof files === 'string') {
		const fileName = path.basename(files)
		const newPath = path.join(directory, fileName)
		await fs.rename(files, newPath)
	}
}

export const tryToAccessDirectoryOrFile = async (
	directory: string
): Promise<boolean> => {
	try {
		await fs.access(directory)
		return true
	} catch {
		return false
	}
}

export const createUniqueMetadataJSONFile = async (
	fileName: string,
	metadata: any
): Promise<string> => {
	await fs.writeFile(path.resolve(`${fileName}.json`), JSON.stringify(metadata))
	return `${fileName}.json`
}
