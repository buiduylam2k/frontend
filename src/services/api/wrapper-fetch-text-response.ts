import { FetchJsonResponse } from "./types/fetch-json-response"
import HTTP_CODES_ENUM from "./types/http-codes"

async function wrapperFetchTextResponse(
  response: Response
): Promise<FetchJsonResponse<string>> {
  const status = response.status
  return {
    status,
    data: [
      HTTP_CODES_ENUM.OK,
      HTTP_CODES_ENUM.SERVICE_UNAVAILABLE,
      HTTP_CODES_ENUM.INTERNAL_SERVER_ERROR,
    ].includes(status)
      ? undefined
      : await response.text(),
  }
}

export default wrapperFetchTextResponse
