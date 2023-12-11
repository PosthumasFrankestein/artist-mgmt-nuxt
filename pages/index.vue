<template>
    <div>
        <div v-if="!store.token">
            <h1>THIS IS HOME!!!</h1>
            <h2>Please register, you are not registered yet.</h2>
        </div>
        <div v-else-if="store.userData">
            Hello user {{ store.userData?.name }} your email is {{ store.userData?.email }}. <br>
            Your account was created at {{ store.userData?.created_at }} and recently updated at {{
                store.userData?.updated_at }}.
        </div>
    </div>
</template>

<script setup>
import { userDataStore } from '~/store/userData'
const store = userDataStore();

</script>