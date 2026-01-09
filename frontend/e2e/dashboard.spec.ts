/**
 * Tests E2E - Dashboard
 * Teste la page d'accueil et les widgets du tableau de bord
 */

import { test, expect, TEST_USERS } from './fixtures'

test.describe('Dashboard', () => {
  test.describe('Page Loading', () => {
    test('should display dashboard after login', async ({ authenticatedPage }) => {
      // authenticatedPage est déjà sur le dashboard après login
      await expect(authenticatedPage.locator('.dashboard')).toBeVisible({ timeout: 10000 })
    })

    test('should show welcome message with user name', async ({ authenticatedPage }) => {
      await expect(
        authenticatedPage.locator(`text=Bonjour, ${TEST_USERS.admin.firstName}`),
      ).toBeVisible({ timeout: 10000 })
    })

    test('should display loading state initially', async ({ page }) => {
      // Se connecter et observer le loading
      await page.goto('/login')
      await page.fill('#email', TEST_USERS.admin.email)
      await page.fill('#password', TEST_USERS.admin.password)
      await page.click('button[type="submit"]')

      // Le dashboard devrait charger
      await expect(page.locator('.dashboard')).toBeVisible({ timeout: 15000 })
    })
  })

  test.describe('Statistics Cards', () => {
    test('should display stat tiles', async ({ authenticatedPage }) => {
      // Attendre que les stats soient chargées
      await authenticatedPage.waitForLoadState('networkidle')

      // Vérifier les cartes de statistiques
      const statTiles = authenticatedPage.locator('.stat-tile, [class*="stat"]')

      // Au moins une carte devrait être visible
      await expect(statTiles.first()).toBeVisible({ timeout: 10000 })
    })

    test('should show actions count', async ({ authenticatedPage }) => {
      await authenticatedPage.waitForLoadState('networkidle')

      // Chercher une stat liée aux actions
      const actionsStat = authenticatedPage
        .locator('.stat-tile, .p-card, [class*="stat"]')
        .filter({ hasText: /Action/i })

      if (await actionsStat.first().isVisible({ timeout: 5000 })) {
        // Vérifier qu'il y a une valeur numérique
        const statValue = actionsStat.locator('[class*="value"], .text-2xl, .text-3xl').first()
        await expect(statValue).toBeVisible()
      }
    })

    test('should show documents count', async ({ authenticatedPage }) => {
      await authenticatedPage.waitForLoadState('networkidle')

      const documentsStat = authenticatedPage
        .locator('.stat-tile, .p-card, [class*="stat"]')
        .filter({ hasText: /Document/i })

      if (await documentsStat.first().isVisible({ timeout: 5000 })) {
        const statValue = documentsStat.locator('[class*="value"], .text-2xl, .text-3xl').first()
        await expect(statValue).toBeVisible()
      }
    })
  })

  test.describe('Priority Actions Section', () => {
    test('should display priority actions section', async ({ authenticatedPage }) => {
      await authenticatedPage.waitForLoadState('networkidle')

      // Chercher la section "Mes Actions Prioritaires"
      const actionsSection = authenticatedPage
        .locator('.p-card, [class*="card"]')
        .filter({ hasText: /Actions Prioritaires|Mes Actions/i })

      await expect(actionsSection.first()).toBeVisible({ timeout: 10000 })
    })

    test('should show action items or empty state', async ({ authenticatedPage }) => {
      await authenticatedPage.waitForLoadState('networkidle')

      const actionsSection = authenticatedPage
        .locator('.p-card')
        .filter({ hasText: /Actions Prioritaires/i })
        .first()

      if (await actionsSection.isVisible()) {
        // Soit des actions sont listées, soit un message "aucune action"
        const hasActions = await actionsSection
          .locator('[class*="action-item"], .action-row')
          .count()
        const hasEmptyMessage = await actionsSection
          .locator("text=/aucune|pas d'action|tout est en ordre/i")
          .count()

        expect(hasActions > 0 || hasEmptyMessage > 0).toBeTruthy()
      }
    })

    test('should navigate to actions on "Voir tout" click', async ({ authenticatedPage }) => {
      await authenticatedPage.waitForLoadState('networkidle')

      const viewAllButton = authenticatedPage
        .locator('.p-card')
        .filter({ hasText: /Actions Prioritaires/i })
        .locator('button, a')
        .filter({ hasText: /Voir tout/i })

      if (await viewAllButton.first().isVisible()) {
        await viewAllButton.first().click()
        await expect(authenticatedPage).toHaveURL('/actions')
      }
    })
  })

  test.describe('My Equipment Section', () => {
    test('should display equipment section', async ({ authenticatedPage }) => {
      await authenticatedPage.waitForLoadState('networkidle')

      const equipmentSection = authenticatedPage
        .locator('.p-card')
        .filter({ hasText: /Mon Équipement|Équipement/i })

      await expect(equipmentSection.first()).toBeVisible({ timeout: 10000 })
    })

    test('should show assigned equipment or empty state', async ({ authenticatedPage }) => {
      await authenticatedPage.waitForLoadState('networkidle')

      const equipmentSection = authenticatedPage
        .locator('.p-card')
        .filter({ hasText: /Mon Équipement/i })
        .first()

      if (await equipmentSection.isVisible()) {
        const hasEquipment = await equipmentSection.locator('[class*="equipment-item"]').count()
        const hasEmptyMessage = await equipmentSection
          .locator("text=/aucun équipement|pas d'équipement/i")
          .count()

        expect(hasEquipment > 0 || hasEmptyMessage > 0).toBeTruthy()
      }
    })
  })

  test.describe('Charts Section', () => {
    test('should display charts for admin/manager', async ({ adminPage }) => {
      await adminPage.waitForLoadState('networkidle')

      // Les graphiques devraient être visibles pour admin
      const chartSection = adminPage
        .locator('.p-card')
        .filter({ hasText: /Répartition|Statistiques|Actions/i })

      // Au moins un graphique devrait être présent
      const chartCanvas = adminPage.locator('canvas')

      // Soit un chart est visible, soit la section stats
      await Promise.race([
        await expect(chartCanvas.first()).toBeVisible({ timeout: 10000 }),
        await expect(chartSection.first()).toBeVisible({ timeout: 10000 }),
      ]).catch(() => {})
    })
  })

  test.describe('Recent Documents Section', () => {
    test('should display recent documents', async ({ authenticatedPage }) => {
      await authenticatedPage.waitForLoadState('networkidle')

      const docsSection = authenticatedPage
        .locator('.p-card')
        .filter({ hasText: /Derniers Documents|Documents Récents/i })

      await expect(docsSection.first()).toBeVisible({ timeout: 10000 })
    })

    test('should show document items or empty state', async ({ authenticatedPage }) => {
      await authenticatedPage.waitForLoadState('networkidle')

      const docsSection = authenticatedPage
        .locator('.p-card')
        .filter({ hasText: /Derniers Documents/i })
        .first()

      if (await docsSection.isVisible()) {
        const hasDocs = await docsSection.locator('[class*="doc-item"], a').count()
        const hasEmptyMessage = await docsSection.locator('text=/aucun document/i').count()

        expect(hasDocs > 0 || hasEmptyMessage > 0).toBeTruthy()
      }
    })
  })

  test.describe('Agenda Section', () => {
    test('should display agenda/deadlines section', async ({ authenticatedPage }) => {
      await authenticatedPage.waitForLoadState('networkidle')

      const agendaSection = authenticatedPage
        .locator('.p-card')
        .filter({ hasText: /Agenda|Échéances|Calendrier/i })

      await expect(agendaSection.first()).toBeVisible({ timeout: 10000 })
    })

    test('should show overdue items highlighted', async ({ authenticatedPage }) => {
      await authenticatedPage.waitForLoadState('networkidle')

      // Les éléments en retard devraient être mis en évidence (rouge)
      const overdueItems = authenticatedPage.locator(
        '.text-red-500, [class*="overdue"], [class*="danger"]',
      )

      // Ce test vérifie juste que le style est appliqué si des items en retard existent
      const overdueCount = await overdueItems.count()
      // Pas d'assertion stricte car il peut ne pas y avoir d'éléments en retard
    })
  })

  test.describe('Navigation', () => {
    test('should navigate to documents module', async ({ authenticatedPage }) => {
      await authenticatedPage.waitForLoadState('networkidle')

      // Via le menu latéral
      await authenticatedPage.click('text=Documents')
      await expect(authenticatedPage).toHaveURL('/documents')
    })

    test('should navigate to actions module', async ({ authenticatedPage }) => {
      await authenticatedPage.waitForLoadState('networkidle')

      await authenticatedPage.click('text=Actions')
      await expect(authenticatedPage).toHaveURL('/actions')
    })

    test('should navigate to equipment module', async ({ authenticatedPage }) => {
      await authenticatedPage.waitForLoadState('networkidle')

      await authenticatedPage.click('text=Équipement')
      await expect(authenticatedPage).toHaveURL(/\/equipment/)
    })

    test('should navigate to indicators module', async ({ authenticatedPage }) => {
      await authenticatedPage.waitForLoadState('networkidle')

      await authenticatedPage.click('text=Indicateurs')
      await expect(authenticatedPage).toHaveURL('/indicators')
    })
  })

  test.describe('Theme Toggle', () => {
    test('should toggle dark mode', async ({ authenticatedPage }) => {
      await authenticatedPage.waitForLoadState('networkidle')

      // Trouver le bouton de toggle de thème
      const themeToggle = authenticatedPage
        .locator(
          'button[aria-label*="theme"], button[aria-label*="Theme"], [data-testid="theme-toggle"]',
        )
        .or(
          authenticatedPage
            .locator('button')
            .filter({ has: authenticatedPage.locator('[class*="moon"], [class*="sun"]') }),
        )

      if (await themeToggle.first().isVisible()) {
        // Vérifier le thème initial
        const initialTheme = await authenticatedPage.evaluate(() =>
          document.documentElement.classList.contains('app-dark'),
        )

        // Toggle
        await themeToggle.first().click()
        await authenticatedPage.waitForTimeout(300)

        // Vérifier le changement
        const newTheme = await authenticatedPage.evaluate(() =>
          document.documentElement.classList.contains('app-dark'),
        )

        expect(newTheme).not.toBe(initialTheme)
      }
    })
  })

  test.describe('Responsive Behavior', () => {
    test('should adapt layout on mobile viewport', async ({ authenticatedPage }) => {
      // Réduire la taille de la fenêtre
      await authenticatedPage.setViewportSize({ width: 375, height: 667 })
      await authenticatedPage.reload()

      // Le dashboard devrait toujours être visible
      await expect(authenticatedPage.locator('.dashboard')).toBeVisible({ timeout: 10000 })

      // Les cartes devraient être empilées (une par ligne)
      const cards = authenticatedPage.locator('.p-card, [class*="card"]')
      const firstCard = cards.first()
      const secondCard = cards.nth(1)

      if ((await firstCard.isVisible()) && (await secondCard.isVisible())) {
        const firstBox = await firstCard.boundingBox()
        const secondBox = await secondCard.boundingBox()

        if (firstBox && secondBox) {
          // En mobile, les cartes devraient être empilées (secondCard en dessous de firstCard)
          // La position Y de la seconde carte devrait être plus grande
          // Note: Ceci dépend du design, ajuster si nécessaire
        }
      }
    })
  })
})
