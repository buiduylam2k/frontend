"use client"

import { useEffect } from "react"
import { useAuthConfirmEmailService } from "@/services/api/services/auth"
import { useRouter } from "next/navigation"
import HTTP_CODES_ENUM from "@/services/api/types/http-codes"
import { useToast } from "@/components/ui/use-toast"
import LoadingSpinner from "@/components/loading-spinner"

export default function ConfirmEmail() {
  const { toast } = useToast()

  const fetchConfirmEmail = useAuthConfirmEmailService()
  const router = useRouter()

  useEffect(() => {
    const confirm = async () => {
      const params = new URLSearchParams(window.location.search)
      const hash = params.get("hash")

      if (hash) {
        const { status } = await fetchConfirmEmail({
          hash,
        })

        if (status === HTTP_CODES_ENUM.NO_CONTENT) {
          toast({
            title: "Thành công",
            description: "Xác nhận email thành công!",
          })

          router.replace("/trang-ca-nhan")
        } else {
          toast({
            variant: "destructive",
            title: "Đã có lỗi sảy ra",
            description: "Vui lòng thử lại sau",
          })
          router.replace("/")
        }
      }
    }

    confirm()
  }, [fetchConfirmEmail, router, toast])

  return (
    <div className="flex flex-1 mt-28 items-center justify-center text-center">
      <div className="flex-col flex items-center gap-2">
        <p>Đang tiến hành xác nhận email, vui lòng chờ trong giây lát!</p>
        <LoadingSpinner />
      </div>
    </div>
  )
}
