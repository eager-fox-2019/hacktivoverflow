<template>
  <div @click='toCurrentQuestion'>
    <b-card  v-if='this.question.creator' style="background: gainsboro; color: white; margin-top: 7px">
      <b-card-text style=" color: white">
        <h5>{{question.title}}</h5>
        <p class='text-muted'>Asked by: {{question.creator.name}}</p>
        <h6 class='text-muted'>Vote: {{vote}}</h6>
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