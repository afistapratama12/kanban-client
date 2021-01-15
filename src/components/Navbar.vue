<template>
    <div class="container-nav" >
        <nav class="navbar navbar-expand-lg navbar-light bg-primary"  >
            <div class="container-fluid">
              <a class="navbar-brand" href="#" style="font-weight:bold">KANBAN APPLICATION 2021</a>
              <button 
                class="navbar-toggler" 
                type="button" 
                data-bs-toggle="collapse" 
                data-bs-target="#navbarNavAltMarkup" 
                aria-controls="navbarNavAltMarkup" 
                aria-expanded="false" 
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>
              <div 
                class="collapse navbar-collapse justify-content-end" 
                id="navbarNavAltMarkup">
                <div class="navbar-nav">
                  <a class="nav-link bg-info" href="#" v-if="halaman == 'login'" v-on:click="movePage('register')" style="font-weight: bold">Register</a>
                  <a class="nav-link bg-info" href="#" v-else-if="halaman == 'register'" v-on:click="movePage('login')" style="font-weight: bold">Login</a>
                  <a class="nav-link bg-success" href="#" v-if="halaman == 'isi'" v-on:click="movePage('add')" style="font-weight: bold">Add</a>
                  <a class="nav-link bg-danger" href="#" v-if="halaman == 'isi'" v-on:click="logout()" style="font-weight: bold">Logout </a>
                  <a class="nav-link bg-info" href="#" v-else-if="halaman == 'add'||halaman == 'edit'" v-on:click="movePage('isi')" style="font-weight: bold">List</a>
                </div>
              </div>
            </div>
          </nav>
    </div>

</template>

<script>
export default {
    name: 'NavBar',
    props: ['halaman'],
    methods:{
        movePage(page){
            this.$emit('movePage', page)
        },
        logout(){
            this.$emit('logout')
        }
    }
}
</script>

<style>
</style>