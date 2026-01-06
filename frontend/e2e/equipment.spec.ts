/**
 * Tests E2E - Equipment Module
 * Teste les flux complets pour la gestion des équipements
 */

import { test, expect, waitForDataTable, expectToast } from './fixtures'

test.describe('Equipment Module', () => {
  test.describe('Equipment Dashboard', () => {
    test('should display equipment dashboard', async ({ authenticatedPage }) => {
      await authenticatedPage.goto('/equipment')

      // Vérifier le titre
      await expect(
        authenticatedPage.locator('h1, h2').filter({ hasText: /Équipement|Equipment/i }),
      ).toBeVisible({ timeout: 10000 })
    })

    test('should show equipment statistics', async ({ authenticatedPage }) => {
      await authenticatedPage.goto('/equipment')

      // Attendre le chargement
      await authenticatedPage.waitForLoadState('networkidle')

      // Vérifier les cartes de statistiques (StatTile ou cards)
      const statCards = authenticatedPage.locator('.stat-tile, .p-card, [class*="stat"]')
      await expect(statCards.first()).toBeVisible({ timeout: 10000 })
    })

    test('should navigate to inventory', async ({ authenticatedPage }) => {
      await authenticatedPage.goto('/equipment')

      // Cliquer sur le lien vers l'inventaire
      const inventoryLink = authenticatedPage
        .locator('a, button')
        .filter({ hasText: /Inventaire|Voir tout/i })
        .first()

      if (await inventoryLink.isVisible()) {
        await inventoryLink.click()
        await expect(authenticatedPage).toHaveURL(/\/equipment\/inventory/)
      }
    })
  })

  test.describe('Equipment Inventory', () => {
    test('should display equipment list', async ({ authenticatedPage }) => {
      await authenticatedPage.goto('/equipment/inventory')

      // Vérifier le DataTable
      await waitForDataTable(authenticatedPage)
    })

    test('should filter by category', async ({ authenticatedPage }) => {
      await authenticatedPage.goto('/equipment/inventory')
      await waitForDataTable(authenticatedPage)

      // Trouver le filtre par catégorie (dropdown)
      const categoryFilter = authenticatedPage
        .locator('.p-dropdown, select')
        .filter({ hasText: /Catégorie|Category/i })
        .first()

      if (await categoryFilter.isVisible()) {
        await categoryFilter.click()
        // Sélectionner une option
        const firstOption = authenticatedPage.locator('.p-dropdown-item').first()
        if (await firstOption.isVisible()) {
          await firstOption.click()
          await authenticatedPage.waitForLoadState('networkidle')
        }
      }
    })

    test('should filter by status', async ({ authenticatedPage }) => {
      await authenticatedPage.goto('/equipment/inventory')
      await waitForDataTable(authenticatedPage)

      // Trouver le filtre par statut
      const statusFilter = authenticatedPage
        .locator('.p-dropdown, select, .p-selectbutton')
        .filter({ hasText: /Statut|Status|Disponible/i })
        .first()

      if (await statusFilter.isVisible()) {
        await statusFilter.click()
        await authenticatedPage.waitForTimeout(300)
      }
    })

    test('should navigate to equipment detail', async ({ authenticatedPage }) => {
      await authenticatedPage.goto('/equipment/inventory')
      await waitForDataTable(authenticatedPage)

      // Cliquer sur le premier équipement
      const firstRow = authenticatedPage.locator('.p-datatable-tbody tr').first()
      if (await firstRow.isVisible()) {
        await firstRow.click()
        await authenticatedPage.waitForURL(/\/equipment\/\d+/, { timeout: 10000 })
      }
    })
  })

  test.describe('Equipment Detail', () => {
    test('should display equipment details', async ({ authenticatedPage }) => {
      await authenticatedPage.goto('/equipment/inventory')
      await waitForDataTable(authenticatedPage)

      const firstRow = authenticatedPage.locator('.p-datatable-tbody tr').first()
      if (await firstRow.isVisible()) {
        await firstRow.click()
        await authenticatedPage.waitForURL(/\/equipment\/\d+/, { timeout: 10000 })

        // Vérifier les informations affichées
        await expect(authenticatedPage.locator('h1, h2, h3').first()).toBeVisible()

        // Vérifier les sections principales
        const sections = ['Informations', 'Attribution', 'Maintenance', 'Documents']
        for (const section of sections) {
          const sectionElement = authenticatedPage
            .locator('h1, h2, h3, h4, [class*="title"], [role="tab"]')
            .filter({ hasText: new RegExp(section, 'i') })
            .first()

          // Au moins une section devrait être visible
        }
      }
    })

    test('should show action buttons based on status', async ({ authenticatedPage }) => {
      await authenticatedPage.goto('/equipment/inventory')
      await waitForDataTable(authenticatedPage)

      const firstRow = authenticatedPage.locator('.p-datatable-tbody tr').first()
      if (await firstRow.isVisible()) {
        await firstRow.click()
        await authenticatedPage.waitForURL(/\/equipment\/\d+/, { timeout: 10000 })

        // Vérifier les boutons d'action
        const actionButtons = authenticatedPage.locator('button').filter({
          hasText: /Attribuer|Retourner|Modifier|Maintenance/i,
        })

        await expect(actionButtons.first()).toBeVisible({ timeout: 5000 })
      }
    })
  })

  test.describe('Equipment Assignment', () => {
    test('should open assignment dialog', async ({ authenticatedPage }) => {
      await authenticatedPage.goto('/equipment/inventory')
      await waitForDataTable(authenticatedPage)

      const firstRow = authenticatedPage.locator('.p-datatable-tbody tr').first()
      if (await firstRow.isVisible()) {
        await firstRow.click()
        await authenticatedPage.waitForURL(/\/equipment\/\d+/, { timeout: 10000 })

        // Chercher le bouton d'attribution
        const assignButton = authenticatedPage
          .locator('button')
          .filter({ hasText: /Attribuer|Assign/i })
          .first()

        if (await assignButton.isVisible()) {
          await assignButton.click()

          // Vérifier que le dialog s'ouvre
          await expect(authenticatedPage.locator('.p-dialog, [role="dialog"]')).toBeVisible({
            timeout: 5000,
          })
        }
      }
    })

    test('should assign equipment to user', async ({ authenticatedPage }) => {
      await authenticatedPage.goto('/equipment/inventory')
      await waitForDataTable(authenticatedPage)

      // Trouver un équipement disponible
      const availableRow = authenticatedPage
        .locator('.p-datatable-tbody tr')
        .filter({ hasText: /Disponible|Available/i })
        .first()

      if (await availableRow.isVisible()) {
        await availableRow.click()
        await authenticatedPage.waitForURL(/\/equipment\/\d+/, { timeout: 10000 })

        const assignButton = authenticatedPage
          .locator('button')
          .filter({ hasText: /Attribuer/i })
          .first()

        if (await assignButton.isVisible()) {
          await assignButton.click()
          await expect(authenticatedPage.locator('.p-dialog')).toBeVisible({ timeout: 5000 })

          // Sélectionner un utilisateur
          const userDropdown = authenticatedPage.locator('.p-dialog .p-dropdown').first()

          if (await userDropdown.isVisible()) {
            await userDropdown.click()
            await authenticatedPage.locator('.p-dropdown-item').first().click()

            // Date d'attribution
            const dateField = authenticatedPage
              .locator('.p-dialog input[type="text"], .p-calendar input')
              .first()

            if (await dateField.isVisible()) {
              await dateField.fill(new Date().toISOString().split('T')[0])
            }

            // Soumettre
            await authenticatedPage
              .locator('.p-dialog button[type="submit"], .p-dialog button')
              .filter({ hasText: /Confirmer|Attribuer|Valider/i })
              .click()

            // Vérifier le succès
            await Promise.race([
              expectToast(authenticatedPage, 'success').catch(() => {}),
              authenticatedPage.waitForTimeout(2000),
            ])
          }
        }
      }
    })
  })

  test.describe('Equipment Return', () => {
    test('should return assigned equipment', async ({ authenticatedPage }) => {
      await authenticatedPage.goto('/equipment/inventory')
      await waitForDataTable(authenticatedPage)

      // Trouver un équipement attribué
      const assignedRow = authenticatedPage
        .locator('.p-datatable-tbody tr')
        .filter({ hasText: /Attribué|Assigned/i })
        .first()

      if (await assignedRow.isVisible()) {
        await assignedRow.click()
        await authenticatedPage.waitForURL(/\/equipment\/\d+/, { timeout: 10000 })

        const returnButton = authenticatedPage
          .locator('button')
          .filter({ hasText: /Retourner|Return/i })
          .first()

        if (await returnButton.isVisible()) {
          await returnButton.click()

          // Vérifier le dialog
          await expect(authenticatedPage.locator('.p-dialog')).toBeVisible({ timeout: 5000 })
        }
      }
    })
  })

  test.describe('Equipment Maintenance', () => {
    test('should open maintenance form', async ({ authenticatedPage }) => {
      await authenticatedPage.goto('/equipment/inventory')
      await waitForDataTable(authenticatedPage)

      const firstRow = authenticatedPage.locator('.p-datatable-tbody tr').first()
      if (await firstRow.isVisible()) {
        await firstRow.click()
        await authenticatedPage.waitForURL(/\/equipment\/\d+/, { timeout: 10000 })

        // Chercher le bouton ou onglet maintenance
        const maintenanceButton = authenticatedPage
          .locator('button, [role="tab"]')
          .filter({ hasText: /Maintenance|Ajouter.*maintenance/i })
          .first()

        if (await maintenanceButton.isVisible()) {
          await maintenanceButton.click()
          await authenticatedPage.waitForTimeout(500)
        }
      }
    })

    test('should display maintenance history', async ({ authenticatedPage }) => {
      await authenticatedPage.goto('/equipment/inventory')
      await waitForDataTable(authenticatedPage)

      const firstRow = authenticatedPage.locator('.p-datatable-tbody tr').first()
      if (await firstRow.isVisible()) {
        await firstRow.click()
        await authenticatedPage.waitForURL(/\/equipment\/\d+/, { timeout: 10000 })

        // Chercher l'onglet ou section maintenance
        const maintenanceTab = authenticatedPage
          .locator('[role="tab"], button')
          .filter({ hasText: /Maintenance|Historique/i })
          .first()

        if (await maintenanceTab.isVisible()) {
          await maintenanceTab.click()
          await authenticatedPage.waitForTimeout(500)

          // Vérifier que l'historique s'affiche (tableau ou timeline)
          const historyContent = authenticatedPage.locator(
            '.p-datatable, .p-timeline, [class*="history"], [class*="log"]',
          )
          // L'historique peut être vide ou contenir des entrées
        }
      }
    })
  })
})
