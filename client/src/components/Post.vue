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
      <p id="poster">Posted by: Johnson</p>
      <p id="post">What kind of bear is best ?</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'post',
  props: [],
  data() {
    return {

    }
  },
  methods: {

  },
  components: {
    
  }

}
</script>

<style lang="scss" scoped>
  $primary: #311B92;
  #post-card {
    width: 100%;
    border-bottom: 1.5px solid $primary;
    height: 120px;
    padding: 20px;
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
    padding: 15px;
  }
  #post:hover{
    cursor: pointer;		
  }
</style>

