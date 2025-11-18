<template>
  <div class="login">
    <section class="py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-center">
          <div class="w-full max-w-md">
            <div class="bg-white p-8 rounded-lg shadow-md">
              <h1 class="text-2xl font-bold text-center mb-6">Connexion</h1>
              <form @submit.prevent="handleSubmit">
                <div class="mb-4">
                  <label class="block text-gray-700 text-sm font-bold mb-2"
                    >Nom d'utilisateur</label
                  >
                  <div class="relative">
                    <input
                      v-model="username"
                      class="shadow appearance-none border rounded w-full py-2 px-3 pr-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="text"
                      placeholder="Votre nom d'utilisateur"
                      required
                    />
                    <div
                      class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
                    >
                      <font-awesome-icon :icon="['fas', 'user']" class="text-gray-400" />
                    </div>
                  </div>
                </div>
                <div class="mb-6">
                  <label class="block text-gray-700 text-sm font-bold mb-2">Mot de passe</label>
                  <div class="relative">
                    <input
                      v-model="password"
                      class="shadow appearance-none border rounded w-full py-2 px-3 pr-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="password"
                      placeholder="Votre mot de passe"
                      required
                    />
                    <div
                      class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
                    >
                      <font-awesome-icon :icon="['fas', 'lock']" class="text-gray-400" />
                    </div>
                  </div>
                </div>
                <div class="mb-4">
                  <div class="control">
                    <button
                      :disabled="loading"
                      class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full focus:outline-none focus:shadow-outline disabled:opacity-50"
                      type="submit"
                    >
                      <font-awesome-icon
                        v-if="loading"
                        :icon="['fas', 'spinner']"
                        spin
                        class="mr-2"
                      />
                      <font-awesome-icon v-else :icon="['fas', 'sign-in-alt']" class="mr-2" />
                      Se connecter
                    </button>
                  </div>
                </div>

                <!-- Affichage des erreurs -->
                <div
                  v-if="error"
                  class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mt-3"
                >
                  {{ error }}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAppStore } from '../stores/app'

const router = useRouter()
const store = useAppStore()

const username = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')

const handleSubmit = async () => {
  loading.value = true
  error.value = ''

  const result = await store.login({
    username: username.value,
    password: password.value,
  })

  loading.value = false

  if (result.success) {
    // Redirection après connexion réussie
    router.push('/')
  } else {
    error.value = result.message || 'Identifiants incorrects'
  }
}
</script>

<style scoped>
.login {
  min-height: 100vh;
}
</style>
