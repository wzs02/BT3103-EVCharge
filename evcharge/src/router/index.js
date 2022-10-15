import { createRouter, createWebHashHistory } from "vue-router";
// import LogIn from '@/views/LogIn.vue'
// import SignUp from '@/views/SignUp.vue'
// import TesterFile from '@/views/TesterFile.vue'

const router = createRouter({
	history: createWebHashHistory(),
	routes: [
		{
			path: "/",
			name: "AboutPage",
			component: () => import("../views/AboutPage.vue"),
		},
		{
			path: "/signup",
			name: "SignUp",
			component: () => import("../views/SignUp.vue"),
		},
		{
			path: "/login",
			name: "LogIn",
			component: () => import("../views/LogIn.vue"),
		},
		{
			path: "/view_bookings",
			name: "ViewBookings",
			component: () => import("../views/ViewBookings.vue"),
			meta: {
				requireAuth: true,
			},
		},
		{
			path: "/TesterFile",
			name: "TesterFile",
			component: () => import("../views/TesterFile.vue"),
			meta: {
				requireAuth: true,
			},
		},
	],
});

export default router;
