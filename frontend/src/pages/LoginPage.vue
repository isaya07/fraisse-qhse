<template>
  <div class="login">
    <section class="section">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-5-tablet is-4-desktop is-3-widescreen">
            <div class="box">
              <h1 class="title is-3 has-text-centered">Connexion</h1>
              <form @submit.prevent="handleSubmit">
                <div class="field">
                  <label class="label">Nom d'utilisateur</label>
                  <div class="control has-icons-left">
                    <input
                      v-model="username"
                      class="input"
                      type="text"
                      placeholder="Votre nom d'utilisateur"
                      required
                    />
                    <span class="icon is-small is-left">
                      <font-awesome-icon :icon="['fas', 'user']" />
                    </span>
                  </div>
                </div>
                <div class="field">
                  <label class="label">Mot de passe</label>
                  <div class="control has-icons-left">
                    <input
                      v-model="password"
                      class="input"
                      type="password"
                      placeholder="Votre mot de passe"
                      required
                    />
                    <span class="icon is-small is-left">
                      <font-awesome-icon :icon="['fas', 'lock']" />
                    </span>
                  </div>
                </div>
                <div class="field">
                  <div class="control">
                    <button
                      :disabled="loading"
                      class="button is-success is-fullwidth"
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
                <div v-if="error" class="notification is-danger mt-3">
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
.mr-2 {
  margin-right: 0.5rem;
}
.mt-3 {
  margin-top: 0.75rem;
}
</style>
