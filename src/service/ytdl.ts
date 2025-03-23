export const parseMetadataToJSON = (jsonData: string): any => {
	try {
		return JSON.parse(jsonData)
	} catch (error) {
		console.error('❌ Ошибка парсинга JSON:', error)
	}
}
