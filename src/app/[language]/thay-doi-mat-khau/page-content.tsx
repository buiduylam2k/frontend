"use client"
import withPageRequiredGuest from "@/services/auth/with-page-required-guest"
import { useForm, useFormState } from "react-hook-form"
import { useAuthResetPasswordService } from "@/services/api/services/auth"
import { useRouter } from "next/navigation"
import HTTP_CODES_ENUM from "@/services/api/types/http-codes"
import { useEffect, useMemo, useState } from "react"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

const FormSchema = z
  .object({
    password: z.string().min(1, "Mật khẩu không được để trống!"),
    passwordConfirmation: z.string().min(1, "Mật khẩu không được để trống!"),
  })
  .refine(
    (values) => {
      return values.password === values.passwordConfirmation
    },
    {
      message: "Mật khẩu không khớp nhau",
      path: ["passwordConfirmation"],
    }
  )

type PasswordChangeFormData = z.infer<typeof FormSchema>

const defaultValues: PasswordChangeFormData = {
  password: "",
  passwordConfirmation: "",
}

function FormActions() {
  const { isSubmitting, isValid } = useFormState()

  return (
    <Button type="submit" disabled={isSubmitting || !isValid}>
      Thiết lập mật khẩu mới
    </Button>
  )
}

function ExpiresAlert() {
  const [currentTime, setCurrentTime] = useState(() => Date.now())

  const expires = useMemo(() => {
    const params = new URLSearchParams(window.location.search)

    return Number(params.get("expires"))
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now()
      setCurrentTime(now)

      if (expires < now) {
        clearInterval(interval)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [expires])

  const isExpired = expires < currentTime

  return (
    isExpired && (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Thông báo</AlertTitle>
        <AlertDescription>
          Đường dẫn thiết lập lại mật khẩu đã hết hạn!
        </AlertDescription>
      </Alert>
    )
  )
}

function PasswordChange() {
  const fetchAuthResetPassword = useAuthResetPasswordService()
  const { toast } = useToast()

  const router = useRouter()

  const form = useForm<PasswordChangeFormData>({
    resolver: zodResolver(FormSchema),
    defaultValues,
  })

  const { handleSubmit, reset } = form

  const onSubmit = async (formData: PasswordChangeFormData) => {
    const params = new URLSearchParams(window.location.search)
    const hash = params.get("hash")
    if (!hash) return

    const { data, status } = await fetchAuthResetPassword({
      password: formData.password,
      hash,
    })

    if (status === HTTP_CODES_ENUM.UNPROCESSABLE_ENTITY) {
      toast({
        variant: "destructive",
        title: "Đã có lỗi sảy ra",
        description: "Vui lòng thử lại sau!",
      })

      return
    }

    if (status === HTTP_CODES_ENUM.NO_CONTENT) {
      toast({
        title: "Thiết lập thành công thành công",
        description: "Hãy đăng nhập lại để sử dụng ứng dụng!",
      })

      reset(defaultValues)

      router.replace("/dang-nhap")
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="max-w-sm px-4 sm:px-0 m-auto space-y-4 mt-10 md:mt-28">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Thay đổi mật khẩu
            </h1>
          </div>

          <ExpiresAlert />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mật khẩu</FormLabel>
                <FormControl>
                  <Input placeholder={"Mật khẩu"} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="passwordConfirmation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Xác nhận lại mật khẩu</FormLabel>
                <FormControl>
                  <Input placeholder={"Xác nhận mật khẩu"} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormActions />
        </div>
      </form>
    </Form>
  )
}

export default withPageRequiredGuest(() => <PasswordChange />)
