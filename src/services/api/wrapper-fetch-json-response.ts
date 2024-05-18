import { FetchJsonResponse } from "./types/fetch-json-response"
// import HTTP_CODES_ENUM from "./types/http-codes"

async function wrapperFetchJsonResponse<T>(
  response: Response
): Promise<FetchJsonResponse<T>> {
  const status = response.status as FetchJsonResponse<T>["status"]
  let r = null
  try {
    r = await response.json()
  } catch (error) {}

  return {
    status,
    // data: [
    //   HTTP_CODES_ENUM.NO_CONTENT,
    //   HTTP_CODES_ENUM.SERVICE_UNAVAILABLE,
    //   HTTP_CODES_ENUM.INTERNAL_SERVER_ERROR,
    // ].includes(status)
    //   ? await response.json()
    //   : r,
    data: r,
  }
}

export default wrapperFetchJsonResponse
