<template>
  <div class="home">
    <b-container class="bv-example-row">
      <b-row class="text-center">
        <b-col></b-col>
        <b-col cols="10">
          <h1>List of questions</h1><br><br>
          <CardList v-for="question in questions" :key="question._id" :inside="question" :type="'question'" />
        </b-col>
        <b-modal id='modal-scrollable-edit' size="lg" scrollable hide-footer title="Edit Question Form">
          <FormComponent :typeform="'edit'"  :type="'question'"/>
        </b-modal>
        <b-col></b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import CardList from '@/components/CardList.vue'
import FormComponent from '@/components/FormComponent.vue'
import { mapState } from 'vuex'

export default {
  name: 'home',
  components: {
    CardList,
    FormComponent
  },
  computed: {
    ...mapState(['questions'])
  }
}
</script>
