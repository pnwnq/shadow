// 用户角色定义
export type UserRole =
  | "super_admin" // 超级管理员
  | "admin" // 管理员
  | "finance_manager" // 财务管理员
  | "lab_member" // 实验室成员
  | "guest" // 访客

// 权限定义
export type Permission =
  // 首页权限
  | "home_view"
  | "home_analytics"
  // 项目管理权限
  | "projects_view"
  | "projects_create"
  | "projects_edit"
  | "projects_delete"
  | "projects_manage_members"
  // 物品管理权限
  | "inventory_view"
  | "inventory_request"
  | "inventory_add"
  | "inventory_edit"
  | "inventory_delete"
  | "inventory_approve"
  // 财务管理权限
  | "finance_view"
  | "finance_request"
  | "finance_approve"
  | "finance_manage"
  | "finance_report" // 财务报表
  | "finance_budget" // 预算管理
  | "finance_audit" // 财务审计
  // 竞赛管理权限
  | "competitions_view"
  | "competitions_register"
  | "competitions_manage"
  // 文档管理权限
  | "documents_view"
  | "documents_upload"
  | "documents_edit"
  | "documents_delete"
  // 社区论坛权限
  | "community_view"
  | "community_post"
  | "community_comment"
  | "community_moderate"
  | "community_chat" // 实时聊天
  | "community_members" // 成员目录
  // 学习路径权限
  | "learning_view"
  | "learning_create"
  | "learning_edit"
  | "learning_delete"
  // 用户管理权限
  | "users_view"
  | "users_edit"
  | "users_delete"
  // 系统管理权限
  | "system_settings"
  | "system_logs"
  | "roles_manage"
  // 公共访问权限
  | "public"

// 模块权限组
export type PermissionModule =
  | "all" // 所有权限
  | "home" // 首页模块
  | "projects" // 项目管理模块
  | "inventory" // 物品管理模块
  | "finance" // 财务管理模块
  | "finance_management" // 财务管理分类
  | "finance_reporting" // 财务报表分类
  | "competitions" // 竞赛管理模块
  | "documents" // 文档管理模块
  | "community" // 社区论坛模块
  | "learning" // 学习路径模块
  | "users" // 用户管理模块
  | "system" // 系统管理模块
  | "public" // 公共访问模块

// 角色权限映射
export const rolePermissions: Record<UserRole, Array<PermissionModule | Permission>> = {
  super_admin: ["all"],
  admin: [
    "home",
    "projects",
    "inventory",
    "finance",
    "finance_management",
    "finance_reporting",
    "competitions",
    "documents",
    "community",
    "community_chat",
    "community_members",
    "learning",
    "users",
  ],
  finance_manager: [
    "home",
    "finance",
    "finance_management",
    "finance_reporting",
    "projects_view",
    "competitions_view",
    "documents_view",
    "community",
    "community_chat",
    "community_members",
    "learning_view",
  ],
  lab_member: [
    "home",
    "projects_view",
    "inventory_request",
    "finance_request",
    "competitions_view",
    "documents_view",
    "community",
    "community_chat",
    "community_members",
    "learning_view",
  ],
  guest: ["public"],
}

// 模块包含的权限
export const modulePermissions: Record<PermissionModule, Permission[]> = {
  all: [] as Permission[], // 特殊情况，表示所有权限
  home: ["home_view", "home_analytics"],
  projects: ["projects_view", "projects_create", "projects_edit", "projects_delete", "projects_manage_members"],
  inventory: [
    "inventory_view",
    "inventory_request",
    "inventory_add",
    "inventory_edit",
    "inventory_delete",
    "inventory_approve",
  ],
  finance: [
    "finance_view",
    "finance_request",
    "finance_approve",
    "finance_manage",
    "finance_report",
    "finance_budget",
    "finance_audit",
  ],
  finance_management: ["finance_approve", "finance_manage", "finance_budget"],
  finance_reporting: ["finance_report", "finance_audit"],
  competitions: ["competitions_view", "competitions_register", "competitions_manage"],
  documents: ["documents_view", "documents_upload", "documents_edit", "documents_delete"],
  community: [
    "community_view",
    "community_post",
    "community_comment",
    "community_moderate",
    "community_chat",
    "community_members",
  ],
  learning: ["learning_view", "learning_create", "learning_edit", "learning_delete"],
  users: ["users_view", "users_edit", "users_delete"],
  system: ["system_settings", "system_logs", "roles_manage"],
  public: ["public"],
}

// 检查用户是否有特定权限
export function hasPermission(userRole: UserRole, requiredPermission: Permission | PermissionModule): boolean {
  // 获取用户角色的权限列表
  const permissions = rolePermissions[userRole]

  // 如果用户有 "all" 权限，直接返回 true
  if (permissions.includes("all")) {
    return true
  }

  // 直接检查是否有该权限或模块
  if (permissions.includes(requiredPermission)) {
    return true
  }

  // 如果是检查具体权限，还需要检查用户是否有包含该权限的模块权限
  if (Object.keys(modulePermissions).includes(requiredPermission as PermissionModule)) {
    // 这是一个模块权限，已经在上面检查过了
    return false
  } else {
    // 这是一个具体权限，检查用户是否有包含该权限的模块
    for (const permission of permissions) {
      // 只检查模块权限
      if (Object.keys(modulePermissions).includes(permission as PermissionModule)) {
        const modulePerms = modulePermissions[permission as PermissionModule]
        if (modulePerms.includes(requiredPermission as Permission)) {
          return true
        }
      }
    }
  }

  return false
}

// 获取当前用户角色（从localStorage获取，如果没有则返回默认角色）
export function getCurrentUserRole(): UserRole {
  // 从localStorage获取当前角色
  if (typeof window !== "undefined") {
    const savedRole = localStorage.getItem("currentUserRole") as UserRole
    if (savedRole && Object.keys(rolePermissions).includes(savedRole)) {
      return savedRole
    }
  }

  // 默认角色
  return "lab_member"
}

// 检查当前用户是否有特定权限
export function currentUserHasPermission(requiredPermission: Permission | PermissionModule): boolean {
  const userRole = getCurrentUserRole()
  return hasPermission(userRole, requiredPermission)
}

// 获取角色名称
export function getRoleName(role: UserRole): string {
  const roleNames: Record<UserRole, string> = {
    super_admin: "超级管理员",
    admin: "管理员",
    finance_manager: "财务管理员",
    lab_member: "实验室成员",
    guest: "访客",
  }

  return roleNames[role] || role
}

// 获取权限名称
export function getPermissionName(permission: Permission | PermissionModule): string {
  const permissionNames: Record<string, string> = {
    // 模块
    all: "所有权限",
    home: "首页",
    projects: "项目管理",
    inventory: "物品管理",
    finance: "财务管理",
    finance_management: "财务管理分类",
    finance_reporting: "财务报表分类",
    competitions: "竞赛管理",
    documents: "文档管理",
    community: "社区论坛",
    learning: "学习路径",
    users: "用户管理",
    system: "系统管理",
    public: "公共访问",

    // 具体权限
    home_view: "查看首页",
    home_analytics: "查看详细分析",

    projects_view: "查看项目",
    projects_create: "创建项目",
    projects_edit: "编辑项目",
    projects_delete: "删除项目",
    projects_manage_members: "管理项目成员",

    inventory_view: "查看物品",
    inventory_request: "申请借用",
    inventory_add: "添加物品",
    inventory_edit: "编辑物品",
    inventory_delete: "删除物品",
    inventory_approve: "审批借用",

    finance_view: "查看财务",
    finance_request: "申请报销/采购",
    finance_approve: "审批财务申请",
    finance_manage: "管理预算",
    finance_report: "财务报表",
    finance_budget: "预算管理",
    finance_audit: "财务审计",

    competitions_view: "查看竞赛",
    competitions_register: "报名竞赛",
    competitions_manage: "管理竞赛",

    documents_view: "查看文档",
    documents_upload: "上传文档",
    documents_edit: "编辑文档",
    documents_delete: "删除文档",

    community_view: "查看社区",
    community_post: "发布内容",
    community_comment: "评论",
    community_moderate: "内容管理",
    community_chat: "实时聊天",
    community_members: "成员目录",

    learning_view: "查看学习路径",
    learning_create: "创建学习路径",
    learning_edit: "编辑学习路径",
    learning_delete: "删除学习路径",

    users_view: "查看用户",
    users_edit: "编辑用户",
    users_delete: "删除用户",

    system_settings: "系统设置",
    system_logs: "系统日志",
    roles_manage: "角色管理",
  }

  return permissionNames[permission] || permission
}
