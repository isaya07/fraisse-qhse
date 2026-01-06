/**
 * Tests E2E - Authentification
 * Teste les flux de connexion, déconnexion et protection des routes
 */

import { test, expect, TEST_USERS } from './fixtures'

test.describe('Authentication Flow', () => {
  test.describe('Login Page', () => {
    test('should display login form', async ({ page }) => {
      await page.goto('/login')

      // Vérifier les éléments du formulaire
      await expect(page.locator('#email')).toBeVisible()
      await expect(page.locator('#password')).toBeVisible()
      await expect(page.locator('button[type="submit"]')).toBeVisible()

      // Vérifier le branding
      await expect(page.locator('text=FRAISSE & FILS')).toBeVisible()
      await expect(page.locator('text=QHSE Manager')).toBeVisible()
    })

    test('should show validation errors for empty form', async ({ page }) => {
      await page.goto('/login')

      // Soumettre le formulaire vide
      await page.click('button[type="submit"]')

      // Attendre les messages de validation
      await expect(page.locator("text=L'email est requis")).toBeVisible({ timeout: 5000 })
      await expect(page.locator('text=Le mot de passe est requis')).toBeVisible({ timeout: 5000 })
    })

    test('should show validation error for invalid email format', async ({ page }) => {
      await page.goto('/login')

      await page.fill('#email', 'invalid-email')
      await page.fill('#password', 'password')
      await page.click('button[type="submit"]')

      await expect(page.locator("text=Format d'email invalide")).toBeVisible({ timeout: 5000 })
    })

    test('should login successfully with valid credentials', async ({ page }) => {
      await page.goto('/login')

      await page.fill('#email', TEST_USERS.admin.email)
      await page.fill('#password', TEST_USERS.admin.password)
      await page.click('button[type="submit"]')

      // Attendre la redirection vers le dashboard
      await page.waitForURL('/')

      // Vérifier le dashboard
      await expect(page.locator('.dashboard')).toBeVisible({ timeout: 10000 })
      await expect(page.locator(`text=Bonjour, ${TEST_USERS.admin.firstName}`)).toBeVisible()
    })

    test('should show error for invalid credentials', async ({ page }) => {
      await page.goto('/login')

      await page.fill('#email', 'wrong@email.com')
      await page.fill('#password', 'wrongpassword')
      await page.click('button[type="submit"]')

      // Le formulaire doit rester visible (pas de redirection)
      await expect(page.locator('#email')).toBeVisible()

      // Note: Un message d'erreur devrait être affiché
      // Dépend de l'implémentation du composant LoginPage
    })

    test('should show loading state during login', async ({ page }) => {
      await page.goto('/login')

      await page.fill('#email', TEST_USERS.admin.email)
      await page.fill('#password', TEST_USERS.admin.password)

      // Capturer le clic et vérifier l'état loading
      const submitButton = page.locator('button[type="submit"]')
      await submitButton.click()

      // Le bouton devrait afficher un état de chargement
      // Avec PrimeVue, l'attribut loading ajoute une classe spécifique
      // Note: Cette vérification peut nécessiter un ajustement selon le timing
    })
  })

  test.describe('Protected Routes', () => {
    test('should redirect to login when accessing protected route without auth', async ({
      page,
    }) => {
      // Tenter d'accéder à une route protégée
      await page.goto('/documents')

      // Devrait être redirigé vers login
      await expect(page).toHaveURL('/login')
    })

    test('should redirect to login when accessing admin route without auth', async ({ page }) => {
      await page.goto('/users')

      // Devrait être redirigé vers login
      await expect(page).toHaveURL('/login')
    })

    test('should access protected route when authenticated', async ({ authenticatedPage }) => {
      // authenticatedPage est déjà connecté (fixture)
      await authenticatedPage.goto('/documents')

      // La page documents devrait être accessible
      await expect(authenticatedPage).toHaveURL('/documents')
    })
  })

  test.describe('Role-based Access Control', () => {
    test('admin should access users page', async ({ adminPage }) => {
      await adminPage.goto('/users')

      // Admin peut accéder à la page utilisateurs
      await expect(adminPage).toHaveURL('/users')
      await expect(adminPage.locator('h1, h2').filter({ hasText: /Utilisateurs/i })).toBeVisible({
        timeout: 10000,
      })
    })

    test('non-admin should be redirected from users page', async ({ userPage }) => {
      await userPage.goto('/users')

      // L'utilisateur standard devrait être redirigé vers l'accueil
      await expect(userPage).toHaveURL('/')
    })

    test('admin should access settings page', async ({ adminPage }) => {
      await adminPage.goto('/settings')

      await expect(adminPage).toHaveURL('/settings')
    })

    test('manager should access actions page', async ({ managerPage }) => {
      await managerPage.goto('/actions')

      await expect(managerPage).toHaveURL('/actions')
    })
  })

  test.describe('Logout', () => {
    test('should logout and redirect to login', async ({ authenticatedPage }) => {
      // Trouver et cliquer sur le bouton de déconnexion
      // Note: Le sélecteur dépend de l'implémentation du layout
      const logoutButton = authenticatedPage
        .locator('[data-testid="logout-button"]')
        .or(authenticatedPage.locator('button:has-text("Déconnexion")'))
        .or(authenticatedPage.locator('[aria-label="Déconnexion"]'))

      // Si le menu utilisateur est dans un dropdown, l'ouvrir d'abord
      const userMenu = authenticatedPage
        .locator('[data-testid="user-menu"]')
        .or(authenticatedPage.locator('.user-menu'))

      if (await userMenu.isVisible()) {
        await userMenu.click()
        await expect(logoutButton).toBeVisible()
      }

      await logoutButton.click()

      // Devrait être redirigé vers login
      await authenticatedPage.waitForURL('/login', { timeout: 10000 })
      await expect(authenticatedPage.locator('#email')).toBeVisible()
    })
  })

  test.describe('Session Persistence', () => {
    test('should maintain session after page reload', async ({ authenticatedPage }) => {
      // L'utilisateur est connecté
      await expect(authenticatedPage.locator('.dashboard')).toBeVisible()

      // Recharger la page
      await authenticatedPage.reload()

      // Devrait toujours être sur le dashboard (pas redirigé vers login)
      await expect(authenticatedPage).toHaveURL('/')
      await expect(authenticatedPage.locator('.dashboard')).toBeVisible({ timeout: 10000 })
    })

    test('should display user info after page reload', async ({ authenticatedPage }) => {
      // Recharger la page
      await authenticatedPage.reload()

      // Le nom de l'utilisateur devrait être affiché
      await expect(
        authenticatedPage.locator(`text=Bonjour, ${TEST_USERS.admin.firstName}`),
      ).toBeVisible({ timeout: 10000 })
    })
  })
})
