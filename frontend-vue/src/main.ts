import { VueQueryPlugin, type VueQueryPluginOptions } from "@tanstack/vue-query"
import { createApp } from "vue"
import App from "./App.vue"
import { OpenAPI } from "./client"
import { vClickOutside } from "./directives/click-outside"
import "./index.css"
import router from "./router"

OpenAPI.BASE = import.meta.env.VITE_API_URL
OpenAPI.TOKEN = async () => {
  return localStorage.getItem("access_token") || ""
}

const vueQueryOptions: VueQueryPluginOptions = {
  queryClientConfig: {
    defaultOptions: {
      queries: {
        retry: false,
        refetchOnWindowFocus: false,
      },
      mutations: {
        onError: (error: any) => {
          if (error?.status && [401, 403].includes(error.status)) {
            localStorage.removeItem("access_token")
            window.location.href = "/login"
          }
        },
      },
    },
  },
}

const app = createApp(App)

app.directive("click-outside", vClickOutside)
app.use(VueQueryPlugin, vueQueryOptions)
app.use(router)

app.mount("#app")
