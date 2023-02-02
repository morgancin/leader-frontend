<template>
    <form @submit.prevent="addUser">
              <div class="mt-3">
                  <label for="name" class="form-label">Name</label>
                  <input id="name" v-model="name" type="text" class="form-control" placeholder="Name" />
              </div>
              <div class="mt-3">
                  <label for="last_name" class="form-label">Last Name</label>
                  <input id="last_name" v-model="last_name" type="text" class="form-control" placeholder="Last Name" />
              </div>
              <div class="mt-3">
                  <label for="email" class="form-label">email</label>
                  <input id="email" v-model="email" type="email" class="form-control" placeholder="example@gmail.com" />
              </div>
              
              <div class="mt-3">
                  <label for="password" class="form-label">Password</label>
                  <input id="password" v-model="password" type="password" class="form-control" placeholder="**********" />
              </div>
              <button type="button" @click="headerFooterModalPreview = false" class="btn btn-outline-secondary w-20 mr-1">
                Cancel
            </button>
            <button type="button" class="btn btn-primary w-20">
                Send
            </button>
            </form>
</template>

<script >
import { ref } from "vue";

// const deleteConfirmationModal = ref(false);
const headerFooterModalPreview = ref(false);

export default {
  name: 'Main',
  data(){
    return {
      name: '',
      last_name: '',
      email: '',
      password: '',
      users: [],
    }
  },
  methods: {
    addUser(){
      // const prospectos = []
      const data = {
        name: this.name,
        last_name: this.last_name,
        email: this.email,
        password: this.password,
      }
        this.users.push(data)
        this.name = '',
        this.last_name = '',
        this.email = '',
        this.password = '',
        console.log(users);
    }
  }

}
</script>
