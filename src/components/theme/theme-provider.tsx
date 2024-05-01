"use client"

import { useMemo, PropsWithChildren } from "react"

function ThemeProvider(props: PropsWithChildren<{}>) {
  return props.children
}

export default ThemeProvider
