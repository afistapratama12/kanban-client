<template>
    <div class="hero-head">
    <!-- navbar -->
    <nav id="navbar" class="navbar is-fixed-top has-shadow">
      <div class="container">
        <div class="navbar-brand">
        </div>

        <!-- outsession -->
        <div class="navbar-menu" id="navMenu" v-if="!getLogin">
          <div class="navbar-end">
            <div class="navbar-item has-dropdown is-hoverable">
              <a class="navbar-link">Menu</a>
              <div class="navbar-dropdown">
                <a class="navbar-item" @click.prevent="getRegister">Register</a>
                <hr class="navbar-divider" />
                <a class="navbar-item" @click.prevent="getLogin">Login</a>
              </div>
            </div>
          </div>
        </div>

        <!-- insession -->
        <div class="navbar-end" v-if="getLogin">
          <div class="navbar-item">
            <div class="buttons">
              <a class="button is-primary" @click.prevent="logOut">
                <strong>logout</strong>
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <!-- end navbar -->
  </div>
</template>

<script>
export default {
  name : 'navbar',
  props : ['changeStatus', 'getLogin', 'getAccount', 'checkAcc'],
  data() {
    return {
  
    }
  },
  methods : {
    getRegister() {
      this.checkAcc(false)
    },
    getLogin() {
      this.checkAcc(true)
    },

    logOut() {
      localStorage.clear()
      this.changeStatus(false)
    }
  }
};
</script>

<style scoped>
</style>