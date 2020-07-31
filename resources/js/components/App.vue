<template>
    <div class="container">
        <div class="row">

<appinstance :key="key" :activeobszar="$store.state.activeobszar" :instanceid="1" v-if="render"></appinstance>
<appinstance :key="key2" :activeobszar="$store.state.activeobszar2" :instanceid="2" v-if="render2"></appinstance>

<!-- <appinstance :activeobszar="$store.state.activeobszar2"></appinstance> -->
</div>


</div>
</template>

<script>
export default {
    data(){
        return {
            key:0,
            key2:1,
            render:true,
            render2:true
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

