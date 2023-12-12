<template>
    <div class="text-center p-5">
        <div class="flex justify-center">
            <form @submit.prevent="handleSubmit" class="border-2 border-black rounded-lg w-96 p-8 bg-white">
                <img class="mb-4"
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJgAAACUCAMAAABY3hBoAAAA+VBMVEX/////yhBHTl7+55v/ogAREiQuNUWFhYYAAA7/yQD+5pX+6J//lwD99t/989D+3nf/xg7/qAT+7tv///n+yzRCSVoAIkf/zg0bK0aLdDa3lirNztH4+Pg5P07Y2dsmLT7xyBYbJDjAwcbl5uhiZ3Pu7/AQGzGYm6JXW2YADyozQ1//pTP+++6ztLmqrLKgo6l6foiHipMqNEoAACFxc3wAACczRmkAFz42SV797rnw24Xx0U7wsBnxohT/qj/+x4D/1E7/uQD+vGP+2mj+3bbHoiKnjC6XgjBGRUJZUj7fsxpKRjsAF0VzZTqAbTc1OkJmXTr91aL+sFI9WVuNAAAEkklEQVR4nO2bC3OaShiGBdM9R9SetMlGemAhIAJaL0Bt0/R+OZrUpE2b//9jiu6imLYBVnZlzuw7k8wkI+vj+3377sKstZqQUEq6odmj8WQyGY9sravvG4fIGAeOLEOEBWXfCUfdfUPpmgcjBKGcFoQg8sfGHo3TR1OI5N8q/n9g7wmrN4II/h4Ls0WOvQ/XbD+6h4qgBQZvrF5wt7Hivl/93Gk3jy+Xne6tmAcA07Jc17IsEwCUrjByNI5cXsoYFDO5z/p+EHqeF05h/5lrAQBTpnEj6wXr7oIxlemHW03eHQeyZYGNbdGEE9c0eUuIgNsP7d4vL+nazvMYjS9Zz0m4ELBA+CsVYZua5rqgKGSfG/o0MQKZ7r1poDl9M3ktYD85Q5R0l2VlRLvuWWsyNGLM5ZG+h6Y7zV6pDWgl5WQ8N7XkbUB/mqdtDN8C5AqZZZvpJL/iOuacaPp0TRYwBPNQ4leY95KeYyVdyW63oa39CvLXpeuTGQD9P0XLrtJJsiKz0Ft0XUKGWGWGFpEJ2S+2cx65pM1kRjtuH5JCjgteGLK1TEsK6RSd+F2SZtBnYlmYGFY8KiekmBGL/O/iSiLLKX5tD5rEsvK5ajbuE+DSrC0TEmYRg8TAWQGLd9hSBsJdhhjszHBWIJduaJ/Usvx1CYcYBIjuhszur2oJndLn5QQPbPp0m4Tec8Bo9xOQOZl79b4jUsvSN4xkp4/6tFuE0IJMwr+LwUCf9p5/7CIm3W/4JMVog8jGG0ZIlTb3yMDbAxPQDqCZgMkOWyPximgHMABbMJl2gDj7cV4wAoO0AwiwohJgRSXAikqAFZUAKypmYIMXLwaDwdngiFKGejJY6qUe/1EGUfu8udKr16crHdMKX/7m7dOl3r1/vBvW8FxR6rGUD42GtFKDUlKijwdLtVrvh7twNVdYdeV4M/DOwmQHB0/pK3qEser1Mrk2ZJ+oyc4xWPNzqVyS9IiQ/UfJNWxiv5rlYu1uWZtwKSUbJh0SsAPK/n9IKvlP6WCklq3KglGGmQATYAJMgAkwASbABJgAE2ACTIAJsB3AOktVD6xzOpvP5zMpDxpHsI50cWmqqgq+zHKQ8QPrLK5OIrBUdP01u578wBqXKkh08qQ6jnW+bbgAUP/NsowXWGdxk+IC0VVlwOZpwwA4W1QETPq2DXYyz7CMm2Pf74BdVAXsa0Udky62wa6zQpabYzNza1beHGZ8EH4Bu9Vk6jzr9fwCdnEdbbi+nGZ9Do5r5ewm8Uy9OqzQWhl7RqoZXZxmby947sc6nSdqnqTgDiZJGCxzARdgAkyACTABJsAEmAATYCzBzvI8HuP8RHGmRkC9zLwR4Q4Wk11dfl/kegjL/eGwVMWHw0UkwARY1cHaBOwVqzOKtEcBmZ/qfEd7EPacgH0o2TIC1vpByVUbkpPDpZ5o3hh2S3/aet3+ZXKtT8HuckC9jU+Bx2SNskxLpuTtbgfnhw+bdUVR6srnY+oT8ykdfnzUWlK9vf2x87cNjo6GS8W/2yXoMdawlC9BCAkJCQn9r/RXRVX7u6KqPaioKgv2E61f5qhZLwoVAAAAAElFTkSuQmCC"
                    alt="" width="72" height="57" />
                <h1 class="text-xl font-bold mb-3">Please sign in</h1>

                <div class="mb-3">
                    <input type="email" v-model="email" class="w-full p-2 border border-gray-300 rounded"
                        placeholder="Email address" />
                </div>
                <div class="mb-3">
                    <input type="password" v-model="password" class="w-full p-2 border border-gray-300 rounded"
                        placeholder="Password" />
                </div>

                <div class="mb-3 flex items-center">
                    <input type="checkbox" class="mr-2" v-model="rememberMe" />
                    <label>Remember me</label>
                </div>

                <button class="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700" type="submit">
                    Sign in
                </button>

                <p class="mt-5 mb-3 text-gray-600">© 2017–2021</p>
            </form>
        </div>
    </div>
</template>

<script setup>
import { userDataStore } from '~/store/userData'
import { useToast } from 'vue-toastification'

const email = ref('')
const password = ref('')
const store = userDataStore();
const toast = useToast()


const handleSubmit = async () => {

    let { data } = await useApi('login', {
        method: 'POST',
        body: {

            email: email.value,
            password: password.value,
        }
    });
    if (data?.value) {
        store.token = data.value.token
        store.userData = data.value?.userdata
        console.log(data.value.token)
        toast.success(
            'Logged In Successfully.',
        );
        navigateTo('/')
    } else {
        toast.error(
            'Invalid Login Credentials',
        )


    }
}


</script>

<style></style>