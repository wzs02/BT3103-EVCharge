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
      meta: {
        requireAuth: false,
      },
    },
    {
      path: "/signup",
      name: "SignUp",
      component: () => import("../views/SignUp.vue"),
      meta: {
        requireAuth: false,
      },
    },
    {
      path: "/login",
      name: "LogIn",
      component: () => import("../views/LogIn.vue"),
      meta: {
        requireAuth: false,
      },
    },
    {
      path: "/forgetpw",
      name: "ForgetPassword",
      component: () => import("../views/ForgetPw.vue"),
      meta: {
        requireAuth: false,
      },
    },
    {
      path: "/faq",
      name: "FAQ",
      component: () => import("../views/FAQPage.vue"),
      meta: {
        requireAuth: true,
      },
    },
    {
      path: "/Book",
      name: "BookingPage",
      component: () => import("../views/BookingPage.vue"),
      meta: {
        requireAuth: true,
      },
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
      path: "/map",
      name: "MapPage",
      component: () => import("../views/MapPage.vue"),
    },
    {
      path: "/account-balance",
      name: "AccountBalancePage",
      component: () => import("../views/AccountBalancePage.vue"),
    },
    {
      path: "/payment-success",
      name: "PaymentSuccessPage",
      component: () => import("../views/PaymentSuccessPage.vue"),
    },
    {
      path: "/payment-error",
      name: "PaymentErrorPage",
      component: () => import("../views/PaymentErrorPage.vue"),
    },
    {
      path: "/msignup",
      name:"MSignUp",
      component: () => import("../views/MSignUpPage.vue")
    }
  ],
});

export default router;
