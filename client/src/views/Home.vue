<template>
  <div>
    <div class="container is-fluid">
      <div class="columns" style="margin-top: 30px">
        <div class="column" style="background-color: red; margin-right: 20px; height: 90vh">
          <div style="margin-top: 150px">
            <strong style="font-size: 40px;">Looking for something?</strong>
            <b-field style="margin-top:13px" class="column is-6 is-offset-3">
              <b-input placeholder="Search" type="search" icon-pack="fas" icon="search" rounded></b-input>
            </b-field>
            <div>
              <b-button rounded type="is-primary" size="is-medium" @click="search">Search</b-button>
            </div>
          </div>
        </div>
        <div class="column" style="background-color: yellow">
          <div>
            <Login v-if="pageStatus == 'login'" style="margin-top: 50px"></Login>
            <Regis v-if="pageStatus == 'regis'"></Regis>
          </div>
        </div>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import Login from "@/components/Login";
import Regis from "@/components/Regis";
export default {
  name: "landing",
  components: {
    Login,
    Regis
  },
  computed: {
    pageStatus() {
      return this.$store.state.page;
    }
  },
  methods: {
    search(){
      
    }
  },
};
</script>

<style>
</style>
