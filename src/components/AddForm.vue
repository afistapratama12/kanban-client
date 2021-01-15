<template>
    <!-- ADD FORM TASK -->
    <div class="container-add" >
        <form class="form-add" style="border : 1px">
            <h3 style="text-align : center">Add New Task</h3>
            <p style="color: red;" > {{errAdd}}</p>
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">Title :</label>
              <input type="text" class="form-control" v-model="task.title" id="title" aria-describedby="emailHelp">
            </div>
            <div class="mb-3">
              <label for="exampleInputPassword1" class="form-label">Description :</label>
              <input type="text" class="form-control" v-model="task.description" id="description">
            </div>
            <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Category :</label>
                <select class="form-select" aria-label="Default select example" v-model="task.category" id="category">
                    <option value="backlog">backlog</option>
                    <option value="todo">todo</option>
                    <option value="doing">doing</option>
                    <option value="done">done</option>
                  </select>
            </div>
            <br>
            <div style="text-align : center">
            <button type="submit" class="btn btn-info" @click=" addTodo()">Add Task</button>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    name: 'AddForm',
    props: ['errAdd'],
    data(){
        return {
            task:{
                title: '',
                description: '',
                category: ''
            }
        }
    },
    methods:{
        addTodo(){
            this.$emit('addTodo', this.task)
        }
    }
}
</script>

<style>

.container-add{
    height: 100vh;
    display: flex;
    flex-direction: row;
    justify-content: center;
    font-weight: bold;   
    
}
.container-add .form-add{
    align-self: center;
}

</style>