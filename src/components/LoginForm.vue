<template>
  <div class="hero-body bg-img img-responsive">
    <div class="container">
      <div class="columns is-centered ">
        <div class="column is-5-tablet is-4-desktop is-3-widescreen">
          <form class="box">
            <div class="mb-2">
              <h1>Login</h1>
            </div>
            <div class="field">
              <label for="" class="label">Email</label>
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
              <label for="" class="label">Password</label>
              <div class="control has-icons-left">
                <input
                  type="password" class="input" placeholder="password" v-model="password"
                />
                <span class="icon is-small is-left">
                  <i class="fa fa-lock"></i>
                </span>
              </div>
            </div>
            <div class="has-text-centered">
              <h4>
              <a href="#" @click.prevent="getRegister">don't have account?</a>
              </h4>
            </div>
            <div class="mt-2 has-text-centered">
              <button class="button is-success" @click.prevent="login">
                Login
              </button>
                or
              <GoogleLogin :params="params" :onSuccess="onSuccess" :onFailure="onFailure" class="button is-info"><i class="fab fa-google"></i></GoogleLogin>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

import googleLogin from 'vue-google-login'

export default {
  name : 'loginForm',
  props : ['changeStatus', 'checkAcc', 'getTask', 'onFailure'], // testing
  data() {
    return {
      email : '',
      password : '',
      params : {
        UserId :''
      }
    }
  },
  components : {
    googleLogin
  },
  methods : {
    getRegister() {
      this.checkAcc(false)
    },
    login(){
      axios({
        method : 'POST',
        url : 'http://localhost:4400/login',
        data : {
          email : this.email,
          password : this.password
        }
      })
      .then(res => {
        localStorage.setItem('access_token', res.data.access_token)
        this.changeStatus(true)
        this.getTask()
      })
      .catch(err => {

      })
    }
  }
};
</script>

<style scoped>
h1 {
  font-size: 2em;
  text-align: center;
}
</style>