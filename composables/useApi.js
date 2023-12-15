
import { userDataStore } from '~/store/userData'
import { useToast } from 'vue-toastification'

export async function useApi(
  request,
  options) {

  const store = userDataStore()


  const fetchOpts = options || {}

  fetchOpts.headers = fetchOpts.headers || {}

  if (store?.token) {
    fetchOpts.headers = fetchOpts.headers || {}
    fetchOpts.headers.Authorization = `Bearer ${store.token}`
  }


  const { data, pending, error, refresh } = await useFetch(request, {
    baseURL: 'http://127.0.0.1:8000/api/',
    ...fetchOpts,
  })

  if (error.value || !data.value?.status) {
    const toast = useToast()
    toast.error(data.value?.message || error.value?.message || 'Something is wrong');
    return Promise.reject(data || error.value?.message)
  }
  else {
    return Promise.resolve({ data, pending, error, refresh })
  }
}