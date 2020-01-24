<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">Example Component</div>

                    <div class="card-body">
                        I'm an example component. {{teststate}} {{words}}
                    </div>
                    <button type="button" class="btn btn-primary" name="button" @click="test">test</button>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        mounted() {
        },
        methods:{
          test(){
            this.$store.state.count++;
          }
        },
        computed:{
          teststate(){
            return this.$store.state.count
          },
          words(){
            return this.$store.state.words;
          }
        }

    }
</script>
