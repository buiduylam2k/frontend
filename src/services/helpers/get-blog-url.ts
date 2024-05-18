export default function getBlogUrl(slug: string) {
  return `${process.env.NEXT_PUBLIC_URL}/blogs/${slug}`
}
