<template>
    <v-app>
        <div v-if="showDisplay">
            <NavBarLogin />
            <div id="top-up-div">
                <p id="greeting">Hi, {{ username }}!</p>
                <p id="available-deposit">Available Deposit: ${{ this.wallet }}</p>
                <p id="notice">A minimum of $30.00 is needed to make a reservation</p>
                <stripe-checkout ref="checkoutRef" mode="payment" :pk="publishableKey" :line-items="lineItems"
                    :success-url="successURL" :cancel-url="cancelURL" @loading="v => loading = v" />
                <v-btn id="btn-style" @click="submit">Top up deposit</v-btn>
            </div>

            <div v-if="uid">
                <div id="history-div">
                    <p id="transactions-header"> Previous Transactions</p>
                </div>
                <br>
                <div>
                    <div v-if="hasPreviousTrans" class="past_booking_records">
                        <div v-for="transaction in pastTransList" :key="transaction.date">
                            <PastTransactionRecord :transDetails="transaction" />
                        </div>
                    </div>
                    <p v-else class="bookings_record_headings">You have no past transactions</p>
                </div>
            </div>
            <div v-else>
                <p class="bookings_record_headings1">You have no past transactions</p>
            </div>
        </div>
        <div v-else>
            <SignInToAccess />
        </div>
    </v-app>
</template>

<script>

import app from "../firebase.js"
import { getAuth, onAuthStateChanged } from '@firebase/auth';
import NavBarLogin from "@/components/NavBarLogin.vue";
import { StripeCheckout } from '@vue-stripe/vue-stripe';
import firebaseApp from '../firebase.js';
import { doc, setDoc, updateDoc, getFirestore, collection, query, where, getDocs, getDoc } from 'firebase/firestore';
import PastTransactionRecord from "../components/PastTransactionRecord.vue";
import SignInToAccess from "../components/SignInToAccess.vue"

/* Still need to fetch user name and available balance from FB */
const db = getFirestore(app);

export default {
    created() {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                this.uid = user.uid;
                this.getUsername(user.uid)
                this.getTransData(user.uid)
                this.showDisplay = true
                this.currentTime()
            }
        })
    },
    components: {
        StripeCheckout, NavBarLogin, PastTransactionRecord, SignInToAccess
    },
    data() {
        this.publishableKey = "pk_test_51M0REtKs5bTKMbCfjEQWxFTwszhZIIWTWg8pCXnnEwI6RxayRk1vYDcTPGJU0kFGuf3xR7EaF3cyBdH8vT2sF9B300H51KnG9d"
        return {
            showDisplay: false,
            loading: false,
            lineItems: [
                {
                    price: "price_1M0S1yKs5bTKMbCfLQG74k21",
                    quantity: 1
                }
            ],
            successURL: 'http://localhost:8080/#/payment-success',
            cancelURL: 'http://localhost:8080/#/payment-error',
            username: "",
            hasPreviousTrans: false,
            pastTransList: [],
            uid: false,
            date: '',
            time: '',
            today: '',
            wallet: ''
        }
    },
    methods: {
        submit() {
            console.log("PAYMENT IS BEING MADE")
            this.date = this.currentDate()
            this.time = this.currentTime()
            this.today = this.getDateTime()
            console.log("Date", this.date)
            console.log("Time", this.time)
            console.log("Datetime", this.today)
            if (this.pastTransList.length > 0) {
                console.log('APPEND TO ENTRY')
                this.createTransactiononFirebase(this.date, this.time)
                this.$refs.checkoutRef.redirectToCheckout()
            } else {
                console.log('CREATING NEW ENTRY')
                this.createNEWTransactiononFirebase(this.date, this.time)
                this.$refs.checkoutRef.redirectToCheckout()
            }
        },
        async getUsername(uid) {
            // const auth = getAuth()
            const db = getFirestore(firebaseApp);
            const userRef = collection(db, "USERS")
            let z = await getDocs(query(userRef, where('user_uid', "==", uid)))
            z.forEach((docs) => {
                let data = docs.data();
                this.username = data.user_name
            }
            )
        },
        async getTransData(uid) {
            console.log("GETTING TRANS DATA")
            console.log(uid)
            const db = getFirestore(firebaseApp);
            // Get all booking records for the user
            // , orderBy("date", "desc")
            const userHistory = doc(db, "Transactions", this.uid)
            const historySnap = await getDoc(userHistory)
            // console.log(historySnap.data())
            this.wallet = 0

            for (const [key, value] of Object.entries(historySnap.data())) {
                console.log(key)
                let docs = value
                // console.log(docs)
                let transDetails = {};
                transDetails.date = docs.date;
                transDetails.time = docs.time;
                transDetails.amount = "$30"
                transDetails.type = docs.type;
                console.log(transDetails)
                this.wallet += 30
                this.pastTransList.push(transDetails)
            }

            this.hasPreviousTrans = this.pastTransList.length > 0;
        },
        async createTransactiononFirebase(inputdate, inputtime) {
            console.log("CREATING TRANSACTION ON FIREBASE")
            console.log(this.uid)
            console.log(db)
            console.log(inputdate)
            console.log(inputtime)
            const timer = this.today
            console.log("TIMER", timer)
            // writes date time as the key
            await updateDoc(doc(db, "Transactions", this.uid),
                {
                    [timer]: {
                        date: inputdate,
                        time: inputtime,
                        uid: this.uid
                    }
                });
            await updateDoc(doc(db, "Transactions", this.uid),
                {
                    [timer]: {
                        date: inputdate,
                        time: inputtime,
                        uid: this.uid,
                        type: "Top Up"
                    }
                });
        },
        async createNEWTransactiononFirebase(inputdate, inputtime) {
            console.log("CREATING TRANSACTION ON FIREBASE")
            console.log(this.uid)
            console.log(db)
            console.log(inputdate)
            console.log(inputtime)
            const timer = this.today
            console.log("TIMER", timer)
            // writes date time as the key
            await setDoc(doc(db, "Transactions", this.uid),
                {
                    [timer]: {
                        date: inputdate,
                        time: inputtime,
                        uid: this.uid,
                        type: "Top Up"
                    }
                });
        },
        currentDate() {
            const current = new Date();
            const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;
            return date;
        },
        currentTime() {
            const today = new Date();
            if (today.getHours() > 12) {
                var hour = today.getHours() - 12
                var pmAM = 'PM'
            } else {
                hour = today.getHours()
                pmAM = 'AM'
            }
            var minutes = today.getMinutes().toString()

            var now_time = (hour + ":" + minutes + " " + pmAM).toString()
            return now_time;
        },
        getDateTime() {
            const today = new Date();
            return today
        }
    }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Nunito&family=Outfit:wght@400;700&display=swap');

#top-up-div {
    margin-top: 80px;
    margin-left: 100px;
    margin-bottom: 80px;
}

#greeting {
    font-family: 'Outfit', 'sans-serif';
    font-weight: 400;
    font-size: 25px;
    margin-bottom: 18px;
}

#available-deposit {
    font-family: 'Outfit', 'sans-serif';
    font-weight: 700;
    font-size: 36px;
}

#notice {
    font-family: 'Outfit', 'sans-serif';
    font-weight: 400;
    font-size: 16px;
    margin-bottom: 30px;
}

#btn-style {
    background-color: #4285f4;
    color: #fff;
    font-family: 'Outfit', sans-serif;
    font-weight: bold;
    text-transform: none;
    width: 450px;
}

#history-div {
    margin-left: 100px;
}

#transactions-header {
    font-family: 'Outfit', 'sans-serif';
    font-weight: 400;
    font-size: 36px;
}

.bookings_record_headings1 {
    font-family: 'Nunito', 'sans-serif';
    font-weight: 700;
    font-size: 22px;
    text-align: left;
    padding-left: 100px;
}
</style>