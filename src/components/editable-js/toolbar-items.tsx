import { FC, useCallback } from "react"
import { Editable, useEditable } from "@editablejs/editor"
import { Grid } from "@editablejs/models"
import {
  FontSizeEditor,
  FontColorEditor,
  BackgroundColorEditor,
  HeadingEditor,
  BlockquoteEditor,
  OrderedListEditor,
  UnorderedListEditor,
  HeadingType,
  MarkFormat,
  MarkEditor,
  TaskListEditor,
  TableEditor,
  LinkEditor,
  ImageEditor,
  HrEditor,
  AlignEditor,
  AlignKeys,
  LeadingEditor,
  CodeBlockEditor,
} from "@editablejs/plugins"
import { HistoryEditor } from "@editablejs/plugin-history"
import { ToolbarItem } from "@editablejs/plugin-toolbar"
import { Icon, IconMap } from "@editablejs/ui"

export const AlignDropdown: FC = () => {
  const editor = useEditable()
  const getAlign = useCallback(() => {
    const value = AlignEditor.queryActive(editor)
    switch (value) {
      case "center":
        return "alignCenter"
      case "right":
        return "alignRight"
      case "justify":
        return "alignJustify"
    }
    return "alignLeft"
  }, [editor])
  const name: keyof typeof IconMap = getAlign()
  return <Icon name={name} />
}

const marks: MarkFormat[] = [
  "bold",
  "italic",
  "underline",
  "strikethrough",
  "code",
  "sub",
  "sup",
]

export const defaultFontColor = "#262626"
export const defaultBackgroundColor = "transparent"

export const createToolbarItems = (editor: Editable) => {
  const items: ToolbarItem[] = [
    {
      type: "button",
      title: "undo",
      disabled: !HistoryEditor.canUndo(editor),
      icon: <Icon name="undo" />,
      onToggle: () => {
        HistoryEditor.undo(editor)
      },
    },
    {
      type: "button",
      title: "redo",
      disabled: !HistoryEditor.canRedo(editor),
      icon: <Icon name="redo" />,
      onToggle: () => {
        HistoryEditor.redo(editor)
      },
    },
  ]
  const markItems: ToolbarItem[] = marks.map((mark) => ({
    type: "button",
    title: mark,
    active: MarkEditor.isActive(editor, mark),
    icon: <Icon name={mark} />,
    onToggle: () => {
      MarkEditor.toggle(editor, mark)
    },
  }))
  items.push("separator", ...markItems)
  items.push(
    "separator",
    {
      type: "color-picker",
      defaultValue: "#F5222D",
      defaultColor: {
        color: defaultFontColor,
        title: "color-picker.default",
      },
      title: "font-color",
      children: <Icon name="fontColor" />,
      onSelect: (color) => {
        FontColorEditor.toggle(editor, color)
      },
    },
    {
      type: "color-picker",
      defaultValue: "#FADB14",
      defaultColor: {
        color: defaultBackgroundColor,
        title: "color-picker.no",
      },
      title: "font-background",
      children: <Icon name="backgroundColor" />,
      onSelect: (color) => {
        BackgroundColorEditor.toggle(editor, color)
      },
    }
  )
  items.push(
    "separator",
    {
      type: "dropdown",
      title: "font-size",
      items: [
        {
          value: "14px",
        },
        {
          value: "16px",
        },
        {
          value: "20px",
        },
        {
          value: "22px",
        },
        {
          value: "24px",
        },
        {
          value: "28px",
        },
      ],
      value: FontSizeEditor.queryActive(editor) ?? "14px",
      onSelect: (value) => {
        FontSizeEditor.toggle(editor, value)
      },
    },
    {
      type: "dropdown",
      title: "heading",
      items: [
        {
          value: "paragraph",
          content: "paragraph",
        },
        {
          value: "heading-one",
          content: "heading-one",
        },
        {
          value: "heading-two",
          content: "heading-two",
        },
        {
          value: "heading-three",
          content: "heading-three",
        },
        {
          value: "heading-four",
          content: "heading-four",
        },
        {
          value: "heading-five",
          content: "heading-five",
        },
        {
          value: "heading-six",
          content: "heading-six",
        },
      ],
      value: HeadingEditor.queryActive(editor) ?? "paragraph",
      onSelect: (value) => {
        HeadingEditor.toggle(editor, value as HeadingType)
      },
    }
  )
  items.push(
    "separator",
    {
      type: "button",
      title: "plugin.link",
      active: LinkEditor.isActive(editor),
      onToggle: () => {
        LinkEditor.open(editor)
      },
      icon: <Icon name="link" />,
    },
    {
      type: "button",
      title: "plugin.image",
      active: ImageEditor.isActive(editor),
      onToggle: () => {
        ImageEditor.open(editor)
      },
      icon: <Icon name="image" />,
    },
    {
      type: "button",
      title: "plugin.blockquote",
      active: BlockquoteEditor.isActive(editor),
      onToggle: () => {
        BlockquoteEditor.toggle(editor)
      },
      icon: <Icon name="blockquote" />,
    },
    {
      type: "button",
      title: "unordered-list",
      active: !!UnorderedListEditor.queryActive(editor),
      onToggle: () => {
        UnorderedListEditor.toggle(editor)
      },
      icon: <Icon name="unorderedList" />,
    },
    {
      type: "button",
      title: "ordered-list",
      active: !!OrderedListEditor.queryActive(editor),
      onToggle: () => {
        OrderedListEditor.toggle(editor)
      },
      icon: <Icon name="orderedList" />,
    },
    {
      type: "button",
      title: "task-list",
      active: !!TaskListEditor.queryActive(editor),
      onToggle: () => {
        TaskListEditor.toggle(editor)
      },
      icon: <Icon name="taskList" />,
    },
    {
      type: "button",
      title: "plugin.table",
      disabled: !!TableEditor.isActive(editor),
      onToggle: () => {
        TableEditor.insert(editor)
      },
      icon: <Icon name="table" />,
    },
    "separator",
    {
      type: "dropdown",
      title: "plugin.align",
      items: [
        {
          value: "left",
          content: (
            <div tw="flex gap-1 items-center">
              <Icon name="alignLeft" />
              align-left
            </div>
          ),
        },
        {
          value: "center",
          content: (
            <div tw="flex gap-1 items-center">
              <Icon name="alignCenter" />
              align-center
            </div>
          ),
        },
        {
          value: "right",
          content: (
            <div tw="flex gap-1 items-center">
              <Icon name="alignRight" />
              align-right
            </div>
          ),
        },
        {
          value: "justify",
          content: (
            <div tw="flex gap-1 items-center">
              <Icon name="alignJustify" />
              align-justify
            </div>
          ),
        },
      ],
      children: <AlignDropdown />,
      value: AlignEditor.queryActive(editor),
      onSelect: (value) => {
        AlignEditor.toggle(editor, value as AlignKeys)
      },
    },
    {
      type: "dropdown",
      title: "leading",
      items: [
        {
          value: "default",
          content: "Default",
        },
        {
          value: "1",
        },
        {
          value: "1.15",
        },
        {
          value: "1.5",
        },
        {
          value: "2",
        },
        {
          value: "3",
        },
      ],
      value: LeadingEditor.queryActive(editor) ?? "default",
      children: <Icon name="leading" />,
      onSelect: (value) => {
        LeadingEditor.toggle(editor, value === "default" ? undefined : value)
      },
    },
    {
      type: "button",
      title: "plugin.hr",
      active: HrEditor.isActive(editor),
      onToggle: () => {
        HrEditor.insert(editor)
      },
      icon: <Icon name="hr" />,
    },
    "separator",
    {
      type: "button",
      title: "code-block",
      active: CodeBlockEditor.isActive(editor),
      onToggle: () => {
        CodeBlockEditor.insert(editor)
      },
      icon: <Icon name="codeBlock" />,
    }
  )

  const grid = Grid.above(editor)
  if (grid) {
    items.push(
      "separator",
      {
        type: "button",
        title: "merge-cells",
        disabled: !Grid.canMerge(editor, grid),
        onToggle: () => {
          Grid.mergeCell(editor, grid)
        },
        icon: <Icon name="tableMerge" />,
      },
      {
        type: "button",
        title: "split-cells",
        icon: <Icon name="tableSplit" />,
        disabled: !Grid.canSplit(editor, grid),
        onToggle: () => {
          Grid.splitCell(editor, grid)
        },
      }
    )
  }
  return items
}
