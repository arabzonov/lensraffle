import { createRouter, createWebHistory } from 'vue-router'
import { lensClient } from '@/api/lens'
import { userStore } from '@/store/user.store'

import Login from '@/views/partials/Login.vue'

const routes = [	
	{
		path: '/',
		name: 'home',
		redirect: '/lottery',
	},
	{
		path: '/login',
		name: 'login',
		component: Login,
	},
	{
		path: '/lottery',
		name: 'lottery',		
		component: () => import('../views/lottery/Lotteries.vue'),
		meta: { auth: true },
	},
	
	
]

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes,
})

router.beforeEach(async (to, from, next) => {	
	if (to.meta.auth) {
		
		if (await lensClient.authentication.isAuthenticated()) {
			//if (!userStore().profile) await userStore().getProfile()			
			next()
		} else {
			next({ name: 'login' })
		}
	} else {
		next()
	}
})

export default router

// // http://localhost:5173/mirrors?id=6400c7280cb4487ed312b15c
