import { createRouter, createWebHistory } from "vue-router"
import { isLoggedIn } from "@/hooks/useAuth"

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/login.vue"),
      meta: { requiresGuest: true },
    },
    {
      path: "/signup",
      name: "signup",
      component: () => import("@/views/signup.vue"),
      meta: { requiresGuest: true },
    },
    {
      path: "/recover-password",
      name: "recover-password",
      component: () => import("@/views/recover-password.vue"),
      meta: { requiresGuest: true },
    },
    {
      path: "/reset-password",
      name: "reset-password",
      component: () => import("@/views/reset-password.vue"),
      meta: { requiresGuest: true },
    },
    {
      path: "/",
      component: () => import("@/layouts/Layout.vue"),
      meta: { requiresAuth: true },
      children: [
        {
          path: "",
          name: "home",
          component: () => import("@/views/_layout/index.vue"),
        },
        {
          path: "items",
          name: "items",
          component: () => import("@/views/_layout/items.vue"),
        },
        {
          path: "admin",
          name: "admin",
          component: () => import("@/views/_layout/admin.vue"),
        },
        {
          path: "settings",
          name: "settings",
          component: () => import("@/views/_layout/settings.vue"),
        },
      ],
    },
    {
      path: "/:pathMatch(.*)*",
      name: "not-found",
      component: () => import("@/components/Common/NotFound.vue"),
    },
  ],
})

router.beforeEach((to, from, next) => {
  const loggedIn = isLoggedIn()

  if (to.meta.requiresAuth && !loggedIn) {
    next("/login")
  } else if (to.meta.requiresGuest && loggedIn) {
    next("/")
  } else {
    next()
  }
})

export default router
