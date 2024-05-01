import { Button } from "@/components/ui/button"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { useAddCommentPostService } from "@/services/api/services/post"
import HTTP_CODES_ENUM from "@/services/api/types/http-codes"
import { yupResolver } from "@hookform/resolvers/yup"
import { FormProvider, useForm, useFormState } from "react-hook-form"
import * as yup from "yup"

type CommentFormData = {
  content: string
}

const useValidationSchema = () => {
  return yup.object().shape({
    content: yup.string().required("Hãy nhập gì đó!"),
  })
}

function FormActions() {
  const { isSubmitting, isValid } = useFormState()

  return (
    <Button type="submit" disabled={isSubmitting || !isValid}>
      Bình luận
    </Button>
  )
}

interface ICommentFormProps {
  postId: string | number
  refresh: () => void
}

export default function CommentForm(props: ICommentFormProps) {
  const { postId, refresh } = props
  const validationSchema = useValidationSchema()

  const addComment = useAddCommentPostService()

  const methods = useForm<CommentFormData>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      content: "",
    },
  })

  const { handleSubmit, control, reset } = methods

  const onSubmit = async ({ content }: CommentFormData) => {
    const { status } = await addComment({
      content,
      id: postId,
    })

    if (status === HTTP_CODES_ENUM.NO_CONTENT) {
      reset({
        content: "",
      })
      refresh()
    }
  }

  return (
    <FormProvider {...methods}>
      <form className="mb-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="py-2 mb-4">
          <FormField
            control={control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Comment của bạn</FormLabel>
                <FormControl>
                  <Textarea
                    rows={6}
                    placeholder="Thêm bình luận..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormActions />
      </form>
    </FormProvider>
  )
}
