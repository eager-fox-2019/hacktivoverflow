<template>
  <div>
    <li class="list-group-item">
      <div class="row">
        <div class="col-2 vote">
          <div class="row d-flex justify-content-center">{{ totalVotes }}</div>
          <div class="row d-flex justify-content-center">
            <p>votes</p>
          </div>
          <div class="row d-flex justify-content-center">{{ question.answers.length }}</div>
          <div class="row d-flex justify-content-center">
            <p>answers</p>
          </div>
        </div>
        <div class="col-10">
          <div class="row title">
            <router-link :to="{ name: 'detailQuestion', params: { id: question._id }}">{{ question.title }}</router-link>
          </div>
          <div  class="row description">
            <p v-html="description"></p>
          </div>
          <div class="row">
            <p class="tag" v-for="(tag , index) in question.tags" :key="index">{{ tag.text }}</p>
          </div>
        </div>
      </div>
    </li>
  </div>
</template>

<script>
export default {
    props: ['question'],
    computed : {
        totalVotes () {
            return this.question.downVotes.length + this.question.upVotes.length
        },
        description () {
            return this.question.description.slice(0,300) + ' ...'
        }
    }
};
</script>

<style scoped>
.title {
}
.description {
}
.tag {
    margin-right: 5px;
    background-color: rgb(180, 206, 236);
    color: blue;
    padding: 2px;
    font-size: 13px;
    border-radius: 4px;
    cursor: pointer;
}
.tag:hover {
    background-color:rgb(142, 184, 212) 
}
.vote {
  color: rgb(102, 99, 99);
}
</style>
