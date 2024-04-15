import { PropsWithChildren } from "react"
import { Badge } from "../ui/badge"

interface ITag extends PropsWithChildren {}

export default function Tag(props: ITag) {
  return (
    <Badge color="pink" variant="outline">
      {props.children}
    </Badge>
  )
}
