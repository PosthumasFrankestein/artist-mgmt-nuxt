<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <nuxt-link to="/" class="navbar-brand" :class="{ active: $route == '/' }">Home</nuxt-link>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <nuxt-link to="/register" class="nav-link" :class="{ active: $route == '/register' }" aria-current="page"
                href="#">Register</nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link to="/login" class="nav-link" :class="{ active: $route == '/login' }">Login</nuxt-link>
            </li>
            <li class="nav-item">
              <button class="nav-link" tabindex="-1" @click="logout">Logout</button>
            </li>
          </ul>
          <form class="d-flex">
            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
            <button class="btn btn-outline-success" type="submit">Search</button>
          </form>
        </div>
      </div>
    </nav>

    <!-- <h1>{{ loginstatus }}</h1> -->
  </div>
</template>
    
<script setup>
import { userDataStore } from '~/store/userData'
const store = userDataStore();
const logout = async () => {
  useApi('logout').then(() => {
    store.token = null
    navigateTo('/')
  })
}

</script>
    
<style>
.nuxt-link-active {
  font-size: large !important;
  font-weight: bold !important;
  color: white !important;
}
</style>