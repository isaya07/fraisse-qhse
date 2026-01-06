/**
 * Test de diagnostic pour identifier le problème de login
 */

import { test, expect } from '@playwright/test'

test('Diagnose login form', async ({ page }) => {
  await page.goto('/login')

  // Attendre le formulaire
  await page.waitForSelector('form', { state: 'visible', timeout: 10000 })
  await page.waitForTimeout(1000)

  // Capturer screenshot
  await page.screenshot({ path: 'login-form.png', fullPage: true })

  // Lister tous les inputs
  const inputs = await page.locator('input').all()
  console.log(`Found ${inputs.length} input elements`)

  for (let i = 0; i < inputs.length; i++) {
    const input = inputs[i]
    const id = await input.getAttribute('id')
    const name = await input.getAttribute('name')
    const type = await input.getAttribute('type')
    const isVisible = await input.isVisible()
    console.log(`Input ${i}: id="${id}", name="${name}", type="${type}", visible=${isVisible}`)
  }

  // Test remplissage email
  console.log('Trying to fill email...')
  const emailInput = page.locator('input#email')
  await emailInput.waitFor({ state: 'visible', timeout: 5000 })
  await emailInput.fill('admin@qhse.local')
  console.log('Email filled successfully')

  // Test remplissage password
  console.log('Trying to fill password...')
  const passwordInputs = await page.locator('input[type="password"]').all()
  console.log(`Found ${passwordInputs.length} password inputs`)

  for (let i = 0; i < passwordInputs.length; i++) {
    const input = passwordInputs[i]
    const id = await input.getAttribute('id')
    const name = await input.getAttribute('name')
    const isVisible = await input.isVisible()
    console.log(`Password input ${i}: id="${id}", name="${name}", visible=${isVisible}`)
  }

  // Essayer de remplir le premier input password visible
  const visiblePasswordInput = page.locator('input[type="password"]:visible').first()
  await visiblePasswordInput.fill('password')
  console.log('Password filled successfully')

  // Screenshot après remplissage
  await page.screenshot({ path: 'login-form-filled.png', fullPage: true })
})
