<template>
     <div class="card-body mb-4"  style="text-align : center ; background-color: aliceblue" >

        <h5 class="card-title">
            {{item.title}}
        </h5>
        <p class="card-text">
            {{item.description}}
        </p>

        <button 
            type="button" 
            class="btn btn-outline-warning btn-sm" 
            @click="patch(item.id, moveLeft)">
            back
        </button>
        <button 
            type="button" 
            class="btn btn-outline-primary btn-sm" 
            @click="getEdit(item.id)">
            Edit
        </button>
        <button 
            type="button" 
            class="btn btn-outline-danger btn-sm" 
            @click="deleteTodo(item.id)">
            Delete
        </button>
        <button 
            type="button" 
            class="btn btn-outline-success btn-sm" 
            @click="patch(item.id, moveRight)">
            next
        </button>
    </div>
</template>

<script>
export default {
    name: 'Card',
    props: ['item'],
    methods:{
        getEdit(item){
            //console.log(item)
            this.$emit('getEdit', item)
        },
        patch(item, str){
            this.$emit('patch', item, str)
        },
        deleteTodo(item){
            this.$emit('deleteTodo', item)
        }
    },
    computed:{
        moveLeft (){
            switch (this.item.category) {
                case 'done':
                    return 'doing'

                case 'doing':
                    return 'todo'

                case 'todo':
                    return 'backlog'
            }
        },

        moveRight(){
            switch (this.item.category) {
                case 'backlog':
                    return 'todo'

                case 'todo':
                    return 'doing'

                case 'doing':
                    return 'done'
            
            }
        }

    }
}
</script>

<style>
</style>