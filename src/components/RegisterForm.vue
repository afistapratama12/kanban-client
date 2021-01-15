<template>
    <!-- REGISTER FORM -->
    <div class="container-form-register" >
        <form class="form-regist" style="border: 1px; border-radius:10px">
          <h3 style="text-align : center">KANBAN Register</h3>
            <div class="mb-3">
                <label class="form-label">Full Name : </label>
                <input type="text" class="form-control" v-model="regist.fullname" id="fullname-regis">
            </div>
            <div class="mb-3">
                <p style="color: red;" > {{errorRegist}}</p>
              <label class="form-label">Email :</label>
              <input type="email" class="form-control" id="email-regis" v-model="regist.email" aria-describedby="emailHelp">
              <div id="emailHelp" class="form-text">
                <small>We'll never share your email with anyone else.</small>
              </div>
            </div>
            <div class="mb-3">
              <label class="form-label">Password :</label>
              <input type="password" class="form-control" v-model="regist.password" id="password-regis">
            </div>
            <br>
            <div style="text-align : center">
            <button type="submit" class="btn btn-primary" @click="register()">Register</button>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    name: 'RegisterForm',
    props: ['errorRegist'],
    data(){
        return{
            regist:{
                email: '',
                password: '',
                fullname: ''
            }
        }
    },

    methods:{
        register(){
            this.$emit('register', this.regist)
        }
    }
}
</script>

<style>

.container-form-register {
    height: 42vw;
    display: flex;
    flex-direction: row;
    justify-content: center;
    font-weight: bold;
}

.container-form-register small {
  font-weight: normal;
}

.container-form-register .form-regist{
    align-self: center;
}
</style>