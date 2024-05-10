import {
  ContentEditable,
  Editable,
  EditableProvider,
  SelectionDrawingStyle,
} from "@editablejs/editor"
import { Descendant } from "@editablejs/models"
import { CSSProperties, ElementType, ReactNode } from "react"

interface ProviderProps {
  editor: Editable
  value?: Descendant[] | undefined
  onChange?: ((value: Descendant[]) => void) | undefined
}

type EditableProps = {
  readOnly?: boolean
  lang?: string
  autoFocus?: boolean
  placeholder?: ReactNode
  role?: string
  style?: CSSProperties
  as?: ElementType
  selectionDrawingStyle?: SelectionDrawingStyle
}

interface ContentProps {
  provider: ProviderProps
  content: EditableProps
  header?: ReactNode
}
export default function Content(props: ContentProps) {
  const { content, provider, header } = props

  return (
    <EditableProvider {...provider}>
      {header}
      <div className="mt-2 md:mt-5">
        <ContentEditable {...content} />
      </div>
    </EditableProvider>
  )
}
