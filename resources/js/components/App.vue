<template>
    <div class="container">
        <div class="row">

<appinstance :key="key" :activeobszar="$store.state.activeobszar" v-if="render"></appinstance>
<!-- <appinstance :activeobszar="$store.state.activeobszar2"></appinstance> -->
</div>


</div>
</template>

<script>
export default {
    data(){
        return {
            key:0,
            render:true
        }
    },
    methods:{
        rerender(){
            this.render=false;
            this.render=true;
        }
    }

}
</script>

<style lang="css">
</style>
