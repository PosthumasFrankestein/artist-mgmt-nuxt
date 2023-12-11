<template>
    <div class="text-center p-5">
        <div class="flex justify-content-center">
            <form @submit.prevent="handleRegister" class="mx-auto border-2 border-black rounded-lg w-96 p-8 bg-white">
                <h1 class="text-xl font-bold mb-3">Please Register</h1>
                <label v-if="error_message" class="text-red-500">{{ error_message }}</label>

                <div class="mb-3">
                    <input type="text" v-model="name" class="w-full p-2 border border-gray-300 rounded"
                        placeholder="Full name" />
                </div>
                <div class="mb-3">
                    <input type="email" v-model="email" class="w-full p-2 border border-gray-300 rounded"
                        placeholder="name@example.com" />
                </div>
                <div class="mb-3">
                    <input type="password" v-model="password" class="w-full p-2 border border-gray-300 rounded"
                        placeholder="Password" />
                </div>
                <div class="mb-3">
                    <input type="password" v-model="password_confirmation" class="w-full p-2 border border-gray-300 rounded"
                        placeholder="Confirm Password" />
                </div>
                <div class="mb-3 flex items-center">
                    <input type="checkbox" class="mr-2" v-model="rememberMe" />
                    <label>Remember me</label>
                </div>
                <button class="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700" type="submit">
                    Register
                </button>
                <p class="mt-5 mb-3 text-gray-600">© 2017–2021</p>
            </form>
        </div>
    </div>
</template>
  
  

<script setup>
import { useToast } from 'vue-toastification'
const toast = useToast()
const email = ref('')
const name = ref('')
const password = ref('')
const password_confirmation = ref('')
const error_message = ref(null)

const handleRegister = async () => {
    const submit_data = {
        name: name.value,
        email: email.value,
        password: password.value,
        password_confirmation: password_confirmation.value,
    }


    await useApi(`register`, {
        method: 'POST',
        body: submit_data,
    }).then(response => {
        error_message.value = '';
        console.log(response);
        toast.success(
            'Great Success!!');
        navigateTo('/login');
    })
        .catch(err => {
            console.log(err);
            error_message.value = err.message;
            toast.error(
                'Something went wrong',
            )
        });
}


// console.log('completed request', request);

</script>

<style></style>