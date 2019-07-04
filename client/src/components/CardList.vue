<template>
    <b-container class="bv-example-row">
      <b-row>
        <b-col sm="1">
          <VoteButton :inside="inside" :type="type"/>
        </b-col>
        <b-col sm="11">
          <b-card no-body align="left">
            <b-card-body>
              <b-link :to="`/${type}/${inside._id}`" v-if="(type === 'question')">
                <h4>{{ inside.title }}</h4>
              </b-link>
              <b-card-text v-if="(type === 'question')">
                {{ shortdesc }}
                <br><br>Asked by: {{ inside.owner.username}}
              </b-card-text>
              <h4 v-if="(type === 'answer')">{{ inside.title }}</h4>
              <b-card-text v-if="(type === 'answer')">
                {{ inside.description }}
                <br><br>Answered by: {{ inside.owner.username}}
              </b-card-text>
              <b-button-group v-if="(inside.owner._id == userId)">
                <div>
                  <b-button v-b-modal.modal-scrollable-edit variant="primary" @click="edit(inside._id)">Edit</b-button>
                </div>
                <b-button variant="danger" @click="del(inside._id)">Delete</b-button>
              </b-button-group>
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
    },
    userId: function () {
      return localStorage.getItem('id')
    }
  },
  methods: {
    edit (id) {
      let { dispatch } = this.$store
      if (this.type === 'answer') {
        dispatch('GET_AN_ANSWER', id)
      } else if (this.type === 'question') {
        dispatch('GET_A_QUESTION', id)
      }
    },
    del (id) {
      let { dispatch } = this.$store
      let swalconfirm = false
      this.$swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      })
        .then((result) => {
          swalconfirm = result.value
          if (swalconfirm) {
            if (this.type === 'question') {
              return dispatch('DELETE_QUESTION', id)
            } else if (this.type === 'answer') {
              return dispatch('DELETE_ANSWER', id)
            }
          }
        })
        .then((result) => {
          if (swalconfirm) {
            this.$swal({
              type: 'success',
              title: `Delete ${this.type} success`
            })
            if (this.type === 'question') {
              dispatch('GET_QUESTION')
            } else if (this.type === 'answer') {
              dispatch('GET_A_QUESTION', this.$route.params.questionId)
            }
          }
        })
        .catch(e => {
          console.log(e)
          this.$swal({
            type: 'error',
            title: `Delete ${this.type} failed`,
            text: `${e}`
          })
        })
    }
  }
}
</script>
