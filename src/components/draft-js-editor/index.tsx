import { Editor, initialStyleMap } from "contenido"
import { EditorState } from "draft-js"
import { useState } from "react"

export default function DraftJsEditor() {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  )
  return (
    <Editor
      editorState={editorState}
      onChange={setEditorState}
      customStyleMap={initialStyleMap}
      // editorRef={editorRef}
    />
  )
}
