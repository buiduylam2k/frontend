import { PropsWithChildren, ReactNode } from "react"

interface ICommonTemplateProps extends PropsWithChildren {
  rightSide?: ReactNode
}

export default function CommonTemplate(props: ICommonTemplateProps) {
  const { children, rightSide } = props

  return (
    <div className="gap-10 mb-10 flex flex-1 flex-col md:flex-row items-start justify-center max-w-screen-lg mx-auto">
      <div className="flex-1 px-4">{children}</div>
      <nav className="max-w-sm p-2.5">{rightSide}</nav>
    </div>
  )
}
