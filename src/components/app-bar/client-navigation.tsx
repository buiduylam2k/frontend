import { useTranslation } from "@/services/i18n/client";
import Link from "../link";
import { Button } from "../ui/button";

export default function ClientNavigation() {
  const { t } = useTranslation("common");

  return (
    <div className="grow hidden md:flex px-6 gap-5">
      <Button variant={"ghost"} asChild className="text-base font-semibold">
        <Link href={"/"}>{t("common:navigation.home")}</Link>
      </Button>
      <Button variant={"ghost"} asChild className="text-base">
        <Link href={"/blog"}>{t("common:navigation.blog")}</Link>
      </Button>
      <Button variant={"ghost"} asChild className="text-base">
        <Link href={"/blog"}>{t("common:navigation.blog")}</Link>
      </Button>
      <Button variant={"ghost"} asChild className="text-base">
        <Link href={"/post"}>{t("common:navigation.post")}</Link>
      </Button>
      <Button variant={"ghost"} asChild className="text-base">
        <Link href={"/contact"}>{t("common:navigation.contact")}</Link>
      </Button>
    </div>
  );
}
