import { Editable, Hotkey } from "@editablejs/editor"
import { Editor, Grid, Range } from "@editablejs/models"
import { ContextMenuItem } from "@editablejs/plugins"
import { Icon } from "@editablejs/ui"

export const createContextMenuItems = (editor: Editable) => {
  const { selection } = editor
  let isDisabled = !selection || Range.isCollapsed(selection)
  if (isDisabled) {
    const voidNode = Editor.above(editor, {
      match: (n) => Editor.isVoid(editor, n),
    })
    if (voidNode) isDisabled = false
  }

  const items: ContextMenuItem[] = [
    {
      key: "cut",
      icon: <Icon name="cut" />,
      title: "cut",
      rightText: Hotkey.format("mod+x"),
      disabled: isDisabled,
      onSelect() {
        editor.cut()
      },
    },
    {
      key: "copy",
      icon: <Icon name="copy" />,
      title: "copy",
      rightText: Hotkey.format("mod+c"),
      disabled: isDisabled,
      onSelect() {
        editor.copy()
      },
    },
    {
      key: "paste",
      icon: <Icon name="paste" />,
      title: "paste",
      rightText: Hotkey.format("mod+v"),
      disabled: !selection,
      onSelect() {
        editor.insertFromClipboard()
      },
    },
    {
      key: "paste-text",
      icon: <Icon name="pasteText" />,
      title: "paste-text",
      rightText: Hotkey.format("mod+shift+v"),
      disabled: !selection,
      onSelect() {
        editor.insertTextFromClipboard()
      },
    },
  ]
  const grid = Grid.above(editor)
  if (grid) {
    items.push(
      {
        type: "separator",
      },
      {
        key: "merge_cells",
        icon: <Icon name="tableMerge" />,
        title: "merge-cells",
        disabled: !Grid.canMerge(editor, grid),
        onSelect: () => {
          Grid.mergeCell(editor, grid)
        },
      },
      {
        key: "split_cells",
        icon: <Icon name="tableSplit" />,
        title: "split-cells",
        disabled: !Grid.canSplit(editor, grid),
        onSelect: () => {
          Grid.splitCell(editor, grid)
        },
      }
    )
  }

  return items
}
