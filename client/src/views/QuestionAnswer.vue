<template>
  <div class="questionanswer">
    <NavBar/>
    <b-container fluid class="bv-example-row">
        <b-row>
            <b-col sm="1">
                <VoteButton :inside="questionShowed" :type="'question'"/>
            </b-col>
            <b-col sm="10">
                    <b-card no-body align="left">
                        <b-card-body>
                        <h4>{{ questionShowed.title }}</h4>
                        <b-card-text>
                            {{ questionShowed.description }}
                        </b-card-text>
                        <b-button v-b-modal.modal-scrollable-add variant="primary" @click="add(questionShowed._id)">Give answer</b-button>
                        <b-modal id="modal-scrollable-add" size="lg" scrollable centered hide-footer title="Add Answer Form">
                            <FormComponent :typeform="'add'" :type="'answer'"/>
                        </b-modal>
                    </b-card-body>
                </b-card>
                <b-row>
                    <b-col cols="12" sm>
                        <br>
                        <CardList v-for="answer in questionShowed.answer" :key="answer._id" :inside="answer" :type="'answer'" />
                        <b-modal :id="'modal-scrollable-edit'" size="lg" scrollable hide-footer title="Edit Form">
                          <FormComponent :typeform="'edit'"  :type="'answer'"/>
                        </b-modal>
                    </b-col>
                </b-row>
            </b-col>
        </b-row>
    </b-container>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import VoteButton from '@/components/VoteButton.vue'
import CardList from '@/components/CardList.vue'
import FormComponent from '@/components/FormComponent.vue'
import { mapState } from 'vuex'

export default {
  name: 'QuestionAnswer',
  data () {
    return {
    }
  },
  components: {
    NavBar,
    VoteButton,
    CardList,
    FormComponent
  },
  computed: {
    ...mapState(['questionShowed'])
  },
  created () {
    this.$store.dispatch('GET_A_QUESTION', this.$route.params.questionId)
  },
  methods: {
    add (id) {
      this.$store.dispatch('GET_A_QUESTION', id)
    }
  }
}
</script>
