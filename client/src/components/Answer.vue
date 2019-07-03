<template>
  <v-layout class="answer-container">
    <v-flex xs2 text-xs-center class="votes-container py-4">
      <div><i class="material-icons votes-icon-up">thumb_up</i></div>
      <div class="votes-diff">0</div>
      <div><i class="material-icons votes-icon-down">thumb_down</i></div>
    </v-flex>
    <v-flex xs10 class="py-4 px-4">
      <p class="body-1">Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of
        classical Latin
        literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney
        College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and
        going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum
        comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by
        Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance.
        The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.</p>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {

  }
</script>

<style scoped>
  .votes-diff {
    font-size: 2.5rem;
  }

  .votes-icon-up,
  .votes-icon-down {
    font-size: 2.5rem;
    color: #444;
  }

  .votes-icon-up:hover {
    color: #1E88E5;
    cursor: pointer;
  }

  .votes-icon-down:hover {
    color: #E53935;
    cursor: pointer;
  }

  .answer-container {
    border-top: 1px solid #eee;
    border-bottom: 1px solid #ddd;
    max-height: 300px;
  }

  .votes-container {
    border-right: 1px solid #ddd;
  }
</style>
