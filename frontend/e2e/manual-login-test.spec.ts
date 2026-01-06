/**
 * Test manuel de login SANS utiliser les fixtures
 * Pour isoler le problème
 */

import { test, expect } from '@playwright/test'

test('Manual login test', async ({ page }) => {
  console.log('1. Going to login page...')
  await page.goto('/login', { waitUntil: 'networkidle' })

  console.log('2. Waiting for form...')
  await page.waitForLoadState('domcontentloaded')
  await page.waitForTimeout(2000) // Attendre que Vue/PrimeVue se montent

  console.log('3. Taking screenshot of login page...')
  await page.screenshot({ path: 'manual-login-1-form.png', fullPage: true })

  console.log('4. Filling email...')
  const emailInput = page.locator('input#email, input[name="email"]').first()
  await emailInput.fill('admin@qhse.local')

  console.log('5. Filling password...')
  const passwordInput = page
    .locator('input#password, input[name="password"], input[type="password"]')
    .first()
  await passwordInput.fill('password')

  console.log('6. Taking screenshot before submit...')
  await page.screenshot({ path: 'manual-login-2-filled.png', fullPage: true })

  console.log('7. Clicking submit button...')
  const submitButton = page.locator('button[type="submit"]')
  await submitButton.click()

  console.log('8. Waiting for navigation...')
  // Attendre soit la redirection, soit une erreur
  await Promise.race([
    page.waitForURL('/', { timeout: 10000 }).then(() => console.log('Redirected to /')),
    page
      .waitForSelector('.p-message-error, .p-error', { timeout: 10000 })
      .then(() => console.log('Error message appeared')),
  ]).catch((e) => {
    console.log('Neither redirect nor error:', e.message)
  })

  console.log('9. Current URL:', page.url())
  await page.screenshot({ path: 'manual-login-3-after-submit.png', fullPage: true })

  // Vérifier où on est
  if (page.url().includes('/login')) {
    console.log('Still on login page - checking for errors...')
    const errorText = await page
      .locator('.p-message-error, .p-error, [class*="error"]')
      .allTextContents()
    console.log('Error messages:', errorText)
  } else {
    console.log('Successfully redirected!')
    // Attendre le dashboard
    await page.waitForSelector('.dashboard, h2', { timeout: 10000 })
    console.log('Dashboard loaded!')
  }

  // Le test passera seulement si on est sur la page d'accueil
  expect(page.url()).toContain('/')
  expect(page.url()).not.toContain('/login')
})
