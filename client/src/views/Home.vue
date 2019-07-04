<template>
  <div class="home">
    <navbar />
    <div class="row" style="margin-top: 60px">
      <div class="col-7" id="allpost">
        <h4 style="text-align:center">All Questions</h4><hr>
        <cardQuestion v-for="question in allquestion" :key="question._id" :question="question" />
      </div>
      <div class="col-4" id="mypost">
        <h4 style="text-align:center">My Questions</h4><hr>
        <button class="btn" style="margin-left: 35%;" id="add" data-toggle="modal" data-target="#addModal" > <i class="fas fa-plus"></i> New Question</button><br>
        <formAddQuestion /><br>
        <cardMyQuestion v-for="question in myquestion" :key="question._id" :question="question" />
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapState } from 'vuex'
import navbar from '@/components/navbar.vue'
import cardQuestion from '@/components/cardQuestion.vue'
import formAddQuestion from '@/components/formAddQuestion.vue'
import cardMyQuestion from '@/components/cardMyQuestion.vue'

export default {
  name: 'home',
  components: {
    navbar,
    cardQuestion,
    formAddQuestion,
    cardMyQuestion
  },
  computed:{
    ...mapState(['allquestion', 'myquestion'])
  },
  mounted(){
    this.$store.dispatch('getAllQuestion')
    this.$store.dispatch('getMyQuestion')
  }
}
</script>

<style scoped>
  h4{
    font-weight: bold;
    font-size: 25px;
    margin-top: 10px;
  }
  #allpost{
    border: 2px solid black;
    border-radius: 10px;
    margin-left:50px;
    overflow: scroll;
  }
  #mypost{
    border: 2px solid black;
    border-radius: 10px;
    margin-left:10px;
    overflow: scroll;
  }
  #add{
    border: 2px solid blue;
    border-radius: 20px;
    font-size: 12px;
    font-weight: bold
  }
  #add:hover{
    background-color: lightgreen;
    font-weight: bolder;
    border-radius: 20px;
  }

</style>

