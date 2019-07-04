<template>
    <div class="d-flex justify-content-between">
      <b-nav>
        <b-nav-item to='/'><img src='@/assets/operplow-nav-edited.png'></b-nav-item>
      </b-nav>
      <b-nav>
        <b-nav-item v-if="$store.state.isLogin" v-b-modal.modal-scrollable-add-question>
          Have a question?
          <b-modal id="modal-scrollable-add-question" hide-footer size="lg" scrollable title="Add question">
              <FormComponent :typeform="'add'" :type="'question'"/>
          </b-modal>
        </b-nav-item>
        <b-nav-item v-if="$store.state.isLogin" @click="signout()">Sign Out</b-nav-item>
        <b-nav-item v-else to='/logform'>Sign in or Register to ask or answer</b-nav-item>
      </b-nav>
    </div>
</template>

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
