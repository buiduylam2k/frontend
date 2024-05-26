"use client"

import { PropsWithChildren, useCallback, useEffect, useState } from "react"
import { useGetAffLinkActiveService } from "./api/services/aff-link"
import HTTP_CODES_ENUM from "./api/types/http-codes"

function AffLinkProvider(props: PropsWithChildren<{}>) {
  const [counter, setCounter] = useState(0)
  const fetchActiveAffLink = useGetAffLinkActiveService()

  const handleActiveLink = useCallback(async () => {
    const activeLink = await fetchActiveAffLink()

    if (activeLink) {
      const { status, data } = activeLink
      if (status === HTTP_CODES_ENUM.OK && data && counter === 0) {
        // check permission
        setCounter(1)
        setTimeout(() => {
          const a = document.createElement("a")
          a.href = data.link
          a.style.display = "none"
          a.target = "_blank"
          document.body.appendChild(a)
          console.log("data.link", data.link)

          // Simulate a click to trigger the download
          a.click()

          // Remove the anchor element after the download (optional)
          document.body.removeChild(a)
        }, data.time * 1000)
      }
    }
  }, [fetchActiveAffLink, counter])

  useEffect(() => {
    handleActiveLink()
  }, [handleActiveLink])

  return props.children
}

export default AffLinkProvider
