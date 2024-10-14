import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'

export const useUserStore = defineStore('user', () => {
  const token = ref(null)
  const router = useRouter()

  const logout = (redirect = '/') => {
    token.value = undefined
    router.replace({ path: '/login', query: { redirect } })
  }

  return {
    token,
    logout
  }
},
{
  persist: true
})
