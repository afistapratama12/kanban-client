<template>
    <!-- LOGIN FORM -->
    <div class="container-form-login" >
        <form class="form-login" >
          <h3 style="text-align : center">KANBAN Log In</h3>
            <div class="mb-3">
                <p style="color: red;" > {{error}}</p>
              <label for="exampleInputEmail1" class="form-label">Email :</label>
              <input type="email" class="form-control" v-model="user.email" id="email-login" aria-describedby="emailHelp">
              <div id="emailHelp" class="form-text">
                <small>We'll never share your email with anyone else.</small>
                </div>
            </div>
            <div class="mb-3">
              <label for="exampleInputPassword1" class="form-label">Password :</label>
              <input type="password" class="form-control" v-model="user.password" id="password-login">
            </div>
            <br>
            <div style="text-align : center">
            <button type="submit" class="btn btn-primary" @click="login()">Log In</button>
            <g-signin-button :params="googleSignInParams" @success="onSignInSuccess" @error=" onSignInError" class="mt-2" >
                <button type="submit" class="btn btn-primary" >Login with Google</button>
            </g-signin-button>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    name: 'LoginForm',
    props: ['error'],
    data(){
        return{
            user:{
                email: '',
                password: ''
            },
            googleSignInParams: {
                client_id: '581937380718-0g85ib5qrlv05aued5gb3ote32khpfpo.apps.googleusercontent.com'
            }
            
        }
    },
    methods:{
        login(){
            this.$emit('login', this.user)
            this.$emit('auth')
        }, 
        onSignInSuccess(googleUser){
            this.$emit('success', googleUser)
        },
        onSignInError(googleUser){
            this.$emit('error', googleUser)
        }
    }
}
</script>

<style>
.container-form-login{
    height: 42vw;
    display: flex;
    flex-direction: row;
    justify-content: center;
    font-weight: bold;
    
}

.container-form-login small{
  font-weight: normal;
}

.container-form-login .form-login{
    align-self: center;
}
</style>