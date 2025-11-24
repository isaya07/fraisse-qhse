<template>
  <div class="flex items-center justify-center h-screen">
    <Card class="px-6 py-20 md:px-20 lg:px-80">
      <template #title>
        <div class="flex items-center gap-4 pb-8">
          <font-awesome-icon :icon="['fas', 'shield-alt']" size="3x" class="mr-2" />
          <span class="text-3xl font-bold">QHSE Manager</span>
        </div>
      </template>
      <template #content>
        <Form v-slot="$form" :resolver="resolver" @submit="onFormSubmit">
          <div class="flex flex-col gap-6 w-full">
            <div class="flex flex-col gap-2 w-full">
              <FloatLabel variant="on">
                <InputText
                  name="email"
                  id="email"
                  type="email"
                  size="large"
                  class="w-full px-3 py-2 shadow-sm rounded-lg"
                  fluid
                />
                <label for="email">Email</label>
              </FloatLabel>
              <Message v-if="$form.email?.invalid" severity="error" size="small" variant="simple">{{
                $form.email.error.message
              }}</Message>
            </div>
            <div class="flex flex-col gap-2 w-full">
              <FloatLabel variant="on">
                <Password
                  id="password"
                  name="password"
                  size="large"
                  :toggleMask="true"
                  :feedback="false"
                  input-class="w-full px-3 py-2 shadow-sm rounded-lg"
                  fluid
                />
                <label for="password">Mot de passe</label>
              </FloatLabel>
              <Message
                v-if="$form.password?.invalid"
                severity="error"
                size="small"
                variant="simple"
                >{{ $form.password.error.message }}</Message
              >
            </div>
            <div class="flex flex-col gap-2 w-full">
              <Button
                label="Connexion"
                type="submit"
                size="large"
                fluid
                class="w-full py-2 rounded-lg flex justify-center items-center gap-2"
              >
                <template #icon>
                  <font-awesome-icon v-if="loading" :icon="['fas', 'spinner']" spin class="mr-2" />
                  <font-awesome-icon v-else :icon="['fas', 'sign-in-alt']" class="mr-2" />
                </template>
              </Button>
            </div>
          </div>
        </Form>
      </template>
    </Card>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAppStore } from '../stores/app'
import Form from '@primevue/forms/form'
import { zodResolver } from '@primevue/forms/resolvers/zod'
import { z } from 'zod'
import { Password } from 'primevue'

const router = useRouter()
const store = useAppStore()

const loading = ref(false)
const error = ref('')

// Définir les types pour les fonctions
interface FormValues {
  email?: string
  password?: string
}

const resolver = zodResolver(
  z.object({
    email: z.string().min(1, { message: "L'email est requis." }).email("Format d'email invalide."),
    password: z.string().min(1, { message: 'Le mot de passe est requis.' }),
  }),
)

const onFormSubmit = async (params: { valid: boolean; values: FormValues }) => {
  if (params.valid) {
    loading.value = true
    error.value = ''

    const result = await store.login({
      email: params.values.email || '',
      password: params.values.password || '',
    })

    loading.value = false

    if (result.success) {
      // Redirection après connexion réussie
      router.push('/')
    } else {
      error.value = result.message || 'Identifiants incorrects'
    }
  }
}
</script>
