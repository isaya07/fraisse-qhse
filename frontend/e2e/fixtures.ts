/**
 * Playwright Fixtures - Authentification et utilitaires de test E2E
 */

import { test as base, Page, expect } from '@playwright/test'

// Credentials des utilisateurs de test (correspondant aux seeders Laravel)
export const TEST_USERS = {
  admin: {
    email: 'admin@qhse.local',
    password: 'password',
    role: 'admin',
    firstName: 'Admin',
  },
  manager: {
    email: 'manager@qhse.local',
    password: 'password',
    role: 'manager',
    firstName: 'Manager',
  },
  user: {
    email: 'user1@qhse.local',
    password: 'password',
    role: 'user',
    firstName: 'User',
  },
  viewer: {
    email: 'viewer@qhse.local',
    password: 'password',
    role: 'viewer',
    firstName: 'Viewer',
  },
}

// Type pour les fixtures personnalisées
type CustomFixtures = {
  authenticatedPage: Page
  adminPage: Page
  managerPage: Page
  userPage: Page
}

/**
 * Helper pour se connecter à l'application
 */
async function loginAs(page: Page, email: string, password: string): Promise<void> {
  // Aller à la page de login et attendre que tout soit chargé
  await page.goto('/login', { waitUntil: 'networkidle' })

  // Attendre que les composants Vue/PrimeVue soient montés
  await page.waitForTimeout(2000)

  // Remplir le formulaire (utiliser les sélecteurs qui ont fonctionné dans le test réseau)
  await page.fill('input#email, input[name="email"]', email)
  await page.fill('input#password, input[name="password"], input[type="password"]', password)

  // Petite pause avant submit
  await page.waitForTimeout(500)

  // Soumettre le formulaire
  await page.click('button[type="submit"]')

  // Attendre la redirection et le chargement du dashboard (timeout généreux)
  await page.waitForTimeout(5000)

  // Vérifier qu'on est bien redirigé
  if (page.url().includes('/login')) {
    throw new Error('Login failed: still on login page')
  }
}

/**
 * Extension des tests Playwright avec fixtures d'authentification
 */
export const test = base.extend<CustomFixtures>({
  // Page authentifiée avec l'utilisateur admin par défaut
  authenticatedPage: async ({ page }, use) => {
    await loginAs(page, TEST_USERS.admin.email, TEST_USERS.admin.password)
    await use(page)
  },

  // Page avec connexion admin
  adminPage: async ({ page }, use) => {
    await loginAs(page, TEST_USERS.admin.email, TEST_USERS.admin.password)
    await use(page)
  },

  // Page avec connexion manager
  managerPage: async ({ page }, use) => {
    await loginAs(page, TEST_USERS.manager.email, TEST_USERS.manager.password)
    await use(page)
  },

  // Page avec connexion utilisateur standard
  userPage: async ({ page }, use) => {
    await loginAs(page, TEST_USERS.user.email, TEST_USERS.user.password)
    await use(page)
  },
})

// Réexporter expect pour utilisation dans les tests
export { expect }

/**
 * Helper pour attendre le chargement d'une DataTable PrimeVue
 */
export async function waitForDataTable(page: Page): Promise<void> {
  // Attendre que le spinner disparaisse
  await expect(page.locator('.p-datatable-loading-overlay')).toBeHidden({ timeout: 10000 })
  // Attendre que le tableau soit visible
  await expect(page.locator('.p-datatable')).toBeVisible()
}

/**
 * Helper pour naviguer via le menu latéral
 */
export async function navigateToModule(page: Page, menuItemText: string): Promise<void> {
  // Cliquer sur l'élément du menu
  await page.click(`text=${menuItemText}`)
  // Attendre la navigation
  await page.waitForLoadState('networkidle')
}

/**
 * Helper pour remplir un formulaire PrimeVue
 */
export async function fillPrimeVueForm(
  page: Page,
  fields: Record<string, { type: 'input' | 'dropdown' | 'textarea' | 'calendar'; value: string }>,
): Promise<void> {
  for (const [fieldName, { type, value }] of Object.entries(fields)) {
    const selector = `[name="${fieldName}"], #${fieldName}`

    switch (type) {
      case 'input':
        await page.fill(selector, value)
        break
      case 'textarea':
        await page.fill(`textarea${selector}`, value)
        break
      case 'dropdown':
        await page.click(selector)
        await page.click(`.p-dropdown-item:has-text("${value}")`)
        break
      case 'calendar':
        await page.fill(selector, value)
        await page.keyboard.press('Enter')
        break
    }
  }
}

/**
 * Helper pour confirmer une action dans un dialogue PrimeVue
 */
export async function confirmDialog(page: Page, confirm: boolean = true): Promise<void> {
  const dialogButton = confirm
    ? page.locator('.p-confirmdialog .p-confirm-dialog-accept')
    : page.locator('.p-confirmdialog .p-confirm-dialog-reject')

  await expect(dialogButton).toBeVisible()
  await dialogButton.click()
  await expect(page.locator('.p-confirmdialog')).toBeHidden()
}

/**
 * Helper pour vérifier un toast PrimeVue
 */
export async function expectToast(
  page: Page,
  severity: 'success' | 'error' | 'warn' | 'info',
  containsText?: string,
): Promise<void> {
  const toast = page.locator(`.p-toast-message-${severity}`)
  await expect(toast).toBeVisible({ timeout: 5000 })

  if (containsText) {
    await expect(toast).toContainText(containsText)
  }

  // Optionnel: attendre que le toast disparaisse
  await expect(toast).toBeHidden({ timeout: 10000 })
}
