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
                            <pre>{{this.$store.state.questionShowed}}</pre>
                        <h4>{{ questionShowed.title }}</h4>
                        <b-card-text>
                            {{ questionShowed.description }}
                        </b-card-text>
                        <!-- <b-button variant="primary" :to="`/add-answer/${questionShowed._id}`">Give answer</b-button> -->
                        <b-button v-b-modal.modal-scrollable-add variant="primary" @click="add(questionShowed._id)">Give answer</b-button>

                        <b-modal id="modal-scrollable-add" size="lg" scrollable title="Add answer">
                            <AFComponent :typeform="'add'" :type="'answer'"/>
                        </b-modal>

                    </b-card-body>
                </b-card>
                <b-row>
                    <b-col cols="12" sm>
                        <br>
                        <CardList v-for="answer in questionShowed.answer" :key="answer._id" :inside="answer" :type="'answer'" />
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
import AFComponent from '@/components/AFComponent.vue'
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
    AFComponent
  },
  computed: {
    ...mapState(['questionShowed'])
    // answers: function () {
    //   return this.$store.dispatch('GET_ANSWER')
    // }
  },
  created () {
    this.$store.dispatch('GET_A_QUESTION', this.$route.params.questionId)
  },
  methods: {
    add (id) {
      console.log('Masuk ke add id di question answer dng id:', id)
      this.$store.dispatch('GET_A_QUESTION', id)
    }
  }
}
</script>
