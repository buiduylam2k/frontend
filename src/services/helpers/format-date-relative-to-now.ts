import vi from "date-fns/locale/vi"

import { formatRelative } from "date-fns"
// https://date-fns.org/docs/I18n-Contribution-Guide#formatrelative
// https://github.com/date-fns/date-fns/blob/master/src/locale/en-US/_lib/formatRelative/index.js
// https://github.com/date-fns/date-fns/issues/1218
// https://stackoverflow.com/questions/47244216/how-to-customize-date-fnss-formatrelative
const locale = {
  ...vi,
  // formatRelative: (token: string) => formatRelativeLocale[token],
}

function formatDateRelativeToNow(date?: Date) {
  const now = new Date()
  //@ts-expect-error
  return formatRelative(date || now, now, { locale })
}

export default formatDateRelativeToNow
