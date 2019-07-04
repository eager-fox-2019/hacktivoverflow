<template>
  <div class='p-2'>
    <p class="text-muted" style="font-size: medium">
      <i class="fas fa-star" style="color: gainsboro"></i> :  {{vote}}
      <span style="color:gainsboro" >  -> </span>
      <a href="#" @click.prevent="upvote" v-if="!upvoted" ><i class="fas fa-thumbs-up" style="color:gainsboro"></i></a> 
      <a href="#" @click.prevent="netral" v-else-if="upvoted"><i class="fas fa-thumbs-up" ></i></a><span> | </span>
      <a href="#" @click.prevent="downvote" v-if="!downvoted" ><i class="fas fa-thumbs-down" style="color:gainsboro"></i></a>
      <a href="#" @click.prevent="netral" v-else-if="downvoted"><i class="fas fa-thumbs-down" ></i></a>
    </p>
  </div>
</template>
<script>
import api from "@/api/api.js";
api.defaults.headers.common["token"] = localStorage.getItem("token");

export default {
  name: "votes",
  props: ["data", "type"],
  data() {
    return {
      upvoted: false,
      downvoted: false,
      vote: ""
    };
  },
  watch: {
    data() {
      this.getVote();
    }
  },
  methods: {
    getVote() {
        if (this.data.upvotes.includes(localStorage.getItem("id"))) {
          this.upvoted = true;
          this.downvoted = false;
        } else if (this.data.downvotes.includes(localStorage.getItem("id"))) {
          this.downvoted = true;
          this.upvoted = false;
        } else {
          this.downvoted = false;
          this.upvoted = false;
        }
        // console.log(this.data)
        this.vote = this.data.upvotes.length - this.data.downvotes.length;
    },
    upvote() {
        api
          .patch(`${this.type}/upvote/${this.data._id}`)
          .then(({ data }) => {
            this.$emit("updateData", data);
          })
          .catch(err => {
            console.log(err);
          });
    },
    downvote() {
        api
          .patch(`${this.type}/downvote/${this.data._id}`)
          .then(({ data }) => {
            this.$emit("updateData", data);
          })
          .catch(err => {
            console.log(err);
          });
    },
    netral() {
        api
          .patch(
            `${this.type}/removevote/${this.data._id}`
          )
          .then(({ data }) => {
            this.$emit("updateData", data);
          })
          .catch(err => {
            console.log(err);
          });
    }
  },
  created(){
    if(this.data){
      this.getVote()
    }
  }
};
</script>