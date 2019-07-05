<template>
  <b-card>
    <b-card-text>
      <b-row>
        <h5 class="col col-9">Watched Tags</h5>
        <div class="col col-3">
          <a href='#' v-if="!edit" @click="edit=true">Edit</a>
          <a href='#' v-if="edit" @click="edit=false">Cancel</a>
        </div>
      </b-row>
      <b-row v-if='edit' class='py-2'>
        <b-form class='px-4 col col-12' @submit.prevent="addTag" style="color:black">
            <b-form-input placeholder='add tag' id="tag" v-model="newTag"/>
        </b-form>
      </b-row>
      <div class='px-2 py-2'>
          <div v-if='tagSearch' class=" m-1 chip button" @click='tagSearching("")' >
          < undo
        </div>
        <div class="m-1 chip button" v-for="tag in watchedTags" @click='tagSearching(tag)' :key="tag">
          {{tag}}
          <span v-if="edit" class="closebtn p-1" @click.prevent="removeTag(tag)">&times;</span>
        </div>
        <!-- <div class='chip' style='font-size:12px' v-for='tag in question.tags' :key='tag'>{{tag}}</div> -->
      </div>
      <!-- <p class='text-muted'>Asked by: {{question.creator.name}} || score: {{vote}}  </p> -->
    </b-card-text>
  </b-card>
</template>
<script>
export default {
  name: "watchedTags",
  computed: {
    watchedTags() {
      return this.$store.state.watchedTags;
    },
    tagSearch(){
        return this.$store.state.tagSearch
    },
    islogin(){
        return this.$store.state.islogin
    }
  },
  data() {
    return {
      edit: false,
      newTag:'',
    };
  },
  watch:{
      islogin(){
          if(!this.islogin){
              this.$store.commit('updateTags', [])
          }
      }
  },
  methods:{
      tagSearching(tag){
          this.$store.commit('tagSearch', tag)
      },
      removeTag(tag){
        let newWatchedTags = []
        newWatchedTags = this.watchedTags.filter((item)=>{
            if(tag !== item){
                return newWatchedTags
            }
        })
        this.$store.dispatch('updateTags', newWatchedTags)  
      },
      addTag(){
          let newWatchedTags = this.watchedTags
          newWatchedTags.push(this.newTag)
          this.$store.dispatch('updateTags', newWatchedTags)
          this.newTag=''
      }
  },
  created(){
    //   if(this.watchedTags.length === 0){
    //       this.edit = true
    //   }
  }
};
</script>
