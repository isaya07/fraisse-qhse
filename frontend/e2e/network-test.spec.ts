/**
 * Test de login avec inspection des requêtes réseau
 */

import { test, expect } from '@playwright/test'

test('Login with network inspection', async ({ page }) => {
  // Capturer les requêtes réseau
  const requests: any[] = []
  const responses: any[] = []

  page.on('request', (request) => {
    if (request.url().includes('/api/')) {
      requests.push({
        url: request.url(),
        method: request.method(),
        postData: request.postData(),
      })
      console.log('→ REQUEST:', request.method(), request.url())
    }
  })

  page.on('response', async (response) => {
    if (response.url().includes('/api/')) {
      const body = await response.text().catch(() => 'Unable to read body')
      responses.push({
        url: response.url(),
        status: response.status(),
        body: body.substring(0, 200),
      })
      console.log('← RESPONSE:', response.status(), response.url())
      console.log('  Body:', body.substring(0, 200))
    }
  })

  console.log('Going to login page...')
  await page.goto('/login', { waitUntil: 'networkidle' })
  await page.waitForTimeout(2000)

  console.log('Filling form...')
  await page.fill('input#email, input[name="email"]', 'admin@qhse.local')
  await page.fill('input#password, input[name="password"], input[type="password"]', 'password')

  await page.waitForTimeout(500)

  console.log('Submitting form...')
  await page.click('button[type="submit"]')

  console.log('Waiting a bit for network requests...')
  await page.waitForTimeout(5000)

  console.log('\n=== SUMMARY ===')
  console.log('Requests made:', requests.length)
  console.log('Responses received:', responses.length)
  console.log('Current URL:', page.url())

  // Log all requests
  console.log('\n=== ALL API REQUESTS ===')
  requests.forEach((req, i) => {
    console.log(`${i + 1}. ${req.method} ${req.url}`)
    if (req.postData) {
      console.log(`   Data: ${req.postData.substring(0, 100)}`)
    }
  })

  console.log('\n=== ALL API RESPONSES ===')
  responses.forEach((res, i) => {
    console.log(`${i + 1}. ${res.status} ${res.url}`)
    console.log(`   Body: ${res.body}`)
  })
})
