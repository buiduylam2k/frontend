import { useTranslation } from "@/services/i18n/client";
import Link from "../link";

export default function AdminNavigation() {
  const { t } = useTranslation("common");

  return (
    <div className="grow sm:hidden md:flex">
      <Link href={"/"}>{t("common:navigation.home")}</Link>
      <Link href={"/admin-panel/users"}>{t("common:navigation.users")}</Link>
    </div>
  );
}
