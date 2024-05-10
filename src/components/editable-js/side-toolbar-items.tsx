import { Editable } from "@editablejs/editor"
import { Editor, Range, Element } from "@editablejs/models"
import {
  TableEditor,
  BlockquoteEditor,
  UnorderedListEditor,
  OrderedListEditor,
  TaskListEditor,
  ImageEditor,
} from "@editablejs/plugins"
import { SideToolbarItem } from "@editablejs/plugin-toolbar/side"
import { Icon } from "@editablejs/ui"

export const createSideToolbarItems = (
  editor: Editable,
  range: Range,
  element: Element
) => {
  const items: SideToolbarItem[] = []
  const isEmpty = Editor.isEmpty(editor, element)
  if (isEmpty) {
    items.push(
      {
        key: "image",
        icon: <Icon name="image" />,
        title: "image",
        onSelect: () => {
          ImageEditor.open(editor)
        },
      },
      {
        key: "table",
        icon: <Icon name="table" />,
        title: "table",
        disabled: !!TableEditor.isActive(editor),
        onSelect: () => {
          TableEditor.insert(editor)
        },
      },
      {
        key: "blockquote",
        icon: <Icon name="blockquote" />,
        title: "blockquote",
        onSelect: () => {
          BlockquoteEditor.toggle(editor)
        },
      },
      {
        key: "unorderedList",
        icon: <Icon name="unorderedList" />,
        title: "unordered-list",
        onSelect: () => {
          UnorderedListEditor.toggle(editor)
        },
      },
      {
        key: "orderedList",
        icon: <Icon name="orderedList" />,
        title: "ordered-list",
        onSelect: () => {
          OrderedListEditor.toggle(editor)
        },
      },
      {
        key: "taskList",
        icon: <Icon name="taskList" />,
        title: "task-list",
        onSelect: () => {
          TaskListEditor.toggle(editor)
        },
      }
    )
  } else {
    items.push(
      {
        key: "cut",
        icon: <Icon name="cut" />,
        title: "cut",
        onSelect() {
          editor.cut(range)
        },
      },
      {
        key: "copy",
        icon: <Icon name="copy" />,
        title: "copy",
        onSelect() {
          editor.copy(range)
        },
      }
    )
  }

  return items
}
