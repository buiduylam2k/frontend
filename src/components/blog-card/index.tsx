import * as React from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card"

import { Button } from "../ui/button"
import Image from "next/image"
import Tag from "../tag"
import { ArrowUpRight } from "lucide-react"
import { Blog } from "@/services/api/types/blog"
import formatDate from "@/services/helpers/format-date"
import Link from "../link"
import getImagePath from "@/services/helpers/get-image-path"
import EdiableJs from "../editable-js"

interface IBlogCard extends Partial<Blog> {}

export default function BlogCard(props: IBlogCard) {
  const { title, content = "", createdAt, tags, id, slug, banner } = props
  return (
    <Link key={id} href={`/blogs/${slug}`}>
      <Card className="w-full">
        <CardHeader>
          <Image
            src={getImagePath(banner)}
            alt={title?.slice(0, 10) ?? "blog card"}
            width={300}
            height={200}
          />
          <span className="font-semibold text-purple-600">
            {formatDate(createdAt)}
          </span>
          <div className="flex items-start justify-start">
            <CardTitle className="flex-1 mt-1 line-clamp-4">{title}</CardTitle>
            <Button variant={"ghost"} size={"icon"}>
              <ArrowUpRight />
            </Button>
          </div>
          <CardDescription>
            <div className="line-clamp-3">
              <EdiableJs preview initialValue={content} />
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            {tags?.map((tag) => <Tag key={tag.id}>{tag.name}</Tag>)}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
