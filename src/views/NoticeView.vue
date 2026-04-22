<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const routeAndQuery = computed(() => {
  const path = route.path || '/'
  const query = route.fullPath.includes('?') ? route.fullPath.slice(route.fullPath.indexOf('?')) : ''
  return `${path}${query}`
})

const hasLegacyUrlParts = computed(() => {
  return route.path !== '/' || Boolean(route.query && Object.keys(route.query).length)
})

const mybinderHref = computed(() => `https://mybinder.org${routeAndQuery.value}`)
const nectarHref = computed(() => `https://binderhub.rc.nectar.org.au${routeAndQuery.value}`)
</script>

<template>
  <main class="page">
    <section class="card" aria-labelledby="notice-title">
      <p class="eyebrow">Service Update</p>
      <h1 id="notice-title">This BinderHub endpoint has been decommissioned.</h1>
      <p v-if="hasLegacyUrlParts" class="lead">
        You can continue using your existing Binder launch URL by choosing one of the destinations below.
        The launch path and query parameters from your current URL are preserved.
      </p>

      <div v-if="hasLegacyUrlParts" class="url-parts" aria-live="polite">
        <p class="label">Detected URL parts from your old link:</p>
        <code>{{ routeAndQuery }}</code>
      </div>

      <p class="chooser">Please select one of the available options below to continue.</p>

      <div class="actions">
        <a :href="mybinderHref" class="action action-primary">
          <span class="action-title">Open mybinder.org</span>
          <span class="action-url">{{ mybinderHref }}</span>
          <span class="action-note"
            >No authentication required. Uses shared public infrastructure with limited compute capacity and
            session duration.</span
          >
        </a>

        <a :href="nectarHref" class="action action-secondary">
          <span class="action-title">Open binderhub.rc.nectar.org.au</span>
          <span class="action-url">{{ nectarHref }}</span>
          <span class="action-note"
            >Requires authentication with an eligible Australian or New Zealand university identity. Compute
            capacity and quotas are limited.</span
          >
        </a>
      </div>

      <footer class="partners" aria-label="Partner logos">
        <img src="/logos/ldaca.svg" alt="LDaCA" class="partner-logo" loading="lazy" />
        <img src="/logos/ardc.svg" alt="ARDC" class="partner-logo ardc-logo" loading="lazy" />
      </footer>
    </section>
  </main>
</template>
