<template>
    <div>
        <div v-if="!store.token">
            <h1 style="font-size: 3rem; color: #333; text-align: center;">THIS IS HOME!!!</h1>
            <h2 style="font-size: 2rem; color: #666; text-align: center;">Please register, you are not registered yet.</h2>
        </div>
        <div v-else-if="store.userData">
            <h1 style="font-size: 3rem; color: #333; text-align: center;">
                Hello user {{ store.userData?.fname }}. You will be redirected in {{ countDown }} sec.
            </h1>
        </div>
    </div>
</template>
  
<script setup>
import { userDataStore } from '~/store/userData'
const store = userDataStore();
let countDown = 5;

if (store.token) {
    setInterval(() => {
        countDown--;
        if (countDown === 0) {
            switch (store.userData?.role) {
                case 'artist':
                    navigateTo('/songs')
                    break;
                case 'artistmanager':
                    navigateTo('/artist')
                    break;
                case 'admin':
                    navigateTo("/userdash");
                    break;
                default:
                    navigateTo('/login')
            }
        }
    }, 1000);
}
</script>
  
<style scoped>
h1 {
    font-size: 3rem;
    color: #333;
    text-align: center;
}

h2 {
    font-size: 2rem;
    color: #666;
    text-align: center;
}

div {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    flex-direction: column;
}
</style>
  