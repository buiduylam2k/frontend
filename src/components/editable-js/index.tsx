"use client"
// Import React dependencies
// Import the Editable package
import {
  Descendant,
  Editor,
  Range,
  Transforms,
  createEditor,
} from "@editablejs/models"
// Import the Editable package
import {
  withEditable,
  isTouchDevice,
  useIsomorphicLayoutEffect,
  parseDataTransfer,
  Placeholder,
  Editable,
} from "@editablejs/editor"
import {
  ContextMenu,
  useContextMenuEffect,
  withPlugins,
} from "@editablejs/plugins"
import {
  Toolbar,
  ToolbarComponent,
  useToolbarEffect,
  withToolbar,
} from "@editablejs/plugin-toolbar"
import { WebsocketProvider } from "@editablejs/yjs-websocket"

import * as Y from "yjs"
import {
  CursorData,
  YjsEditor,
  useRemoteStates,
  withYHistory,
  withYjs,
} from "@editablejs/plugin-yjs"
import { withHistory } from "@editablejs/plugin-history"
import {
  createToolbarItems,
  defaultBackgroundColor,
  defaultFontColor,
} from "./toolbar-items"
import { javascript as codemirrorJavascript } from "@codemirror/lang-javascript-next"
import { html as codemirrorHtml } from "@codemirror/lang-html-next"
import { css as codemirrorCss } from "@codemirror/lang-css-next"
import { withYCodeBlock } from "@editablejs/plugin-codeblock/yjs"
import {
  withInlineToolbar,
  useInlineToolbarEffect,
  InlineToolbar,
} from "@editablejs/plugin-toolbar/inline"

import {
  withSideToolbar,
  useSideToolbarMenuEffect,
  SideToolbar,
} from "@editablejs/plugin-toolbar/side"

import {
  withSlashToolbar,
  useSlashToolbarEffect,
  SlashToolbar,
} from "@editablejs/plugin-toolbar/slash"

import { withHTMLSerializerTransform } from "@editablejs/plugins/serializer/html"
import { withTextSerializerTransform } from "@editablejs/plugins/serializer/text"
import { withHTMLDeserializerTransform } from "@editablejs/plugins/deserializer/html"

import { createContextMenuItems } from "./context-menu-items"
import { createInlineToolbarItems } from "./inline-toolbar-items"
import { createSideToolbarItems } from "./side-toolbar-items"
import { createSlashToolbarItems } from "./slash-toolbar-items"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"
import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import Preview from "./preview"
import Content from "./content"
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from "react"

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      YJS_SERVER: string
    }
  }
}

interface EdiableJsProps {
  initialValue?: string
  onChange?: (value: string) => void
  preview?: boolean
  placeholder?: string
}

export interface EditableJsRef {
  deleteContent: () => void
}

export default forwardRef<EditableJsRef, EdiableJsProps>(function EditableJs(
  props: EdiableJsProps,
  ref
) {
  const { initialValue, onChange, preview, placeholder } = props

  const [connected, setConnected] = useState(false)
  const [, setConnection] = useState(false)
  const [enableCollaborative] = useState(false)

  const document = useMemo(() => new Y.Doc(), [])

  const provider = useMemo(() => {
    const provider =
      typeof window === "undefined"
        ? null
        : new WebsocketProvider(
            "wss://yjs-server.editablejs.com",
            "editable",
            document,
            {
              connect: false,
            }
          )

    const handleStatus = (
      event: Record<"status", "connecting" | "connected" | "disconnected">
    ) => {
      const { status } = event
      if (status === "connected") {
        setConnected(true)
        setConnection(false)
      } else if (status === "connecting") {
        setConnection(true)
      } else if (status === "disconnected") {
        setConnected(false)
        setConnection(false)
      }
    }
    if (provider) provider.on("status", handleStatus)
    return provider
  }, [document])

  const editor = useMemo(() => {
    const sharedType = document.get("content", Y.XmlText) as Y.XmlText

    let editor = withYjs(withEditable(createEditor()), sharedType, {
      autoConnect: false,
    })

    editor = withHistory(editor)

    editor = withYHistory(editor)

    editor = withPlugins(editor, {
      fontSize: { defaultSize: "14px" },
      fontColor: { defaultColor: defaultFontColor },
      backgroundColor: { defaultColor: defaultBackgroundColor },
      codeBlock: {
        languages: [
          {
            value: "plain",
            content: "Plain text",
          },
          {
            value: "javascript",
            content: "JavaScript",
            plugin: codemirrorJavascript(),
          },
          {
            value: "html",
            content: "HTML",
            plugin: codemirrorHtml(),
          },
          {
            value: "css",
            content: "CSS",
            plugin: codemirrorCss(),
          },
        ],
      },
    })
    if (provider) editor = withYCodeBlock(editor, document, provider.awareness)
    editor = withInlineToolbar(withToolbar(editor))

    if (!isTouchDevice) {
      editor = withSideToolbar(editor)
    }

    editor = withSlashToolbar(editor)

    return editor
  }, [document, provider])

  useIsomorphicLayoutEffect(() => {
    const unsubscribe = Placeholder.subscribe(editor, ([node]) => {
      if (Editable.isFocused(editor) && Editor.isBlock(editor, node))
        return () => "..."
    })
    return () => unsubscribe()
  }, [editor])

  useEffect(() => {
    if (!provider) return
    if (enableCollaborative) {
      provider.connect()
    }
    return () => {
      provider.disconnect()
    }
  }, [provider, enableCollaborative])

  useEffect(() => {
    if (connected) {
      YjsEditor.connect(editor)
    }
    return () => YjsEditor.disconnect(editor)
  }, [editor, connected])

  useIsomorphicLayoutEffect(() => {
    withTextSerializerTransform(editor)
    withHTMLSerializerTransform(editor)
    withHTMLDeserializerTransform(editor)
    const { onPaste } = editor

    editor.onPaste = (event) => {
      const { clipboardData, type } = event
      if (!clipboardData || !editor.selection) return onPaste(event)
      const { fragment, files } = parseDataTransfer(clipboardData)
      const isPasteText = type === "pasteText"
      if (!isPasteText && (fragment.length > 0 || files.length > 0)) {
        return onPaste(event)
      }
      if (Range.isExpanded(editor.selection)) {
        Transforms.delete(editor)
      }
      onPaste(event)
    }

    return () => {
      editor.onPaste = onPaste
    }
  }, [editor])

  useContextMenuEffect(() => {
    ContextMenu.setItems(editor, createContextMenuItems(editor))
  }, editor)

  useToolbarEffect(() => {
    Toolbar.setItems(editor, createToolbarItems(editor))
  }, editor)

  useInlineToolbarEffect(() => {
    InlineToolbar.setItems(editor, createInlineToolbarItems(editor))
  }, editor)

  useSideToolbarMenuEffect((...a) => {
    SideToolbar.setItems(editor, createSideToolbarItems(editor, ...a))
  }, editor)

  useSlashToolbarEffect((value) => {
    SlashToolbar.setItems(editor, createSlashToolbarItems(editor, value))
  }, editor)

  const remoteClients = useRemoteStates<CursorData>(editor)

  const handleOnChange = useCallback(
    (value: Descendant[]) => {
      const isAstChange = editor.operations.some(
        (op) => "set_selection" !== op.type
      )
      if (isAstChange) {
        onChange?.(JSON.stringify(value))
      }
    },
    [editor, onChange]
  )

  useImperativeHandle(
    ref,
    () => {
      return {
        deleteContent() {
          console.log("hixx")

          Transforms.delete(editor, {
            at: {
              anchor: Editor.start(editor, []),
              focus: Editor.end(editor, []),
            },
          })
        },
      }
    },
    [editor]
  )

  const _value = useMemo(() => {
    return initialValue ? JSON.parse(initialValue) : undefined
  }, [initialValue])

  if (preview) {
    return <Preview initialValue={initialValue} editor={editor} />
  }

  return (
    <div className="border rounded-lg p-4">
      <Tabs defaultValue="editor">
        <TabsList>
          <TabsTrigger value="editor">Editor</TabsTrigger>
          <TabsTrigger value="preview">Xem trước</TabsTrigger>
        </TabsList>
        <TabsContent value="editor">
          <Content
            provider={{
              editor,
              value: _value,
              onChange: handleOnChange,
            }}
            content={{
              placeholder: placeholder || "Nội dung bài blog...",
            }}
            header={
              <div className="shadow-sm rounded-lg bg-slate-50">
                {Object.keys(remoteClients).map((id) => {
                  const state = remoteClients[id]
                  if (!state.data) return null
                  const { name, avatar } = state.data
                  return (
                    <Tooltip key={id}>
                      <TooltipTrigger asChild>
                        <div className="rounded-full w-7 h-7 overflow-hidden">
                          <Image
                            alt={name}
                            src={avatar ?? name}
                            width={28}
                            height={28}
                          />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>{name}</TooltipContent>
                    </Tooltip>
                  )
                })}
                <ToolbarComponent editor={editor} className="py-2 px-4" />
              </div>
            }
          />
        </TabsContent>
        <TabsContent value="preview">
          <Content
            provider={{
              editor,
              value: _value,
            }}
            content={{
              readOnly: true,
              placeholder: "",
            }}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
})
