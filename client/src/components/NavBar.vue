<template>
    <div class="nav d-flex justify-content-between" style="margin-bottom:20px">
      <b-nav>
        <b-nav-item to='/'><img src='@/assets/operplow-nav-edited.png'></b-nav-item>
      </b-nav>
      <b-nav>
        <b-nav-item style="margin-top:10px" v-if="$store.state.isLogin" v-b-modal.modal-scrollable-add-question>
          Have a question?
          <b-modal id="modal-scrollable-add-question" hide-footer size="lg" scrollable title="Add question">
              <FormComponent :typeform="'add'" :type="'question'"/>
          </b-modal>
        </b-nav-item>
        <b-nav-item style="margin-top:10px; margin-right:30px" v-if="$store.state.isLogin" @click="signout()">Sign Out</b-nav-item>
        <b-nav-item v-else to='/logform' style="margin-top:10px; margin-right:30px">Sign in or Register to ask or answer</b-nav-item>
      </b-nav>
    </div>
</template>

<style>
.nav {
  background-color: #fafafb;
}
</style>


<script>
import FormComponent from '@/components/FormComponent.vue'
export default {
  components: {
    FormComponent
  },
  methods: {
    signout () {
      localStorage.clear()
      this.$store.commit('SET_LOGIN', false)
    }
  }
}
</script>
