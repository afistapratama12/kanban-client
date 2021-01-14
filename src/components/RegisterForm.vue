<template>
  <div class="hero-body bg-img img-responsive">
    <div class="container">
      <div class="columns is-centered">
        <div class="column is-5-tablet is-4-desktop is-3-widescreen">
          <form class="box">
            <div class="mb-2">
              <h1>Register</h1>
            </div>
            <div class="field">
              <label class="label">Full Name</label>
              <div class="control has-icons-left">
                <input
                  type="text" class="input" placeholder="e.g. John Doe" v-model="fullname"
                />
                <span class="icon is-small is-left">
                  <i class="fas fa-user-secret"></i>
                </span>
              </div>
            </div>
            <div class="field">
              <label class="label">Email</label>
              <div class="control has-icons-left">
                <input
                  type="email" class="input" placeholder="email" v-model="email"
                />
                <span class="icon is-small is-left">
                  <i class="fa fa-envelope"></i>
                </span>
              </div>
            </div>
            <div class="field">
              <label class="label">Password</label>
              <div class="control has-icons-left">
                <input
                  type="password" class="input" placeholder="email" v-model="password"
                />
                <span class="icon is-small is-left">
                  <i class="fa fa-lock"></i>
                </span>
              </div>
            </div>
            <div class="has-text-centered">
              <h4>
                <a href="#" @click.prevent="toLogin">have an account ?</a>
              </h4>
            </div>
            <div class="mt-2 has-text-centered">
              <button class="button is-success" @click.prevent="register">
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name : "registerForm",
  props : ['checkAcc'],
  data() {
    return {
      fullname : '',
      email : '',
      password : ''
    }
  },
  methods : {
    getLogin(){
      this.checkAcc(true)
    },

    register() {
      axios({
        method : 'POST',
        url : 'http://localhost:4400/register',
        data : {
          fullname : this.fullname,
          email : this.email,
          password : this.password
        }
      })
      .then(data => {
        this.checkAcc(true)
      })
      .catch(err =>{
        console.log(err)
      })
    }
  }
};
</script>

<style scoped>
h1 {
  font-weight: 600;
  font-size: 2em;
  text-align: center;
}
</style>