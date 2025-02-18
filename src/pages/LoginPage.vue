<template>
  <div class="h-screen flex flex-col justify-center items-center p-8">
    <Card class="max-w-xl w-full shadow-md">
      <CardHeader>
        <CardTitle class="text-2xl"> Login </CardTitle>
      </CardHeader>
      <CardContent>
        <div class="grid gap-4">
          <div class="grid gap-2">
            <Label for="email">Email</Label>
            <Input id="email" type="email" placeholder="m@example.com" v-model="email" required />
          </div>
          <div class="grid gap-2">
            <div class="flex items-center">
              <Label for="password">Password</Label>
            </div>
            <Input id="password" type="password" v-model="password" required />
          </div>
          <Button type="submit" @click="loginApp" class="w-full"> Login </Button>
        </div>
        <div class="mt-4 text-center text-sm">
          Don't have an account?
          <RouterLink to="/signup" class="underline"> Sign up </RouterLink>
        </div>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
import useAuthStore from "@/store/auth";
const authStore = useAuthStore();

const email = ref(null);
const password = ref(null);

async function loginApp() {
  try {
    await authStore.auth({ email: email.value, password: password.value }, "login");
    router.push("/");
  } catch (e) {
    console.log(e);
  }
}


</script>
