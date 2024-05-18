import { Descendant } from "@editablejs/models"
import { useMemo } from "react"
import { HTMLSerializer } from "@editablejs/serializer/html"

interface PreviewProps {
  initialValue?: string
  editor: any
}

export default function Preview(props: PreviewProps) {
  const { editor, initialValue } = props

  const html = useMemo(() => {
    const blocks: Descendant[] = initialValue ? JSON.parse(initialValue) : []

    return blocks
      .map((b) => HTMLSerializer.transformWithEditor(editor, b))
      .join("")
  }, [initialValue, editor])

  return (
    <div
      dangerouslySetInnerHTML={{
        __html: html,
      }}
    />
  )
}
