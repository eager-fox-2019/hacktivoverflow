<template>
  <v-container grid-list-md ml-5>
    <v-layout row wrap>
      <v-flex xs11 style="margin-left:4px;">
       <v-toolbar flat dense color="#F7C10A">
        <v-toolbar-items>
            <v-btn flat class="font-weight-bold">Public questions</v-btn>
            <v-btn flat class="font-weight-bold">Your questions</v-btn>
        </v-toolbar-items>
      </v-toolbar>
      </v-flex>
      <v-flex style="border: 1px solid #BEBEBE" xs11 v-for="index in 5" :key="index" ma-2>
        <v-card flat>
          <v-layout row wrap>
            <v-flex xs1 style="background-color: #E5E5E5;">
              <v-layout column align-center>
                <v-icon style="cursor:pointer;" color="orange" large>keyboard_arrow_up</v-icon>
                <div>0</div>
                <v-icon style="cursor:pointer;" large>keyboard_arrow_down</v-icon>
              </v-layout>
            </v-flex>
            <v-divider vertical></v-divider>
            <v-flex xs10>
              <v-layout column  fill-height align-content-end>
                <v-flex>
                  <div class="title post-title mb-3 ml-3 mt-2">Lorem ipsum dolor sit amet consectetur, adipisicing elit!</div>
                  <v-layout row wrap align-center>
                    <v-btn flat small><v-icon class="mr-2">comment</v-icon>Comment</v-btn>
                    <div class="subheading text-md-center mr-3">Posted by: lorem ipsum</div>
                    <div class="subheading" style="color: #949596;"> 8 hours ago</div>
                  </v-layout>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'Posts'
}
</script>

<style>
  .post-title {
    cursor: pointer;
    color: #3E95DD;
  }

  .post-title:hover {
    color: #6BBCFF;
  }

</style>
