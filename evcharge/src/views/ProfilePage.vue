<template>
  <v-app>
    <div v-if="showDisplay">
      <NavBarLogin />
      <div class="page-holder bg-gray-100">
        <div class="container-fluid px-lg-4 px-xl-5 contentDiv">
          <!-- Page Header-->
          <br>
          <section>
            <div class="row">
              <div class="col-lg-4">
                <div class="card card-profile mb-4">
                  <div class="card-header"
                    style="background-image: url(https://therichpost.com/wp-content/uploads/2021/05/bootstrap5-carousel-slider-img1.jpg);">
                  </div>
                  <div class="card-body text-center"><img class="card-profile-img"
                      src="https://therichpost.com/wp-content/uploads/2021/03/avatar2.png" alt="Jassa Rich">
                    <h3 class="mb-3">Welcome, {{ username }}!</h3>
                  </div>
                </div>

                <form class="card mb-4">
                  <div class="card-header">
                    <h4 class="card-heading">My Profile</h4>
                  </div>
                  <div class="card-body">
                    <div class="row mb-3">
                      <div class="col">
                        <label class="form-label">Name: <strong>{{ "Nathaniel Han" }}</strong></label>
                      </div>
                    </div>

                    <div class="row mb-3">
                      <div class="col">
                        <label class="form-label">Name: <strong>{{ "Nathaniel Han" }}</strong></label>
                      </div>
                    </div>

                    <div class="row mb-3">
                      <div class="col">
                        <label class="form-label">Name: <strong>{{ "Nathaniel Han" }}</strong></label>
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
                      <div class="col-md-5">
                        <div class="mb-4">
                          <label class="form-label">Company</label>
                          <input class="form-control" type="text" placeholder="Company" value="Jassa Rich">
                        </div>
                      </div>
                      <div class="col-sm-6 col-md-3">
                        <div class="mb-4">
                          <label class="form-label">Username</label>
                          <input class="form-control" type="text" placeholder="Username" value="Jassa">
                        </div>
                      </div>
                      <div class="col-sm-6 col-md-4">
                        <div class="mb-4">
                          <label class="form-label">Email address</label>
                          <input class="form-control" type="email" placeholder="Email">
                        </div>
                      </div>
                      <div class="col-sm-6 col-md-6">
                        <div class="mb-4">
                          <label class="form-label">First Name</label>
                          <input class="form-control" type="text" placeholder="First name">
                        </div>
                      </div>
                      <div class="col-sm-6 col-md-6">
                        <div class="mb-4">
                          <label class="form-label">Last Name</label>
                          <input class="form-control" type="text" placeholder="Last Name">
                        </div>
                      </div>
                      <div class="col-md-12">
                        <div class="mb-4">
                          <label class="form-label">Address</label>
                          <input class="form-control" type="text" placeholder="Home Address">
                        </div>
                      </div>
                      <div class="col-sm-6 col-md-4">
                        <div class="mb-4">
                          <label class="form-label">City</label>
                          <input class="form-control" type="text" placeholder="City">
                        </div>
                      </div>
                      <div class="col-sm-6 col-md-3">
                        <div class="mb-4">
                          <label class="form-label">ZIP</label>
                          <input class="form-control" type="number" placeholder="ZIP">
                        </div>
                      </div>
                      <div class="col-md-5">
                        <div class="mb-4">
                          <label class="form-label">Country</label>
                          <select class="form-control custom-select">
                            <option value="">UK</option>
                            <option value="">US</option>
                          </select>
                        </div>
                      </div>
                      <div class="col-md-12">
                        <div class="mb-0">
                          <label class="form-label">About Me</label>
                          <textarea class="form-control" rows="5"
                            placeholder="Here can be your description">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</textarea>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="card-footer text-end">
                    <button class="btn btn-primary" type="submit">Update Profile</button>
                  </div>
                </form>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
    <div v-else>
      <SignInToAccess />
    </div>
  </v-app>
</template>
  
<script>

//importing bootstrap 5 Modules
import "bootstrap/dist/css/bootstrap.min.css";
import NavBarLogin from "@/components/NavBarLogin.vue";
import SignInToAccess from "@/components/SignInToAccess.vue";
import { getAuth, onAuthStateChanged } from '@firebase/auth';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import firebaseApp from '../firebase.js';


export default {
  created() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.uid = user.uid;
        this.showDisplay = true;
        this.getUsername(user.uid)
        console.log("UID", this.uid)
      }
    })
  },
  components: {
    NavBarLogin, SignInToAccess
  },
  data() {
    return {
      showDisplay: false,
      username: "",
      uid: false,
    }
  },
  methods: {
    async getUsername(uid) {
      // const auth = getAuth()
      const db = getFirestore(firebaseApp);
      const userRef = collection(db, "USERS")
      let z = await getDocs(query(userRef, where('user_uid', "==", uid)))
      z.forEach((docs) => {
        let data = docs.data();
        this.username = data.user_name
        console.log("NAME", this.username)
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

body {
  font-family: 'Poppins' !important;
}

.text-primary {
  color: #4650dd !important;
}

h1,
.h1,
h2,
.h2,
h3,
.h3,
h4,
.h4,
h5,
.h5,
h6,
.h6 {

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

h3,
.h3 {
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
  color: #4650dd !important;
  text-decoration: underline !important;
  cursor: pointer;
}

.card-profile-img {
  position: relative;
  max-width: 8rem;
  margin-top: -6rem;
  margin-bottom: 1rem;
  border: 3px solid #fff;
  border-radius: 100%;
  box-shadow: 0 0.5rem 1rem rgb(0 0 0 / 15%);
  z-index: 2;
}

img,
svg {
  vertical-align: middle;
}

.avatar.avatar-lg {
  width: 5rem;
  height: 5rem;
  line-height: 5rem;
}

.avatar {
  display: inline-block;
  position: relative;
  width: 3rem;
  height: 3rem;
  text-align: center;
  border: #dee2e6;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 0.5rem 1rem rgb(0 0 0 / 15%);
  line-height: 3rem;
}

.form-control {
  color: #343a40;
}

.page-heading {
  text-transform: uppercase;
  letter-spacing: 0.2em;
  font-weight: 300;
}

.contentDiv {
  padding-top: 4rem;
}

.card-profile .card-header {
  height: 9rem;
  background-position: center center;
  background-size: cover;
}
</style>
