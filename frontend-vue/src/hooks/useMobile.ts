import { useMediaQuery } from "@vueuse/core"

export const useMobile = () => {
  const isMobile = useMediaQuery("(max-width: 768px)")
  return { isMobile }
}
