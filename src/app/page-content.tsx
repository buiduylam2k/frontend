"use client"

import CommonTemplate from "@/components/common-template"
import HomePosts from "@/components/home-posts"
import NewBlogs from "@/components/new-blogs"
import useAuth from "@/services/auth/use-auth"
import isAdmin from "@/services/helpers/is-admin"

export default function HomePage() {
  const { user } = useAuth()
  return isAdmin(user) ? (
    "admin"
  ) : (
    <CommonTemplate rightSide={<NewBlogs />}>
      <HomePosts />
    </CommonTemplate>
  )
}
