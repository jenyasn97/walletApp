<template>
  <div class="h-screen flex flex-col justify-center items-center p-8">
    <Card class="max-w-xl w-full shadow-md">
    <CardHeader>
      <CardTitle class="text-xl"> Sign Up </CardTitle>
    </CardHeader>
    <CardContent>
      <div class="grid gap-4">
        <div class="grid grid-cols-2 gap-4">
          <div class="grid gap-2">
            <Label for="first-name">First name</Label>
            <Input id="first-name" placeholder="Max" v-model="firstName" required />
          </div>
          <div class="grid gap-2">
            <Label for="last-name">Last name</Label>
            <Input id="last-name" placeholder="Robinson" v-model="lastName" required />
          </div>
        </div>
        <div class="grid gap-2">
          <Label for="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" v-model="email" required />
        </div>
        <div class="grid gap-2">
          <Label for="password">Password</Label>
          <Input id="password" type="password" v-model="password"/>
        </div>
        <div class="grid gap-2">
          <Label for="confPass">Confirn password</Label>
          <Input id="confPass" type="password" v-model="confirmPass"/>
        </div>
        <Button type="submit" @click="register" class="w-full"> Create an account </Button>
      </div>
      <div class="mt-4 text-center text-sm">
        Already have an account?
        <RouterLink to="/login" class="underline"> Sign in </RouterLink>
      </div>
    </CardContent>
  </Card>
</div>
</template>

<script setup ">
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { addUser } from "@/lib/utils";
import useAuthStore from "@/store/auth";

import { ref } from "vue"
import { useRouter } from "vue-router"


const firstName =ref(null)
const lastName = ref(null)
const email = ref(null)
const password = ref(null)
const confirmPass = ref(null)
const router = useRouter()
const authStore = useAuthStore()

async function register() {
  if(password.value === confirmPass.value){
    try {
    await authStore.auth({ email: email.value, password: password.value })
    await addUser(firstName.value, lastName.value, email.value, authStore.userData.localId)
    if (!authStore.error) router.push("/login")
  } catch (e) {
    console.log(e);
  }
  }
  else{
    alert(`Пароли не совпадают`)
  }
}




</script>
