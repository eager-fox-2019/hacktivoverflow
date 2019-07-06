<template>
  <div>
    <AnswerCard v-for="(item, i) in answerList" :card="item" :key="i">
      <div v-if="item.owner._id==$store.state.user.id">
        <EditAnswerForm v-if="showEditForm==item._id" :original="item" @hideForm="hideEditForm" />
        <div v-if="!showEditForm">
          <b-link @click.prevent="editAnswerForm(item._id)" href="#" class="card-link text-primary">Edit Answer</b-link>
          <b-link @click.prevent="deleteAnswer(item._id)" href="#" class="card-link text-danger">Delete</b-link>
        </div>
      </div>
    </AnswerCard>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import AnswerCard from '@/components/AnswerCard.vue'
import EditAnswerForm from '@/components/EditAnswerForm.vue'

export default {
  name: 'AnswerList',
  components: {
    AnswerCard,
    EditAnswerForm
  },
  computed: mapState(['answerList']),
  data () {
    return {
      showEditForm: null
    }
  },
  methods: {
    editAnswerForm (itemId) {
      this.showEditForm = itemId
    },
    hideEditForm () {
      this.showEditForm = null
    },
    deleteAnswer (itemId) {
      let { commit, dispatch } = this.$store
      dispatch('deleteAnswer', itemId)
        .then(({ data }) => {
          let newList = []
          this.answerList.forEach(answer => {
            if (answer._id.toString() !== data._id.toString()) {
              newList.push(answer)
            }
          })

          commit('UPDATECURRENTANSWERLIST', [])
          commit('UPDATECURRENTANSWERLIST', newList)
        })
        .catch(({ response }) => {
          commit('SHOWMSG', {
            message: response.data,
            type: 'danger'
          })
        })
    }
  }
}

</script>
<style scoped>
div {
  margin-top: 1em;
}

</style>
