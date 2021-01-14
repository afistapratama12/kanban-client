<template>
    <div>
  <login 
  v-if = "page === 'loginPage'"
  @requestLogin = "login"
  @requestChangePage = "changePage"
  ></login>

  <register
  v-if = "page === 'registerPage'"
  @requestCreate = "register"
  @requestChangePage = "changePage"
  ></register>

  <mainPage
  v-if = "page === 'mainPage'"
  @requestLogout = "logout"
  @fetchTask = "fetchTask"
  :list = "tasks"
  @requestEdit = "edit"
  @requestCreate = "add"
  @requestDelete = "destroy"
  ></mainPage>
</div>
</template>

<script>
import axios from 'axios'
import loginForm from './components/LoginForm'
import registerForm from './components/RegisterForm'
import main from './components/Main'

export default {
    name : 'App',
    data() {
        return {
  
        };
    },
    components : {
      loginForm,
      registerForm,
      main
    },
};
</script>

<style scoped>
</style>