<template>
    <b-container class="bv-example-row">
      <b-row>
        <b-col sm="1">
          <VoteButton :inside="inside" :type="type"/>
        </b-col>
        <b-col sm="11">
          <b-card no-body align="left">
            <b-card-body>
              <b-link :to="`/${type}/${inside._id}`">
                <h4>{{ inside.title }}</h4>
              </b-link>
              <b-card-text v-if="(type === 'question')">
                {{ shortdesc }}
              </b-card-text>
              <b-card-text v-if="(type === 'answer')">
                {{ inside.description }}
              </b-card-text>
            </b-card-body>
          </b-card>
        </b-col>
      </b-row>
      <br>
    </b-container>
</template>

<script>
import VoteButton from '@/components/VoteButton.vue'
export default {
  props: ['inside', 'type'],
  components: {
    VoteButton
  },
  computed: {
    shortdesc: function () {
      let desc = this.inside.description.substring(0, 100)
      if (this.inside.description.length > 100) {
        desc += '...'
      }
      return desc
    }
  },
  methods: {
    // getQuestion (id) {
    //   console.log('Masuk getquestion')
    //   this.$store.dispatch('GET_A_QUESTION', id)
    // }
  }
}
</script>
