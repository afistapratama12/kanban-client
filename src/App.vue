<template>
    <div>
    <Home
    v-if="halaman == 'isi'"
    :backlog="backlog"
    :todo="todo"
    :doing="doing"
    :done="done"
    @patch="patch"
    @getEdit="getEdit"
    @deleteTodo="deleteTodo"
    :errAuth="errAuth">
    </Home>

    <LoginForm
    v-if="halaman == 'login'"
    @login="login"
    @auth="auth"
    :error="error"
    @success="onSignInSuccess"
    @error="onSignInError">
    </LoginForm>

    <RegisterForm
    v-if="halaman == 'register'"
    @register="register"
    :errorRegist="errorRegist">
    </RegisterForm>

    <NavBar
    v-if="halaman == 'login' || halaman == 'register'|| halaman == 'isi'||halaman == 'add'||halaman == 'edit'" 
    @movePage="movePage"
    @logout="logout"
    :halaman="halaman">
    </NavBar>

    <EditForm
    v-if="halaman == 'edit'"
    :edit="edit"
    @update="update"
    :errEdit="errEdit">
    </EditForm>

    <AddForm
    v-if="halaman == 'add'"
    @addTodo="addTodo"
    :errAdd="errAdd">
    </AddForm>

    </div>
</template>

<script>
import axios from 'axios'
import NavBar from './components/NavBar'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'
import Home from './components/Home'
import EditForm from './components/EditForm'
import AddForm from './components/AddForm'
export default {
    name: 'App',
    data(){
        return {
            halaman: 'login',
            server: 'https://kanban-app-server.herokuapp.com',
            tasks: [],
            edit:{
                id: 0,
                title: '',
                description: '',
                category: ''
            },
            
            error : '',
            errorRegist: '',
            errAuth: '',
            errEdit: '',
            errAdd: ''
        }
    },
    components:{
        NavBar,
        LoginForm,
        RegisterForm,
        Home,
        EditForm,
        AddForm
        
    },
    methods:{
        auth(){
            if(localStorage.access_token){
                this.movePage('isi')
                this.fetchAllTodo()
            }else {
                this.movePage('login')
            }
        },
        movePage(page){
            this.halaman = page
            this.errAuth = ''
            this.errEdit = ''
            this.errAdd = ''
            this.error = ''
            this.errorRegist = ''
        },

        register(regist){
            axios({
                method: 'POST',
                url: `${this.server}/register`,
                data:{
                    email: regist.email,
                    password: regist.password,
                    fullname: regist.fullname
                }
            })
            .then(res =>{
                this.movePage('login');
                // console.log(res.data)
                
            })
            .catch(err =>{
                // console.log(err.res.data)
                let msg = err.res.data
                let temp = []

                for(let i = 0; i < msg.length; i++){

                    if(msg.length > 1){
                        temp.push(msg[i])
                        let str = temp.join(', ')

                        this.errorRegist = str

                    }else if(msg.length <= 1){

                        this.errorRegist = msg[i]
                    }
                }
            })
        },

        login(user){
            axios({
                method: 'post',
                url: `${this.server}/login`,
                data:{
                    email: user.email,
                    password: user.password
                }
            })
            .then(res =>{
                console.log(res.data)
                localStorage.setItem('access_token', res.data.access_token)
                this.movePage('isi')
                this.auth()
            })
            .catch(err =>{
                console.log(err.res)
                this.error = err.res.data.message
            })
        },

        logout(){
            localStorage.clear()
            let auth2 = gapi.auth2.getAuthInstance();
            auth2.signOut().then(function () {
                console.log('User signed out.');
            });
            this.auth()
        },

        
        
         fetchAllTodo(){
            axios({
                method: 'GET',
                url: `${this.server}/tasks`,
                headers:{
                    access_token: localStorage.access_token
                }
            })
            .then(response =>{
                console.log(response.data)
                this.tasks = response.data
            })
            .catch(err =>{
                // console.log(err)
            })
        },

        addTodo(inputTodo){
            axios({
                method: 'POST',
                url: `${this.server}/tasks`,
                data:{
                    title: inputTodo.title,
                    description: inputTodo.description,
                    category: inputTodo.category
                },
                headers:{
                    access_token: localStorage.access_token
                }
            })
            .then(response =>{
                this.movePage('isi')
                this.fetchAllTodo()
            })
            .catch(err =>{
                console.log(err.response.data)
                let msg = err.response.data
                let temp = []
                for(let i = 0; i < msg.length; i++){
                    if(msg.length >1){
                        temp.push(msg[i])
                        let str = temp.join(', ')
                        this.errAdd = str
                    }else if(msg.length <= 1){
                        this.errAdd = msg[i]
                    }
                }
            })
        },

        patch(id, value){
            axios({
                method: 'PATCH',
                url: `${this.server}/tasks/${id}`,
                data:{
                    category: value
                },
                headers:{
                    access_token: localStorage.access_token
                }
            })
            .then(response =>{
                this.fetchAllTodo()
            })
            .catch(err =>{
                console.log(err)
            })
        },

        getEdit(id){
            axios({
                method: 'GET',
                url: `${this.server}/tasks/${id}`,
                headers:{
                    access_token: localStorage.access_token
                }
            })
            .then(response =>{
                console.log(response.data)
                this.edit.id = response.data.id
                this.edit.title = response.data.title,
                this.edit.description = response.data.description,
                this.edit.category = response.data.category
                
                this.movePage('edit')
            })
            .catch(err =>{
                console.log(err.response.data)
                this.errAuth = err.response.data.message
            })
        },

        update(id){
            axios({
                method: 'PUT',
                url: `${this.server}/tasks/${id}`,
                data: {
                    title: this.edit.title,
                    description: this.edit.description,
                    category: this.edit.category
                },
                headers:{
                    access_token: localStorage.access_token
                }
            })
            .then(response =>{
                this.fetchAllTodo()
                this.auth()
            })
            .catch(err =>{
                let msg = err.response.data
                let temp = []
                for(let i = 0; i < msg.length; i++){
                    if(msg.length >1){
                        temp.push(msg[i])
                        let str = temp.join(', ')
                        this.errEdit = str
                    }else if(msg.length <= 1){
                        this.errEdit = msg[i]
                    }
                }
            })
        },

        deleteTodo(id){
            axios({
                method: 'DELETE',
                url: `${this.server}/tasks/${id}`,
                headers:{
                    access_token: localStorage.access_token
                }
            })
            .then(response =>{
                this.fetchAllTodo()
            })
            .catch(err =>{
                console.log(err)
            })
        },

        onSignInSuccess (googleUser) {
            const profile = googleUser.getBasicProfile()
            let id_token = googleUser.getAuthResponse().id_token
            
            //console.log(id_token)
            
            axios({
                method:'POST',
                url: `${this.server}/googleLogin`,
                data:{
                    id_token
                }
            })
            .then(response =>{
                console.log(response.data)
                localStorage.setItem('access_token', response.data.access_token)
                this.movePage('isi')
                this.auth()
            })
            .catch(err =>{
                console.log(err)
            })
        },
        onSignInError (error) {
            console.log('errors google ', error)
        }
    },
    created(){
        this.auth()
    },
    computed: {

        done(){
            return this.tasks.filter(el=> el.category == 'done')
        },
        doing(){
            return this.tasks.filter(el=> el.category == 'doing')
        },
        todo(){
            return this.tasks.filter(el=> el.category == 'todo')
        },
        backlog(){
            return this.tasks.filter(el=> el.category == 'backlog')
        }



    }
}
</script>

<style>
</style>