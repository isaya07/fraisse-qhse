<template>
  <div class="home">
    <section class="hero is-primary">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            <font-awesome-icon :icon="['fas', 'shield-alt']" />
            Bienvenue dans QHSE Manager
          </h1>
          <h2 class="subtitle">Votre solution complète de pilotage QHSE</h2>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="columns is-multiline">
          <div class="column is-4">
            <div class="card">
              <div class="card-content">
                <div class="media">
                  <div class="media-left">
                    <span class="icon is-large has-text-primary">
                      <font-awesome-icon :icon="['fas', 'file-alt']" size="2x" />
                    </span>
                  </div>
                  <div class="media-content">
                    <p class="title is-4">Gestion Documentaire</p>
                    <p class="subtitle is-6">
                      Téléchargez, organisez et validez vos documents QHSE
                    </p>
                  </div>
                </div>
                <div class="content">
                  <router-link to="/documents" class="button is-primary"
                    >Gérer les documents</router-link
                  >
                </div>
              </div>
            </div>
          </div>

          <div class="column is-4">
            <div class="card">
              <div class="card-content">
                <div class="media">
                  <div class="media-left">
                    <span class="icon is-large has-text-info">
                      <font-awesome-icon :icon="['fas', 'tasks']" size="2x" />
                    </span>
                  </div>
                  <div class="media-content">
                    <p class="title is-4">Plans d'Action</p>
                    <p class="subtitle is-6">
                      Créez et suivez vos actions correctives et préventives
                    </p>
                  </div>
                </div>
                <div class="content">
                  <router-link to="/actions" class="button is-info">Gérer les actions</router-link>
                </div>
              </div>
            </div>
          </div>

          <div class="column is-4">
            <div class="card">
              <div class="card-content">
                <div class="media">
                  <div class="media-left">
                    <span class="icon is-large has-text-success">
                      <font-awesome-icon :icon="['fas', 'chart-line']" size="2x" />
                    </span>
                  </div>
                  <div class="media-content">
                    <p class="title is-4">Indicateurs</p>
                    <p class="subtitle is-6">Suivez vos KPI et tableaux de bord</p>
                  </div>
                </div>
                <div class="content">
                  <router-link to="/indicators" class="button is-success"
                    >Gérer les indicateurs</router-link
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
// Ce composant n'a pas besoin de logique spécifique pour l'instant
</script>
