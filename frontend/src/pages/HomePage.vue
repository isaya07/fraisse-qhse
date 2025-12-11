<template>
  <div class="home">
    <section class="mb-12">
      <div class="surface-card p-8 border-round shadow-2 flex flex-col md:flex-row items-center gap-6">
        <div class="flex-1">
          <h1 class="text-3xl md:text-4xl font-bold mb-4 text-primary">
            <font-awesome-icon :icon="['fas', 'shield-alt']" class="mr-2" />
            Bienvenue dans QHSE Manager
          </h1>
          <h2 class="text-xl md:text-2xl text-color-secondary">Votre solution complète de pilotage QHSE</h2>
        </div>
        <div class="hidden md:block">
            <!-- Optional: Place an illustration or larger icon here -->
             <font-awesome-icon :icon="['fas', 'industry']" class="text-primary opacity-10 text-9xl" />
        </div>
      </div>
    </section>

    <section>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card class="shadow-4 hover:shadow-6 transition-duration-300">
            <template #header>
                <div class="h-4rem bg-blue-500 flex items-center justify-center border-round-top">
                     <font-awesome-icon :icon="['fas', 'file-alt']" size="2x" class="text-white" />
                </div>
            </template>
            <template #title>Gestion Documentaire</template>
            <template #content>
                 <p class="m-0 text-color-secondary">
                    Téléchargez, organisez et validez vos documents QHSE
                  </p>
            </template>
            <template #footer>
                 <Button as="router-link" to="/documents" label="Gérer les documents" class="w-full" />
            </template>
          </Card>

          <Card class="shadow-4 hover:shadow-6 transition-duration-300">
             <template #header>
                <div class="h-4rem bg-cyan-500 flex items-center justify-center border-round-top">
                     <font-awesome-icon :icon="['fas', 'tasks']" size="2x" class="text-white" />
                </div>
            </template>
            <template #title>Plans d'Action</template>
            <template #content>
                  <p class="m-0 text-color-secondary">
                    Créez et suivez vos actions correctives et préventives
                  </p>
            </template>
             <template #footer>
                 <Button as="router-link" to="/actions" label="Gérer les actions" severity="info" class="w-full" />
            </template>
          </Card>

          <Card class="shadow-4 hover:shadow-6 transition-duration-300">
             <template #header>
                <div class="h-4rem bg-green-500 flex items-center justify-center border-round-top">
                     <font-awesome-icon :icon="['fas', 'chart-line']" size="2x" class="text-white" />
                </div>
            </template>
            <template #title>Indicateurs</template>
            <template #content>
                <p class="m-0 text-color-secondary">Suivez vos KPI et tableaux de bord</p>
            </template>
             <template #footer>
                 <Button as="router-link" to="/indicators" label="Gérer les indicateurs" severity="success" class="w-full" />
            </template>
          </Card>
        </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import Card from 'primevue/card';
import Button from 'primevue/button';
</script>

<style scoped>
.surface-card {
    background-color: var(--surface-card);
}
.text-color-secondary {
    color: var(--text-color-secondary);
}
.border-round {
    border-radius: var(--border-radius);
}
.border-round-top {
    border-top-left-radius: var(--border-radius);
    border-top-right-radius: var(--border-radius);
}
</style>
