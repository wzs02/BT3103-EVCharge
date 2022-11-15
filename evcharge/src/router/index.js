import { createRouter, createWebHashHistory } from "vue-router";

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
      name: "SignUpPage",
      component: () => import("../views/SignUp.vue"),
    },
    {
      path: "/login",
      name: "LogIn",
      component: () => import("../views/LogIn.vue"),
    },
    {
      path: "/forgetpw",
      name: "ForgetPassword",
      component: () => import("../views/ForgetPw.vue"),
    },
    {
      path: "/faq",
      name: "FAQ",
      component: () => import("../views/FAQPage.vue"),
    },
    {
      path: "/Book",
      name: "BookingPage",
      component: () => import("../views/BookingPage.vue"),
    },
    {
      path: "/account-balance",
      name: "AccountBalancePage",
      component: () => import("../views/AccountBalancePage.vue"),
    },
    {
      path: "/view_bookings",
      name: "ViewBookings",
      component: () => import("../views/ViewBookings.vue"),
    },
    {
      path: "/map",
      name: "MapPage",
      component: () => import("../views/MapPage.vue"),
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
      path: "/ev-info",
      name: "EVInfoPage",
      component: () => import("../views/EVInfoPage.vue"),
    },
    {
      path: "/plan-page-dev",
      name: "PlanPageDev",
      component: () => import("../views/PlanPageDev.vue"),
    },
    {
      path: "/profile",
      name: "ProfilePage",
      component: () => import("../views/ProfilePage.vue"),
    },
    {
      path: "/ev-info",
      name: "EvInfo",
      component: () => import("../views/EVInfoPage.vue"),
    },
  ],
});

export default router;
