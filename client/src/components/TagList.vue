<template>
  <div>
    <div id="alltags">
      <div id="atgheading">All Tags</div>
      <div style="display: flex; flex-wrap: wrap; padding: 0.4rem 0.8rem 0 0.8rem;">
        <div class="tagbtn" :class="{tagatv: (tag === current)}"
          v-for="tag of tags" :key="tag" @click="$emit('tagselect', tag)">
          {{ tag }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>  
export default {
  props: ['tags', 'current']
}
</script>

<style>
#alltags {
  margin-top: 1rem;
  margin-right: 1rem;
  padding: 0 0 0.8rem 0;
  border: 1px solid #bbb;
  border-radius: 0.4rem;
  overflow: hidden;
  box-shadow: 0 0rem 0.3rem #bbb;
}
#atgheading {
  padding: 0.4rem 0.8rem;
  border-bottom: 1px solid #bbb;
  background-color: #f2f2f2;
}
.tagbtn {
  cursor: pointer;
  margin: 0.4rem 0.4rem 0.1rem 0;
  padding: 0.1rem 0.4rem 0.2rem 0.4rem;
  border-radius: 0.2rem;
  font-size: 0.8rem;
  background-color: #cddef1;
  color: #0b56ac;
}
.tagatv {
  background-color: #4882c5;
  color: white;
  box-shadow: 0 0rem 0.3rem #bbb;
}
</style>
