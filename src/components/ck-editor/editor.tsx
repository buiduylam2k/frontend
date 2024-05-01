"use client"
import { CKEditor } from "@ckeditor/ckeditor5-react"
import { useRef } from "react"

import ClassicEditor from "@ckeditor/ckeditor5-build-classic"
import { UPLOAD_URL } from "@/services/api/config"
import useAuthTokens from "@/services/auth/use-auth-tokens"

import "@/app/ckeditor.css"

const editorConfiguration = {
  toolbar: [
    "undo",
    "redo",
    "|",
    "heading",
    "|",
    "fontfamily",
    "FontSize",
    "fontColor",
    "fontBackgroundColor",
    "|",
    "bold",
    "italic",
    "strikethrough",
    "subscript",
    "superscript",
    "code",
    "|",
    "link",
    "uploadImage",
    "blockQuote",
    "codeBlock",
    "|",
    "bulletedList",
    "numberedList",
    "todoList",
    "outdent",
    "indent",
  ],
}

interface IEditor {
  initialValue?: string
  onChange?: (value: string) => void
}

export default function MyCkEditor(props: IEditor) {
  const { initialValue, onChange } = props

  const { tokensInfoRef } = useAuthTokens()

  const editorRef = useRef<ClassicEditor | null>(null)

  const handleEditorChange = (event: unknown, editor: ClassicEditor) => {
    const data = editor.getData()
    onChange?.(data)
  }

  return (
    <CKEditor
      editor={ClassicEditor}
      config={{
        ...editorConfiguration,
        simpleUpload: {
          uploadUrl: UPLOAD_URL,
          headers: {
            Authorization: "Bearer " + tokensInfoRef?.current?.token,
          },
        },
      }}
      data={initialValue}
      onReady={(editor) => (editorRef.current = editor)}
      onChange={handleEditorChange}
      onBlur={handleEditorChange}
    />
  )
}
