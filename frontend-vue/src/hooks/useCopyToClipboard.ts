import { ref } from "vue"

export const useCopyToClipboard = () => {
  const copiedText = ref<string | null>(null)

  const copyToClipboard = async (text: string) => {
    if (!navigator?.clipboard) {
      console.warn("Clipboard not supported")
      return false
    }

    try {
      await navigator.clipboard.writeText(text)
      copiedText.value = text
      return true
    } catch (error) {
      console.warn("Copy failed", error)
      copiedText.value = null
      return false
    }
  }

  return { copiedText, copyToClipboard }
}
