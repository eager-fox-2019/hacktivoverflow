<template>
  <v-dialog
      v-model="dialog2"
      max-width="800px"
      persistent
    >
    <v-card class="pa-3">
      <v-text-field
      v-model="editAnswerTitle"
      prepend-inner-icon="question_answer"
      solo
      >
      </v-text-field>
    <ckeditor :editor="editor" v-model="editAnswerDesc" :config="editorConfig"></ckeditor>

    <v-card-actions>
      <v-spacer></v-spacer>

      <v-btn
        color="red darken-1"
        flat="flat"
        @click="closeDialog"
      >
        Nevermind
      </v-btn>

      <v-btn
        color="green darken-1"
        flat="flat"
        @click="edit"
      >
        Edit
      </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {

}
</script>

<style>

</style>
