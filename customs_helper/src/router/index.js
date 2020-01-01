import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import HelloWorld from '../components/HelloWorld'

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/HelloWorld',
    name: 'HelloWorld',
    component: HelloWorld
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

// router.get("/getHistory", function (req, res) {
//   // var term = (req.query.term || "").toUpperCase();
//   // var result = term === "" ? contacts : contacts.filter(function (contact) {
//   //   return contact.firstName.toUpperCase().includes(term) ||
//   //     contact.lastName.toUpperCase().includes(term) ||
//   //     contact.phoneNumber.toUpperCase().includes(term)
//   // });
//   res.send(111);
// });

export default router
