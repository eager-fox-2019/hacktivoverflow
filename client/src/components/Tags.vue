<template>
<div class="tags">
    <Navbar></Navbar>
    <div class="row">
        <div class="col-2 side-nav">
          <SideNavbar></SideNavbar>
        </div>
        <div class="col-10">

        </div>
        <div class="col-2">
          <WatchedTag></WatchedTag>
        </div>
    </div>
</div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import SideNavbar from '@/components/SideNavbar.vue'
import WatchedTag from '@/components/WatchedTag.vue'

export default {
    components: {
        SideNavbar,
        Navbar,
        WatchedTag
    }
}
</script>

<style scoped>
.row {
  margin : 0 0;
}
.col-2 {
  padding: 5px;
}
.side-nav {
  text-align: center;
  border-right: 1px solid rgb(201, 196, 196);
  height: 100%;
  position: fixed;
  z-index: 1;
  top: 20;
  left: 0;
  overflow-x: hidden;
  padding-top: 20px;
}
</style>
