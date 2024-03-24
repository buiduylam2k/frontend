"use client";
import useAuth from "@/services/auth/use-auth";
import { useTranslation } from "@/services/i18n/client";
import Link from "@/components/link";
import { RoleEnum } from "@/services/api/types/role";

import MenuUser from "./menu-user";
import AdminNavigation from "./admin-navigation";
import ClientNavigation from "./client-navigation";

function ResponsiveAppBar() {
  const { t } = useTranslation("common");
  const { user } = useAuth();

  return (
    <div className="bg-primary fixed z-50 w-full top-0">
      <div className="px-10 py-2 flex items-center justify-between">
        <Link href="/">
          <span className="text-3xl font-semibold md:flex">
            {t("common:app-name")}
          </span>
        </Link>

        <div className="flex md:hidden grow"></div>

        {!!user?.role && [RoleEnum.ADMIN].includes(user?.role?.id) ? (
          <AdminNavigation />
        ) : (
          <ClientNavigation />
        )}

        <MenuUser />
      </div>
    </div>
  );
}
export default ResponsiveAppBar;
