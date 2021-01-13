const app = new Vue({
  el : '#app',
  data : {
    halaman : 'login-page',
    server : `http://localhost:4400`,
    user : {
      email : '',
      password : ''
    },
    tasks : [],
    register : {
      email : '',
      password : '',
      fullname : ''
    },
    edit : {
      id : 0,
      title : '',
      description : '',
      category : ''
    },
    addTask : {
      title : '',
      description : '',
      category : ''
    },
  },
  methods : {
    getTask() {
      axios({
        method : 'GET',
        url : this.server + '/tasks',
        headers : {
          access_token : localStorage.access_token
        }
      })
      .then(res => {
          this.tasks = res.data
      })
      .catch(err => {

      })
    },

    auth(){
      if(localStorage.access_token){
        this.getTask()
        this.showPage('menu-page')
      } else {
        this.showPage('login-page')
      }
    },

    showPage(page) {
      this.halaman = page
    },
    

    register() {
      axios({
        method : 'POST',
        url : this.server + '/register',
        data : {
          email : this.register.email,
          password : this.register.password,
          fullname : this.register.fullname
        }
      })
      .then(res => {
        this.showPage('login-page')
        console.log(res.data)
      })
      .catch(err => {
        console.log(err)
      })
    },

    login() {
      axios({
        method : 'POST',
        url : this.server + '/login',
        data : {
          email : this.user.email,
          password : this.user.password
        }
      })
      .then(res =>{
        localStorage.setItem('access_token', res.data.access_token)
        this.auth()
        this.showPage('menu-page')
      })
      .catch(err => {

      })
    },

    createTask() {
      axios({
        method : 'POST',
        url : this.server + '/tasks',
        headers : {
          access_token : localStorage.access_token
        },
        data : {
          title : this.addTask.title,
          description : this.addTask.description,
          category : this.addTask.category,
          CategoryId : 1

        }
      })
      .then(res => {
          this.showPage('menu-page')
          this.getTask()
          this.addTask.title = ''
          this.addTask.description = ''
          this.addTask.category = ''
      })
      .catch(err => {
        
      })

    },

    editTask(id) {
      axios({
        method : 'GET',
        url : this.server + '/tasks' + id,
        headers : {
          access_token : localStorage.access_token
        }
      })
      .then(res => {
          this.edit.id = res.data.id
          this.edit.title = res.data.title
          this.edit.description = res.data.description
          this.edit.category = tes.data.category
          this.showPage('menu-page')
      })
      .catch(err => {
        
      })

    },

    moveCat(id, val) {
      // axios({
      //   method : 'GET',
      //   url : this.server + '/tasks',
      //   headers : {
      //     access_token : localStorage.access_token
      //   }
      // })
      // .then(res => {
      //     this.tasks = res.data
      // })
      // .catch(err => {
        
      // })

    },

    deleteTask(id) {
      axios({
        method : 'DELETE',
        url : this.server + '/tasks' + id,
        headers : {
          access_token : localStorage.access_token
        }
      })
      .then(res => {
          this.getTask()
      })
      .catch(err => {
        
      })

    },

    logout() {
      localStorage.clear()
      this.auth()
    }


  }
})