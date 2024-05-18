"use client"
import { useForm, useFormState } from "react-hook-form"

import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import withPageRequiredAuth from "@/services/auth/with-page-required-auth"
import { RoleEnum } from "@/services/api/types/role"
import { useFileUploadService } from "@/services/api/services/files"

import { useState } from "react"
import HTTP_CODES_ENUM from "@/services/api/types/http-codes"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import getRoleName from "@/services/helpers/get-role-name"
import {
  UserPostRequest,
  usePostUserService,
} from "@/services/api/services/users"

const FormSchema = z.object({
  email: z.string().email("Email không đúng định dạng!"),

  firstName: z.string().min(1, "Họ không được để trống!"),
  lastName: z.string().min(1, "Họ không được để trống!"),

  password: z.string().min(1, "Mật khẩu không được để trống!"),
  passwordConfirmation: z.string().min(1, "Mật khẩu không được để trống!"),

  role: z.string(),

  photo: z.string(),
})

type TFormSchema = z.infer<typeof FormSchema>

const defaultValues: TFormSchema = {
  email: "",
  firstName: "",
  lastName: "",
  password: "",
  passwordConfirmation: "",
  role: RoleEnum.USER.toString(),
  photo: "",
}

function FormActions() {
  const { isSubmitting } = useFormState()

  return (
    <Button type="submit" disabled={isSubmitting}>
      Thêm mới
    </Button>
  )
}

function CreateUser() {
  const fetchPostUser = usePostUserService()
  const fetchFileUpload = useFileUploadService()

  const [file, setFile] = useState<File | undefined>()

  const router = useRouter()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues,
  })

  const { handleSubmit } = form

  const onSubmit = async (formData: TFormSchema) => {
    if (!file) {
      return
    }
    const cloneFormData = { ...formData } as unknown as UserPostRequest
    cloneFormData.role = {
      id: +formData.role as unknown as RoleEnum,
    }

    const { status: statusUpload, data: dataUpload } =
      await fetchFileUpload(file)

    if (statusUpload === HTTP_CODES_ENUM.CREATED) {
      cloneFormData.photo = dataUpload.file
    }

    const { status } = await fetchPostUser(cloneFormData)
    if (status !== HTTP_CODES_ENUM.CREATED) {
      toast.error("Đã có lỗi sảy ra", {
        description: "Vui lòng thử lại sau",
      })
      // nếu lỗi cần xoá ảnh đi
    } else {
      toast.success("Thành công", {
        description: "Tạo người dùng thành công!",
      })
      router.replace("/quan-tri/nguoi-dung")
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="">
        <div className="px-4 sm:px-10 m-auto space-y-4 py-10">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Thêm mới người dùng
            </h1>
          </div>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Địa chỉ email</FormLabel>
                <FormControl>
                  <Input placeholder={"Địa chỉ email"} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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
                  <Input placeholder={"Nhập lại mật khẩu"} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Họ</FormLabel>
                <FormControl>
                  <Input placeholder={"Họ của bạn"} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tên</FormLabel>
                <FormControl>
                  <Input placeholder={"Tên của bạn"} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Vai trò</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value.toString()}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        className="capitalize"
                        placeholder="Chọn vai trò cho user"
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {[RoleEnum.ADMIN, RoleEnum.USER].map((r) => (
                      <SelectItem value={r.toString()} className="capitalize">
                        {getRoleName(r)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="photo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ảnh đại diện</FormLabel>
                <FormControl>
                  <Input
                    placeholder={"Avatar"}
                    type="file"
                    accept=".png"
                    {...field}
                    onChange={(e) => {
                      setFile(e.target.files?.[0])
                      field.onChange(e)
                    }}
                  />
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

export default withPageRequiredAuth(CreateUser, {
  roles: [RoleEnum.ADMIN],
})
