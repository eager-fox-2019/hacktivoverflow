<template>
  <div id="maingrid" v-if="islogin">
    <TagList :tags="tags" :current="selectedTag" @tagselect="tagChange"/>
    <div id="mgrid2">
      <div style="font-size: 1.5rem; padding: 0 1rem 1rem 1rem;">{{mainHeading}}</div>
      <div style="display: flex; padding: 0 0.5rem;">
        <div class="sn2 sng">&nbsp;</div>
        <div class="sn2c sn2" :class="{tabselect: sortOrder === 0}" @click="sortOldest">Oldest</div>
        <div class="sn2c sn2" :class="{tabselect: sortOrder === 1}" @click="sortNewest">Newest</div>
      </div>
      <div v-for="question of sortedQuestions" :key="question._id">
        <QuestionCard :question="question" @detail="detail(question._id)" @tagselect="tagChange"/>
      </div>
    </div>
  </div>
</template>
<script>
import QuestionCard from '@/components/QuestionCard.vue'
import TagList from '@/components/TagList.vue'
import { mapActions } from 'vuex'

export default {
  name: 'all-questions',
  props: ['islogin'],
  data () {
    return {
      selectedTag: '',
      sortOrder: 0,
    }
  },
  components: {
    QuestionCard, TagList,
  },
  computed: {
    tags() {
      return this.$store.state.tags
    },
    questions() {
      return this.$store.state.questions
    },
    filteredQuestions() {
      if(this.selectedTag === '') {
        return this.questions;
      }
      return this.questions.filter(question => question.tags.includes(this.selectedTag));
    },
    sortedQuestions() {
      if(this.sortOrder === 0) {
        return this.filteredQuestions.sort(function(a, b) {
          return new Date(a.created_at) - new Date(b.created_at)
        });
      } else {
        return this.filteredQuestions.sort(function(a, b) {
          return new Date(b.created_at) - new Date(a.created_at)
        });
      }
    },
    mainHeading() {
      if(this.selectedTag === '') {
        return 'All Questions';
      } else {
        return `Questions tagged [${this.selectedTag}]`;
      }
    }
  },
  methods: {
    ...mapActions(['FETCHQUESTIONS']),
    detail(id) {
      this.$router.push({ path: `/questions/${id}` })
    },
    tagChange(tag) {
      this.selectedTag = (this.selectedTag === tag) ? '' : tag;
    },
    sortOldest() {
      this.sortOrder = 0;
    },
    sortNewest() {
      this.sortOrder = 1;
    },
  },
  created () {
    this.FETCHQUESTIONS();
  }
}
</script>

<style>
#maingrid {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  padding: 0 1rem;
}
@media only screen and (max-width: 640px) {
  #maingrid {
    grid-template-columns: 1fr 2fr;
    padding-right: 0;
  }
}
#mgrid2 {
  min-height: 90vh;
  border-left: 1px solid #bbb;
  border-right: 1px solid #bbb;
  padding: 0.8rem 0;
}
.card {
  margin-bottom: 1rem;
  margin-right: 0.4rem;
}
.sn2c {
  cursor: pointer;
}
.sn2 {
  font-size: 0.85rem;
  padding: 0.4rem 0;
  width: 4.6rem;
  text-align: center;
  border-bottom: 1px solid #ccc;
}
.sng {
  flex-grow: 1;
}
.tabselect {
  border-left: 1px solid #ccc;
  border-top: 3px solid #e68f47;
  border-right: 1px solid #ccc;
  border-bottom: 1px transparent;
}
</style>
