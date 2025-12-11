<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold text-color mb-6">Mon Profil</h1>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Informations personnelles -->
      <div class="card surface-card p-4 border-round shadow-2">
        <h2 class="text-xl font-semibold mb-4 text-color">Informations personnelles</h2>
        <Form
          v-slot="$form"
          :resolver="profileResolver"
          @submit="onProfileSubmit"
          :initialValues="profileValues"
        >
          <div class="flex flex-col gap-4">
            <div class="flex flex-col gap-2">
              <FloatLabel variant="on">
                <InputText
                  name="username"
                  id="username"
                  type="text"
                  class="w-full"
                  fluid
                  disabled
                />
                <label for="username">Nom d'utilisateur</label>
              </FloatLabel>
              <small class="text-color-secondary">Le nom d'utilisateur ne peut pas être modifié.</small>
            </div>

            <div class="flex flex-col gap-2">
              <FloatLabel variant="on">
                <InputText name="email" id="email" type="email" class="w-full" fluid />
                <label for="email">Email</label>
              </FloatLabel>
              <Message v-if="$form.email?.invalid" severity="error" size="small" variant="simple">
                {{ $form.email.error.message }}
              </Message>
            </div>

            <div class="flex flex-col gap-2">
              <FloatLabel variant="on">
                <InputText name="first_name" id="first_name" type="text" class="w-full" fluid />
                <label for="first_name">Prénom</label>
              </FloatLabel>
              <Message
                v-if="$form.first_name?.invalid"
                severity="error"
                size="small"
                variant="simple"
              >
                {{ $form.first_name.error.message }}
              </Message>
            </div>

            <div class="flex flex-col gap-2">
              <FloatLabel variant="on">
                <InputText name="last_name" id="last_name" type="text" class="w-full" fluid />
                <label for="last_name">Nom</label>
              </FloatLabel>
              <Message
                v-if="$form.last_name?.invalid"
                severity="error"
                size="small"
                variant="simple"
              >
                {{ $form.last_name.error.message }}
              </Message>
            </div>

            <div class="flex justify-end mt-2">
              <Button
                type="submit"
                label="Mettre à jour"
                icon="pi pi-check"
                :loading="profileLoading"
              />
            </div>
          </div>
        </Form>
      </div>

      <!-- Changement de mot de passe -->
      <div class="card surface-card p-4 border-round shadow-2">
        <h2 class="text-xl font-semibold mb-4 text-color">Changer le mot de passe</h2>
        <Form v-slot="$form" :resolver="passwordResolver" @submit="onPasswordSubmit">
          <div class="flex flex-col gap-4">
            <div class="flex flex-col gap-2">
              <FloatLabel variant="on">
                <Password
                  name="current_password"
                  inputId="current_password"
                  :toggleMask="true"
                  :feedback="false"
                  class="w-full"
                  inputClass="w-full"
                  fluid
                />
                <label for="current_password">Mot de passe actuel</label>
              </FloatLabel>
              <Message
                v-if="$form.current_password?.invalid"
                severity="error"
                size="small"
                variant="simple"
              >
                {{ $form.current_password.error.message }}
              </Message>
            </div>

            <div class="flex flex-col gap-2">
              <FloatLabel variant="on">
                <Password
                  name="new_password"
                  inputId="new_password"
                  :toggleMask="true"
                  class="w-full"
                  inputClass="w-full"
                  fluid
                />
                <label for="new_password">Nouveau mot de passe</label>
              </FloatLabel>
              <Message
                v-if="$form.new_password?.invalid"
                severity="error"
                size="small"
                variant="simple"
              >
                {{ $form.new_password.error.message }}
              </Message>
            </div>

            <div class="flex flex-col gap-2">
              <FloatLabel variant="on">
                <Password
                  name="confirm_password"
                  inputId="confirm_password"
                  :toggleMask="true"
                  :feedback="false"
                  class="w-full"
                  inputClass="w-full"
                  fluid
                />
                <label for="confirm_password">Confirmer le mot de passe</label>
              </FloatLabel>
              <Message
                v-if="$form.confirm_password?.invalid"
                severity="error"
                size="small"
                variant="simple"
              >
                {{ $form.confirm_password.error.message }}
              </Message>
            </div>

            <div class="flex justify-end mt-2">
              <Button
                type="submit"
                label="Changer le mot de passe"
                icon="pi pi-lock"
                severity="warn"
                :loading="passwordLoading"
              />
            </div>
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useAppStore } from '@/stores/app'
import { useUserStore } from '@/stores/users'
import { useToast } from 'primevue/usetoast'
import Form from '@primevue/forms/form'
import { zodResolver } from '@primevue/forms/resolvers/zod'
import { z } from 'zod'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Button from 'primevue/button'
import FloatLabel from 'primevue/floatlabel'
import Message from 'primevue/message'

const appStore = useAppStore()
const userStore = useUserStore()
const toast = useToast()

const profileLoading = ref(false)
const passwordLoading = ref(false)

const currentUser = computed(() => appStore.currentUser)

const profileValues = ref({
  username: '',
  email: '',
  first_name: '',
  last_name: '',
})

// Schéma Profil
const profileSchema = z.object({
  email: z.string().email("Format d'email invalide"),
  first_name: z.string().min(2, 'Le prénom est requis'),
  last_name: z.string().min(2, 'Le nom est requis'),
})

const profileResolver = zodResolver(profileSchema)

// Schéma Mot de passe
const passwordSchema = z
  .object({
    current_password: z.string().min(1, 'Le mot de passe actuel est requis'),
    new_password: z.string().min(6, 'Le nouveau mot de passe doit contenir au moins 6 caractères'),
    confirm_password: z.string().min(1, 'La confirmation est requise'),
  })
  .refine((data) => data.new_password === data.confirm_password, {
    message: 'Les mots de passe ne correspondent pas',
    path: ['confirm_password'],
  })

const passwordResolver = zodResolver(passwordSchema)

const loadProfile = () => {
  if (currentUser.value) {
    profileValues.value = {
      username: currentUser.value.username,
      email: currentUser.value.email,
      first_name: currentUser.value.first_name,
      last_name: currentUser.value.last_name,
    }
  }
}

interface FormSubmitEvent {
  valid: boolean
  values: Record<string, unknown>
}

interface PasswordFormValues {
  current_password: string
  new_password: string
  confirm_password: string
}

const onProfileSubmit = async ({ valid, values }: FormSubmitEvent) => {
  if (!valid || !currentUser.value) return

  profileLoading.value = true
  try {
    await userStore.updateUser(currentUser.value.id, values)
    // Mettre à jour le currentUser dans appStore
    appStore.setUser({ ...currentUser.value, ...values })
    toast.add({
      severity: 'success',
      summary: 'Succès',
      detail: 'Profil mis à jour avec succès',
      life: 3000,
      icon: 'check',
    })
  } catch (e) {
    console.log(e)
    toast.add({
      severity: 'error',
      summary: 'Erreur',
      detail: 'Erreur lors de la mise à jour du profil',
      life: 3000,
      icon: 'times',
    })
  } finally {
    profileLoading.value = false
  }
}

const onPasswordSubmit = async ({ valid, values }: FormSubmitEvent) => {
  if (!valid || !currentUser.value) return

  // Cast the values to the correct type
  const passwordValues = values as unknown as PasswordFormValues
  
  passwordLoading.value = true
  try {
    // Note: Il faudrait idéalement un endpoint spécifique pour changer le mot de passe
    // Pour l'instant, on utilise updateUser, mais le backend doit gérer la vérification du mot de passe actuel
    // Si le backend ne le gère pas encore, cela risque d'échouer ou de ne pas être sécurisé
    // TODO: Implémenter endpoint change-password côté backend

    // En attendant, on simule ou on envoie juste le nouveau password si l'admin/user a le droit
    await userStore.updateUser(currentUser.value.id, {
      password: passwordValues.new_password,
    })

    toast.add({
      severity: 'success',
      summary: 'Succès',
      detail: 'Mot de passe modifié avec succès',
      life: 3000,
      icon: 'check',
    })
  } catch (error: unknown) {
    toast.add({
      severity: 'error',
      summary: 'Erreur',
      detail:
        (error as { message?: string }).message || 'Erreur lors du changement de mot de passe',
      life: 3000,
      icon: 'times',
    })
  } finally {
    passwordLoading.value = false
  }
}

onMounted(() => {
  loadProfile()
})
</script>
