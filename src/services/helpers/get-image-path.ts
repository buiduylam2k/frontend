import { GET_FILES_URL } from "../api/config"

function getImagePath(filename?: string) {
  return filename
    ? `${GET_FILES_URL}/${filename}`
    : "https://picsum.photos/300/200"
}

export default getImagePath
