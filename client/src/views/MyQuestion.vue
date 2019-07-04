<template>
    <div class="my-container__small">
        <Sidebar />
        
        <div style="width: 740px;">
            <div class="heads">
                <h5 slot="header">My Questions</h5>
              <button @click="goToCreateQuestion" class="btn btn-primary">Ask Question</button>
            </div>
            <hr>
            <div v-if="myQuestions.length===0">
                <h5>You're not asking any question yet.</h5>
            </div>
            <div v-else>
                <QuestionList
                    :questions="myQuestions"
                    :manipulate="true"
                />
            </div>
        </div>

        <Widget />
    </div>
</template>

<script>
import QuestionList from '@/components/QuestionList.vue'
import Sidebar from '@/components/Sidebar.vue'
import Widget from '@/components/Widget';

export default {
    name: 'my-questions',
    components: {
        QuestionList,
        Sidebar,
        Widget
    },
    computed: {
        myQuestions() {
            return this.$store.getters.myQuestions
        }
    },
    methods: {
        goToCreateQuestion() {
            if(localStorage.token) {
                this.$router.push('/question/ask')
            }else{
                this.$router.push('/login')
            }
        }
    }
}
</script>

<style scope>
.my-container__small {
  display: flex;
  justify-content: space-between;
  min-height: 100vh;
}
</style>
