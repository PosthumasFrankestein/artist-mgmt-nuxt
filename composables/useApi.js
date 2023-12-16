
import { userDataStore } from '~/store/userData'
import { useToast } from 'vue-toastification'

const toast = useToast()


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
    toast.error(data.value?.message || error.value.data.message);
    return Promise.reject(error)
  }
  else {
    return Promise.resolve({ data, pending, error, refresh })
  }
}