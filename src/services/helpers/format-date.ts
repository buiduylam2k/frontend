import { format, FormatOptions } from "date-fns"
import vi from "date-fns/locale/vi"

//https://date-fns.org/v3.6.0/docs/format
function formatDate(
  date?: string | number | Date,
  formatStr?: string,
  options?: FormatOptions | undefined
): string {
  return format(date || new Date(), (formatStr = EnumFormatDate.EEE_d_MMM_y), {
    ...options,
    //@ts-expect-error
    locale: vi,
  })
}

export enum EnumFormatDate {
  EEE_d_MMM_y = "EEE, d MMM y",
}

export default formatDate
