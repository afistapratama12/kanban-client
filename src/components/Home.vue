<template>
  <!--  HOME MENU -->
    <div class="containter-main" >
        <div class="row main-data">
          <p style="color: red;" > {{errAuth}}</p>

            <!--backlog-->
            <div class="col-sm-3 Backlog">
              <div class="card mb-3 ">
                <div class="card-body ">
                  <h5 class="card-title" style="font-weight:bold; text-align: center">Backlog</h5>
                  <div class="card kanban-task" style="width: 100% ">
                   <Card v-for="(item, id) in backlog" :key="id"
                   :item="item"
                   @patch="patch" @getEdit="getEdit" @deleteTodo="deleteTodo">
                   </Card>
                  </div><br>
                </div>
              </div>
            </div>

            <!--Todo's taks-->
            <div class="col-sm-3 todo">
              <div class="card mb-3 ">
                <div class="card-body kanban-doing">
                  <h5 class="card-title" style="font-weight:bold; text-align: center">ToDo's</h5>
                  <div class="card kanban-task" style="width: 100%;">
                    <Card v-for="(item, id) in todo" :key="id"
                   :item="item"
                   @patch="patch" @getEdit="getEdit" @deleteTodo="deleteTodo">
                   </Card>
                  </div><br>
                </div>
              </div>
            </div>

            <!--doing tasks-->
            <div class="col-sm-3 doing">
                <div class="card mb-3">
                  <div class="card-body">
                    <h5 class="card-title" style="font-weight:bold; text-align: center" >Doing</h5>
                    <div class="card kanban-task" style="width: 100%;">
                    <Card v-for="(item, id) in doing" :key="id"
                    :item="item"
                    @patch="patch" @getEdit="getEdit" @deleteTodo="deleteTodo">
                    </Card>
                    </div><br>
                  </div>
                </div>
            </div>

            <!--done Task -->
            <div class="col-sm-3 done">
                <div class="card mb-3">
                  <div class="card-body">
                    <h5 class="card-title" style="font-weight:bold; text-align: center;">Done</h5>
                    <div class="card kanban-task" style="width: 100%;">
                    <Card v-for="(item, id) in done" :key="id"
                        :item="item"
                        @patch="patch" @getEdit="getEdit" @deleteTodo="deleteTodo">
                    </Card>
                    </div><br>
                  </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Card from './Card'

export default {
    name: 'Home',
    props: ['backlog', 'todo', 'doing', 'done', 'errAuth'],

    components:{
        Card
    },
    methods:{
        patch(item, str){
            this.$emit('patch', item, str)
        },
        getEdit(item){
            console.log(item)
            this.$emit('getEdit', item)
        },
        deleteTodo(item){
          this.$emit('deleteTodo', item)
        }
    }
}
</script>

<style>
.main-data{
    height: 36nw;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
}

.kanban-task{
    height: 60vh;
    overflow-y: scroll;
}

.done{
    align-self: center;
}
.todo {
    align-self: center;
}
.doing {
    align-self: center;
}
.Backlog {
    align-self: center;
}
</style>