"use client"

import { RoleEnum } from "@/services/api/types/role"
import withPageRequiredAuth from "@/services/auth/with-page-required-auth"

function AdminPanel() {
  return (
    <div className="max-w-screen-md mx-auto pt-10">
      <h3 className="text-3xl font-semibold tracking-tight">
        Chào mừng tới trang quản trị
      </h3>
    </div>
  )
}

export default withPageRequiredAuth(AdminPanel, { roles: [RoleEnum.ADMIN] })
