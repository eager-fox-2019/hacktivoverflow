<template>
  <q-layout view="lHh lpR lFf" class="bg-blue-grey-2">

    <q-header reveal bordered class="bg-white text-black">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="left = !left" />

        <q-toolbar-title>
          <!-- <q-avatar> -->
            <!-- <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg"> -->
          <!-- </q-avatar> -->
          Flowwit
        </q-toolbar-title>
      <login v-show="!$store.state.main.isLogin" />
      <register v-show="!$store.state.main.isLogin" />
      <!-- <div class="text-h6 q-mr-md" v-show="$store.state.main.isLogin">Welcome, {{$store.state.main.username}}</div> -->
      <q-item clickable dense v-show="$store.state.main.isLogin" style="border-radius: 5px;">
        <q-item-section avatar side>
          <q-avatar rounded size="38px">
          <img src="https://i.pravatar.cc/300" />
        </q-avatar>
        </q-item-section>
        <q-item-section class="text-h6 text-weight-light text-capitalize">
          {{$store.state.main.username}}
        </q-item-section>
        <q-item-section side>
          <q-icon name="arrow_drop_down" />
        </q-item-section>
        <q-menu fit>
          <q-list>
            <q-item clickable v-close-popup :to="{path: '/myposts'}">
              <q-item-section class="text-weight-light">My Posts</q-item-section>
            </q-item>

            <q-item clickable v-close-popup @click="logout">
              <q-item-section  class="text-weight-light">Logout</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-item>
      </q-toolbar>

      <q-tabs inline-label dense align="left" v-show="!left">
        <q-route-tab to="/" name="home" icon="home" label="Home" />
        <q-route-tab to="/addpost" name="addPost" icon="create" label="Add a Post" />
        <q-route-tab to="/myposts" name="myPosts" icon="person" label="My Posts" />
      </q-tabs>
    </q-header>

    <q-drawer v-model="left" side="left" bordered>
      <q-list>
        <!-- <q-item-label header class="text-h4">Dashboard</q-item-label> -->

            <!-- <div class="row justify-center">
              <q-avatar size="60px">
                <img src="https://i.pravatar.cc/300" />
              </q-avatar>
            </div> -->

        <q-item>
          <q-item-section avatar>
            <q-avatar size="60px">
              <img src="https://i.pravatar.cc/300" />
            </q-avatar>
          </q-item-section>

          <q-item-section class="text-capitalize text-h6 text-weight-light">
            {{$store.state.main.username}}
          </q-item-section>
        </q-item>
        <q-item to="/" exact>
          <q-item-section avatar>
            <q-icon name="home" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Home</q-item-label>
            <q-item-label caption>View all questions asked by all kinds of users</q-item-label>
          </q-item-section>
        </q-item>

        <q-item to="/addpost" exact>
          <q-item-section avatar>
            <q-icon name="edit" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Add a Post</q-item-label>
            <q-item-label caption>What do you have in mind?</q-item-label>
          </q-item-section>
        </q-item>

        <q-item to="/myposts" exact>
          <q-item-section avatar>
            <q-icon name="person" />
          </q-item-section>
          <q-item-section>
            <q-item-label>My Posts</q-item-label>
            <q-item-label caption>View all posts posted by you</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
import login from "../components/login"
import register from "../components/register"

export default {
  components: {
    login,
    register
  },
  data () {
    return {
      left: false
      
    }
  },
  methods: {
    logout: function () {
      sessionStorage.removeItem("jwt")
      this.$store.commit("CHECK_LOGIN")
    }
  }
}
</script>


