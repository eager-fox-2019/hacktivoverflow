<template>
  <div class="about">
    <h3>Mini Overflow</h3>
    <p>This site is designed to let you ask questions, and give answers. It requires that you register and login to allow you to edit and delete your questions and answers. This site will also send you an email once a week, every Sunday 8am Jakarta time, for five highest rated questions of the week.</p>
    <p>Postman documentation for mini overflow can be found <a href="https://documenter.getpostman.com/view/6691212/S1a7WR4Z">here</a>. The features implemented includes: CRUD question, CRUD answer, CRU user, user login authentication with jsonwebtoken, mongoose database model validation, and cron.</p>
    <p>The client side is built with vue-cli and vuex to handle the data, with bootstrap-vue components bootstrap classes to style.</p>
    <p>The server side is built with javascript nodejs.</p>
    <div>Icons made by <a href="https://www.flaticon.com/authors/dave-gandy" title="Dave Gandy">Dave Gandy</a> from <a href="https://www.flaticon.com/"                 title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a>. The orange version of the icons are edited from the basic icons.</div>
  </div>
</template>

<style scoped>
.about {
	padding: 1em;
	margin: 1em;
	width: 24em;
}
</style>
