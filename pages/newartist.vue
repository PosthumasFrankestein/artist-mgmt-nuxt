<template>
    <div class="text-center p-5">
        <div class="flex justify-content-center">
            <form @submit.prevent="handleRegister" class="mx-auto border-2 border-black rounded-lg w-96 p-8 bg-white">
                <h1 class="text-xl font-bold mb-3">Add New Artist</h1>
                <!-- <label v-if="error_message" class="text-red-500">{{ error_message }}</label> -->

                <div class="mb-3">
                    <input type="text" v-model="fname" class="w-full p-2 border border-gray-300 rounded"
                        placeholder="First name" required />
                </div>
                <div class="mb-3">
                    <input type="text" v-model="lname" class="w-full p-2 border border-gray-300 rounded"
                        placeholder="Last name" required />
                </div>
                <div class="mb-3">
                    <input type="email" v-model="email" class="w-full p-2 border border-gray-300 rounded"
                        placeholder="name@example.com" required autocomplete="off" />
                </div>
                <div class="mb-3">
                    <input type="number" v-model="phone" class="w-full p-2 border border-gray-300 rounded"
                        placeholder="Phone No." required />
                </div>
                <div class="mb-3">
                    <label for="date_of_birth" class="block text-sm font-medium text-gray-700">Date of Birth</label>
                    <input type="date" v-model="date_of_birth" id="date_of_birth"
                        class="w-full p-2 border border-gray-300 rounded" :max="getCurrentDate()" required />
                </div>
                <div class="mb-3">
                    <label for="gender" class="block text-sm font-medium text-gray-700">Gender</label>
                    <select v-model="gender" id="gender" class="w-full p-2 border border-gray-300 rounded" required>
                        <option value="">Select Gender</option>
                        <option value="m">Male</option>
                        <option value="f">Female</option>
                        <option value="o">Other</option>
                    </select>
                </div>
                <div class="mb-3">
                    <input type="text" v-model="address" class="w-full p-2 border border-gray-300 rounded"
                        placeholder="Address" required />
                </div>
                <div class="mb-3">
                    <input type="password" v-model="password" class="w-full p-2 border border-gray-300 rounded"
                        placeholder="Password" required />
                </div>
                <div class="mb-3">
                    <input type="password" v-model="password_confirmation" class="w-full p-2 border border-gray-300 rounded"
                        placeholder="Confirm Password" required />
                </div>
                <button class="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700" type="submit">Add New
                    Artist</button>
            </form>
        </div>
    </div>
</template>
    
<script setup>
import { useToast } from 'vue-toastification'
import { userDataStore } from '~/store/userData';
const store = userDataStore();
const toast = useToast()
const email = ref('')
const fname = ref('')
const lname = ref('')
const phone = ref('')
const gender = ref('')
const date_of_birth = ref('')
const password = ref('')
const address = ref('')
const password_confirmation = ref('')
const error_message = ref(null)

//Allow only artist manager
if (store.userData.role != "artistmanager") {
    navigateTo('/')
}

const getCurrentDate = () => {
    const today = new Date()
    const year = today.getFullYear()
    const month = today.getMonth() + 1 // months are 0-indexed
    const day = today.getDate()

    return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`
}

const handleRegister = async () => {
    const submit_data = {
        fname: fname.value,
        lname: lname.value,
        email: email.value,
        phone: phone.value,
        gender: gender.value,
        date_of_birth: date_of_birth.value,
        password: password.value,
        address: address.value,
        password_confirmation: password_confirmation.value,
        role: 'artist',
        man_id: store.userData.id
    }

    await useApi(`register`, {
        method: 'POST',
        body: submit_data,
    })
        .then(response => {
            error_message.value = ''
            console.log(response)
            toast.success('Great Success!!')
            navigateTo('/artist')
        })
        .catch(err => {
            console.log(err)
            error_message.value = err.message
            toast.error('Something went wrong')
        })
}
</script>
    
<style></style>
    