<template>
  <div class="bg-surface-50 dark:bg-surface-950 px-6 py-20 md:px-20 lg:px-80">
    <div
      class="bg-surface-0 dark:bg-surface-900 p-8 md:p-12 shadow-sm rounded-2xl w-full max-w-sm mx-auto flex flex-col gap-8"
    >
      <div class="flex flex-col items-center gap-4">
        <div class="flex items-center gap-4">
          <font-awesome-icon :icon="['fas', 'shield-alt']" size="3x" class="mr-2" />
          <span class="text-3xl font-bold">QHSE Manager</span>
        </div>
        <div class="flex flex-col items-center gap-2 w-full">
          <div
            class="text-surface-900 dark:text-surface-0 text-2xl font-semibold leading-tight text-center w-full"
          >
            Bonjours
          </div>
        </div>
      </div>
      <Form v-slot="$form" :resolver="resolver" @submit="onFormSubmit">
        <div class="flex flex-col gap-6 w-full">
          <div class="flex flex-col gap-2 w-full">
            <FloatLabel variant="on">
              <InputText
                name="username"
                id="username"
                type="text"
                size="large"
                class="w-full px-3 py-2 shadow-sm rounded-lg"
                fluid
              />
              <label for="username">Nom d'utilisateur</label>
            </FloatLabel>
            <Message
              v-if="$form.username?.invalid"
              severity="error"
              size="small"
              variant="simple"
              >{{ $form.username.error.message }}</Message
            >
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
    </div>
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

// const username = ref('')
// const password = ref('')
const loading = ref(false)
const error = ref('')

// Définir les types pour les fonctions
interface FormValues {
  username?: string
  password?: string
}

/* interface FormErrors {
  username?: Array<{ message: string }>
  password?: Array<{ message: string }>
} */

const resolver = zodResolver(
  z.object({
    username: z
      .string("Le nom d'utilisateur est requis.")
      .min(5, { message: "Le nom d'utilisateur est trop court." }),
    password: z
      .string('Le mot de passe est requis.')
      .min(1, { message: 'Le mot de passe est requis.' }),
  }),
)

/* const formResolver = (params: { values: FormValues }) => {
  const errors: FormErrors = {}

  if (!params.values.username) {
    errors.username = [{ message: "Le nom d'utilisateur est requis." }]
  }

  if (!params.values.password) {
    errors.password = [{ message: 'Le mot de passe est requis.' }]
  }

  return {
    values: params.values,
    errors,
  }
} */

const onFormSubmit = async (params: { valid: boolean; values: FormValues }) => {
  if (params.valid) {
    loading.value = true
    error.value = ''

    const result = await store.login({
      username: params.values.username || '',
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
