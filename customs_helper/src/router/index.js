import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import CustomsValueCalc from '../views/CustomsValueCalc'
import defermentPaymentTableView from '../views/defermentPaymentTableView'
import PackageDefermentTable from '../views/PackageDefermentTable'

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/CustomsValueCalc',
    name: 'CustomsValueCalc',
    component: CustomsValueCalc
  },
  {
    path: '/defermentPaymentTableView',
    name: 'defermentPaymentTableView',
    component: defermentPaymentTableView
  },
  {
    path: '/PackageDefermentTable',
    name: 'PackageDefermentTable',
    component: PackageDefermentTable
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

export default router
