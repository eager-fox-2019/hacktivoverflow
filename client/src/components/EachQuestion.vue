<template>
  <div >
    <b-card  v-if='this.question.creator' >
      <b-card-text>
        <div @click='toCurrentQuestion' class='toQuestion'><h5 >{{question.title}} <i class="fas fa-caret-right"></i></h5></div>
        <div>
          <div class='chip mx-1' style='font-size:12px' v-for='tag in question.tags' :key='tag'>{{tag}}</div>
          </div>
        <p class='text-muted'>Asked by: {{question.creator.name}} || score: {{vote}}  </p>
      </b-card-text>
    </b-card>
  </div>
</template>

<script>

export default {
    props:['question'],
    computed:{
        vote(){
            return this.question.upvotes.length - this.question.downvotes.length
        }
    },
    methods:{
      toCurrentQuestion(){
        this.$router.push(`/question/${this.question._id}`)
      }
    }
};
</script>
<style scoped>
.toQuestion{
  cursor: pointer;
}
.toQuestion :hover{
  text-decoration: underline
}
</style>