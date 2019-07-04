<template>
  <div class="row">
    <div class="col s12 m12">
      <div class="card grey darken-3">
        <div class="card-action">
          <div class>
            <div class="col m8 l8 left">
              <span class="orange-text lighten-1">
                <i class="material-icons left orange-text lighten-1 small">remove_red_eye</i>Watched Tags
              </span>
            </div>
            <div class="col m3 l3 right">
              <!-- <a >edit</a> -->
            </div>

            <div class>
              <form @submit.prevent="add_watch_tag">
                <input v-model="input_watch_tag" type="text" placeholder="input here..." />
                <button type="submit" class="btn">ADD</button>
              </form>
            </div>
          </div>
        </div>
        <br />
        <!-- {{ watchedTags }} ini -->
        <hr />
        <div class="card-content black-text">
          <!-- {{data_user_watch }} -->
          <div class="row">
            <div v-for="(tag, index) in data_user_watch[0]" :key="index" class="list-tag col">
              <div class="chip2">
                <!-- <div class="chip-head"></div> -->
                <div class="chip2-content">{{ tag }}</div>
                <div class="chip2-close">
                  <a @click.prevent="remove_watch_tag(tag)">
                    <svg
                      class="chip2-svg"
                      focusable="false"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import myServer from "../api/myServer.js";
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["data_user_watch"])
  },
  data() {
    return {
      // data_user_watch,
      input_watch_tag: ""
      // watchedTags: ''
      // watch_tag
    };
  },
  // computed: {
  //   watchedTags() {
  //     return this.$store.getters.watchedTags
  //   }
  // },
  methods: {
    add_watch_tag() {
      console.log("add_watch_tag wathc");
      console.log(this.data_user_watch, " ini ---------")
      if (this.data_user_watch == [] || this.data_user_watch[0].length === 0) {
        console.log('masuk kogong')
        myServer
          .put(
            `/users/watch/add/${localStorage.getItem("id")}`,
            {
              watchtags: this.input_watch_tag
            },
            {
              headers: {
                token: localStorage.getItem("token")
              }
            }
          )
          .then(({ data }) => {
            console.log(data, "ini data users");
            this.$store.commit("UPDATED_WATCH_TAG", this.input_watch_tag);
            // this.input_watch_tag = ''
          })
          .catch(err => {
            console.log(err.response);
            Swal.fire({
              type: "error",
              title: "Oops...",
              text: `${err.response.data.message}`
            });
          });
      }else
      if (
        this.input_watch_tag !== "" &&
        this.data_user_watch[0].indexOf(this.input_watch_tag.toLowerCase()) ==
          -1
      ) {
        // this.tags.push(this.tag_input.toLowerCase());
        // this.tag_input = "";
        myServer
          .put(
            `/users/watch/add/${localStorage.getItem("id")}`,
            {
              watchtags: this.input_watch_tag
            },
            {
              headers: {
                token: localStorage.getItem("token")
              }
            }
          )
          .then(({ data }) => {
            console.log(data, "ini data users");
            this.$store.commit("UPDATED_WATCH_TAG", this.input_watch_tag);
            // this.input_watch_tag = ''
          })
          .catch(err => {
            console.log(err.response);
            Swal.fire({
              type: "error",
              title: "Oops...",
              text: `${err.response.data.message}`
            });
          });
      }
    },
    remove_watch_tag(tag) {
      myServer
        .put(
          `/users/watch/remove/${localStorage.getItem("id")}`,
          {
            watchtags: tag
          },
          {
            headers: {
              token: localStorage.getItem("token")
            }
          }
        )
        .then(({ data }) => {
          this.$store.commit("REMOVE_WATCH_TAG", tag);
          console.log(data, "ini data users");
          // this.$store.commit('UPDATED_WATCH_TAG', this.input_watch_tag)
          // this.articles = this.articles.filter(el => (el._id !== id ))
          // console.log('----------------', this.data_user)
          // commit('SETUP_FETCH_DATA_USER', data)
        })
        .catch(err => {
          console.log(err.response);
          Swal.fire({
            type: "error",
            title: "Oops...",
            text: `${err.response.data.message}`
          });
        });
      // console.log('add_watch_tag wathc')
      // let index = this.watch_tag.indexOf(tag);
      // if (index !== -1) this.watch_tag.splice(index, 1);
    },
    // add_tag_button () {
    // },
    mounted() {}
  }
};
</script>

<style>
</style>
