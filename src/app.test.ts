// import { testRunApp } from './app'
// import { downloadYoutubeVideoHandler } from './service/DownloadYoutubeVideo'

// jest.mock('../src/service/DownloadYoutubeVideo', () => ({
// 	downloadYoutubeVideoHandler: jest.fn(),
// }))

// describe('runApp()', () => {
// 	test('Пользователь вводит команду скачивания', async () => {
// 		await testRunApp(['https://example.com'])
// 		expect(downloadYoutubeVideoHandler).toHaveBeenLastCalledWith(
// 			'https://example.com'
// 		)
// 	})

// 	test('Пользователь вводит команду -E и программа завершает свое выполнение', async () => {
// 		await testRunApp(['https://example.com -E'])

// 		expect(downloadYoutubeVideoHandler).toHaveBeenCalledWith(
// 			'https://example.com -E'
// 		)
// 	})

// 	test('Пользователь вводит команду `help`', async () => {
// 		console.log = jest.fn()

// 		await testRunApp(['-help'])
// 		expect(console.log).toHaveBeenCalledWith(
// 			expect.stringContaining('Доступные команды')
// 		)
// 	})

// 	test('Команда `exit` ничего не делает', async () => {
// 		await testRunApp(['exit'])

// 		expect(downloadYoutubeVideoHandler).not.toHaveBeenCalled()
// 	})
// })
