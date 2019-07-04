<template>
  <div id="post-card" @click="toDetail">
    <div id="arrow-vote">
      <b-icon
          pack="fas"
          icon="arrow-up"
          class="arrow"
          >
      </b-icon>
      <div id="score"> 0 </div>
      <b-icon
          pack="fas"
          icon="arrow-down"
          class="arrow"
          >
      </b-icon>
    </div>
    <div id="question">
      <p id="poster">Posted by: {{user.username}} at {{createdAt}}</p>
      <p id="post">{{title}}</p>
      <div id="option-container" v-if="state === 'my'">
        <p class="option">delete</p>
        <p class="option" style="margin-left: 15px;">edit</p>
        <p class="option" style="margin-left: 15px;">reply</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'post',
  props: ['title', 'user', 'createdAt', 'state'],
  data () {
    return {

    }
  },
  methods: {
    toDetail() {
      
    }
  },
  components: {

  }

}
</script>

<style lang="scss" scoped>
  $primary: #311B92;
  #option-container {
    display: flex;
  }
  .option {
    margin-left: 5px;
    margin-top: 10px;
    font-size: 14px;
    color: $primary;
  }
  .option:hover{
    cursor: pointer;
    color: black;		
  }
  #post-card {
    width: 100%;
    border-bottom: 2px solid $primary;
    // height: 120px;
    padding: 10px 20px;
    display: flex;
    margin: 10px auto;
    // align-items: center;
  }

  #arrow-vote {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  }

  #question {
    margin: auto 30px;
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  .arrow:hover{
    cursor: pointer;
  }

  .arrow-clicked {
    color: $primary;
  }

  #poster {
    font-size: 12px;
    // align-self: flex-end;
    color: $primary;
  }
  #post {
    border: 1px solid $primary;
    border-radius: 8px;
    padding: 15px;
  }
  #post:hover{
    cursor: pointer;
  }
</style>
