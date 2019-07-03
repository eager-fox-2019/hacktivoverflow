<template>
    <b-container class="bv-example-row">
      <b-row>
        <b-col sm="1">
          <VoteButton :inside="answer" :type="'answer'"/>
        </b-col>
        <b-col sm="11">
          <b-card no-body align="left">
            <b-card-body>
              <b-link :to="`/answer/${answer._id}`">
                <h4>{{ answer.title }}</h4>
              </b-link>
              <b-card-text>
                {{ answer.description }}
              </b-card-text>
            </b-card-body>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
</template>

<script>
import VoteButton from '@/components/VoteButton.vue'
export default {
  props: ['answer'],
  components: {
    VoteButton
  }
}
</script>
