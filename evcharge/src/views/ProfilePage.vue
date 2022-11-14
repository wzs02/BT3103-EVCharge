<template>
    <v-app>
    <NavBarLogin />
    <div class="page-holder bg-gray-100">
          <div class="container-fluid px-lg-4 px-xl-5 contentDiv">
                <!-- Page Header-->
            <br>
            <section>
                <div class="row">
                    <div class="col-lg-4">


                      <div class="card card-profile mb-4">
                        <div class="card-body text-center">
                          <h3 class="mb-3">Welcome, {{ currusername }}!</h3>
                        </div>
                      </div>

                <form class="card mb-4">
                    <div class="card-header">
                      <h4 class="card-heading">My Profile</h4>
                      <!-- <h6 class="mb-3">Welcome, {{ username }}!</h6> -->
                    </div>
                    <div class="card-body">
                        <div class="row mb-3">
                            <div class="col">
                                <label class="form-label">Name: <strong>{{ currusername }}</strong></label>
                            </div>
                        </div>
                        
                        <div class="row mb-3">
                            <div class="col">
                                <label class="form-label">Email: <strong>{{ curremail }}</strong></label>
                            </div>
                        </div>

                        <div class="row mb-3">
                            <div class="col">
                                <label class="form-label">Plate Number: <strong>{{ currplate }}</strong></label>
                            </div>
                        </div>
                        
                        <div class="row mb-3">
                            <div class="col">
                                <label class="form-label">Vehicle Brand: <strong>{{ currbrand }}</strong></label>
                            </div>
                        </div>

                        <div class="row mb-3">
                            <div class="col">
                                <label class="form-label">Vehicle Model: <strong>{{ currmodel }}</strong></label>
                            </div>
                        </div>

                    </div>
                </form>
                </div>


                <div class="col-lg-8">
                    <form class="card mb-4">
                    <div class="card-header">
                      <h4 class="card-heading">Edit Profile</h4>
                    </div>

                    <div class="card-body">
                      <div class="row">

                        <div class="col-md-6">
                          <div class="mb-4">
                            <label class="form-label">Name</label>
                            <input id= "myInput" class="form-control" type="text" placeholder="How do we address you?" v-model="username">
                          </div>
                        </div>
                        
                        <div class="col-sm-6 col-md-6">
                          <div class="mb-4">
                            <label class="form-label">Vehicle Plate Number</label>
                            <input class="form-control" type="text" placeholder="Your EV's License Plate Number" v-model="plate">
                          </div>
                        </div>

                        <div class="col-sm-6 col-md-6">
                          <div class="mb-4">
                            <label class="form-label">Vehicle Brand</label>
                            <input class="form-control" type="text" placeholder="Your EV's brand" v-model="brand">
                          </div>
                        </div>

                        <div class="col-sm-6 col-md-6">
                          <div class="mb-4">
                            <label class="form-label">Vehicle Model</label>
                            <input class="form-control" type="text" placeholder="Your EV's model" v-model="model">
                          </div>
                        </div>
                        
                      </div>
                    </div>

                    <div class="card-footer text-end">
                      <v-btn class="update-details" @click="submit">Update Profile</v-btn>
                    </div>

                  </form>
                </div>
              </div>
            </section>
          </div>
        </div>
    </v-app>      
</template>
  
<script>
//importing bootstrap 5 Modules
import app from "../firebase.js"
import "bootstrap/dist/css/bootstrap.min.css";
import NavBarLogin from "@/components/NavBarLogin.vue";
import { getAuth, onAuthStateChanged } from '@firebase/auth';
import { doc ,setDoc ,getFirestore, collection, query, where, getDocs} from 'firebase/firestore';
import firebaseApp from '../firebase.js';


const db = getFirestore(app);


export default {
    created() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.uid = user.uid;
        this.getUsername(user.uid)
        console.log("UID",this.uid)
      }
    })
    },
    components: {
        NavBarLogin
    },
    data() {
        return {

            username: "",
            uid: false,
            brand: "",
            email: "",
            model: "",
            plate: "",
            currusername: "",
            currbrand: "",
            curremail: "",
            currmodel: "",
            currplate: ""
        }
    },
    methods: {
        async submit() {
            console.log("UPDATING ON FIREBASE")
            console.log("USERNAME", this.username)
            console.log(this.plate)
            console.log(this.brand)
            console.log(this.model)
            let isExecuted = confirm("Do you want to confirm your changes?");
            if (isExecuted == true) {
              await setDoc(doc(db, "USERS", this.uid), 
              {
                user_brand: this.brand,
                user_email: this.email,
                user_model: this.model,
                user_name: this.username,
                user_uid: this.uid,
                user_plate: this.plate
              });
              window.location.reload();
              alert('Your profile details has been updated.')
            } else {
              console.log("User did not confirm changes")
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
                this.brand = data.user_brand
                this.model = data.user_model
                this.email = data.user_email
                this.plate = data.user_plate
                this.currusername = data.user_name
                this.currbrand = data.user_brand
                this.currmodel = data.user_model
                this.curremail = data.user_email
                this.currplate = data.user_plate
                console.log("NAME",this.username)
            }
            )
        },
    }
}

</script>


<style>

.card-header:first-child {
  border-radius: calc(1rem - 1px) calc(1rem - 1px) 0 0;
}
.card-header {
  position: relative;
  padding: 2rem 2rem;
  border-bottom: none;
  background-color: white;
  box-shadow: 0 0.125rem 0.25rem rgb(0 0 0 / 8%);
  z-index: 2;
  background-color: #4285f4;
  color: white
}
.card {
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border: none;
  box-shadow: 0 0.5rem 1rem rgb(0 0 0 / 15%);
  border-radius: 1rem;
}
.bg-gray-100 {
  background-color: #f8f9fa !important;
}
body{
  font-family: 'Poppins'!important;
}
.text-primary {
  color: #4650dd !important;
}
h1, .h1, h2, .h2, h3, .h3, h4, .h4, h5, .h5, h6, .h6 {

  line-height: 1.2;
}
.text-muted {
  color: #6c757d !important;
}

.lead {
  font-size: 1.125rem;
  font-weight: 300;
}
.text-sm {
  font-size: .7875rem !important;
}
h3, .h3 {
  font-size: 1.575rem;
}
.page-holder {
  display: flex;
  overflow-x: hidden;
  width: 100%;
  min-height: calc(100vh - 72px);

  flex-wrap: wrap;
}
a {
  color: #4650dd!important;
  text-decoration: underline!important;
  cursor: pointer;
}

.form-control
{
  color: #343a40;
}
.page-heading {
  text-transform: uppercase;
  letter-spacing: 0.2em;
  font-weight: 300;
}
.contentDiv
{
  padding-top: 4rem;
}
.card-header {
  height: 4rem;
  background-position: center center;
  background-size: cover;
}

.card-profile{
  height: 7rem;
  padding-top: 50px;
  margin-top: -80px;
}

.update-details{
  text-transform: none;
  background-color: #6fa6ff;
  color: #FFFFFF;
  font-family: 'Outfit';
  font-weight: 900;
  font-size: 15px;
}

</style>
