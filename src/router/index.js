import Vue from 'vue'
import Router from 'vue-router'
import SigInt from '@/components/HelloWorld'
import Login from '@/components/Login'
import SignUp from '@/components/SignUp'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/sig-int',
      name: 'SigInt',
      component: SigInt
    },
    {
    	path: '/',
    	name: 'Login',
    	component: Login
    },
    {
      path: '/sign-up',
      name: 'SignUp',
      component: SignUp
    }
  ]
})
