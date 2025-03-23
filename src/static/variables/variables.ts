import { homedir } from 'os'
import { createInterface } from 'readline'

export const matchPathToDirectory = (userCommand: string) =>
	userCommand.match(/-d\s+(\S+)/)

export const projectRoot = homedir()

export const rl = createInterface({
	input: process.stdin,
	output: process.stdout,
})

export const showAllCommands = `
	Доступные команды:
	- [Youtube URL]				 - Скачать ютуб-видео
	- -d {dirname} [Youtube URL]  		 - Куда поместить файл (~/Desktop/?)
	- -help       			         - Показать меню помощи
	- -dljson				 - Скачать метаданные в JSON формате
	- -exit/exit					 - Завершить программу
	- -E					- Завершить программу после загрузки (добавлять в конец)
	`
