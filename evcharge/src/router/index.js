import { createRouter, createWebHashHistory } from "vue-router"
import { getAuth, onAuthStateChanged} from "firebase/auth"

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
    {
        path: '/',
        name: 'AboutPage',
        component: () => import('../views/AboutPage.vue'),
    },
    {
        path: '/signup',
        name:'SignUp',
        component: () => import('../views/SignUp.vue'),
    },
    {
        path: '/login',
        name:'LogIn',
        component: () => import('../views/LogIn.vue'),
    },
    {
        path: '/TesterFile',
        name:'TesterFile',
        component: () => import('../views/TesterFile.vue'),
        meta: {
            requiresAuth: true,
        }
    }
],
})

const getCurrentUser = () => {
    return new Promise((resolve) => {
        const removeListener = onAuthStateChanged(
            getAuth(),
            (user) => {
                removeListener();
                resolve(user);
            }
        )
    })
};


router.beforeEach(async (to, from ,next) => {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
        if (await getCurrentUser()) {
            next();
        } else{
            alert("You are not signed in, please create an account!");
            next("/signup");
        }
    } else {
        next();
    }
});

export default router;