<template>
    <v-dialog
      v-model="dialog"
      max-width="400"
    >
      <v-card class="pa-2">
        <v-card-text class="headline text-xs-center">Question posted!</v-card-text>

        <v-card-text class="subheading text-xs-center">
          Your question is now out for everyone to see.
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="red darken-1"
            flat="flat"
            @click="dialog = false"
          >
            Close
          </v-btn>

          <v-btn
            color="green darken-1"
            flat="flat"
            @click="toHome"
          >
            Back to home
          </v-btn>

          <v-btn
            color="green darken-1"
            flat="flat"
            @click="toPost"
          >
            See your post
          </v-btn>
        </v-card-actions>
      </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ['dialog'],
  name: 'PostSucccess',

  methods: {
    toHome () {
      this.$store.dispatch('getPublicQuestions')
      this.$router.push('/')
    },

    toPost () {

    }
  }
}
</script>

<style>

</style>
