<template>
    <div style="height: 625px; width: 1300px; background-image: url('https://www.wallpaperflare.com/static/252/622/423/line-background-dark-compound-wallpaper.jpg'); background-repeat: no-repeat;">
        <headerPage />
        <div class="row"  >
            <div class="col-5 offset-6" id="words">
                <h3>Find help for your difficulties.</h3>
                <h4>Say Yes to Code <i class="fas fa-heart" style="color: red"></i></h4>
                <button class="btn" id="getstart">Get Started <i class="fas fa-arrow-right" style="font-weight: bold; font-size: 15px;"></i></button>
            </div>
        </div>
    </div>
</template>

<script>
import headerPage from '@/components/header.vue'

export default {
    name:'landng',
    components:{
        headerPage
    },
    created(){
        if(localStorage.token){
            this.$router.push('/home')
        }
    }
}
</script>

<style scoped>
    #words{
        color: lightskyblue;
        margin-top: 20%
    }

    #getstart{
        color: black;
        background-color: orange;
        font-weight: bold;
    }
</style>
