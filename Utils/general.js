import {v4 as uuidv4} from 'uuid';

export const user_uuid=()=> {
    return uuidv4();
}

export function responseGenerator(
	responseData,
	responseStatusCode,
	responseStatusMsg,
	responseStatus
) {
	const responseJson = {
		data: responseData,
		code: responseStatusCode,
		message: responseStatusMsg,
		status: responseStatus,
		timestamp: new Date(),
	}

	return responseJson
}