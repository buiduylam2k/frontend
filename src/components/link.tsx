// Need for leave page logic
// eslint-disable-next-line no-restricted-imports
import NextLink, { LinkProps } from "next/link"
import { PropsWithChildren, forwardRef } from "react"

const Link = forwardRef<HTMLAnchorElement, LinkProps & PropsWithChildren>(
  function Link(props, ref) {
    let href = props.href

    if (typeof href === "string" && href.startsWith("/")) {
      href = `${href}`
    } else if (typeof href === "object" && href !== null) {
      const pathname = href.pathname ? `/${href.pathname}` : href.pathname
      href = {
        ...href,
        pathname,
      }
    }

    return (
      <NextLink ref={ref} {...props} href={href}>
        {props.children}
      </NextLink>
    )
  }
)

export default Link
