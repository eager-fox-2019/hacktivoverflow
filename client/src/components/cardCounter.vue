<template>
  <v-layout  my-4 align-center justify-center column fill-heigh>
    <v-flex>
      <h2 style="color:#FB7E51;" >{{jumlah}}</h2>
    </v-flex>
    <v-flex style="margin-top:-10px">
      <h5 style="color:#FB7E51;" >{{types}}</h5>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  props : ["types",'jumlah']
}
</script>

