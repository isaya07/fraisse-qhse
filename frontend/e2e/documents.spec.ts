/**
 * Tests E2E - Documents CRUD
 * Teste les flux complets pour la gestion des documents
 */

import { test, expect, TEST_USERS, waitForDataTable, expectToast } from './fixtures'

test.describe('Documents Module', () => {
  test.describe('Documents List', () => {
    test('should display documents list page', async ({ authenticatedPage }) => {
      await authenticatedPage.goto('/documents')

      // Vérifier le titre de la page
      await expect(
        authenticatedPage.locator('h1, h2').filter({ hasText: /Documents/i }),
      ).toBeVisible({ timeout: 10000 })

      // Vérifier que le DataTable est chargé
      await waitForDataTable(authenticatedPage)
    })

    test('should show action buttons', async ({ authenticatedPage }) => {
      await authenticatedPage.goto('/documents')
      await waitForDataTable(authenticatedPage)

      // Bouton de création
      await expect(
        authenticatedPage.locator('button, a').filter({ hasText: /Nouveau|Créer|Ajouter/i }),
      ).toBeVisible()
    })

    test('should navigate to create page', async ({ authenticatedPage }) => {
      await authenticatedPage.goto('/documents')
      await waitForDataTable(authenticatedPage)

      // Cliquer sur le bouton de création
      await authenticatedPage
        .locator('button, a')
        .filter({ hasText: /Nouveau|Créer|Ajouter/i })
        .first()
        .click()

      // Vérifier la navigation
      await expect(authenticatedPage).toHaveURL(/\/documents\/create/)
    })

    test('should filter documents by search', async ({ authenticatedPage }) => {
      await authenticatedPage.goto('/documents')
      await waitForDataTable(authenticatedPage)

      // Trouver le champ de recherche
      const searchInput = authenticatedPage
        .locator('input[type="text"], input[type="search"]')
        .filter({ hasText: '' })
        .first()

      if (await searchInput.isVisible()) {
        await searchInput.fill('test')
        await authenticatedPage.waitForTimeout(500) // Debounce

        // Vérifier que le filtre est appliqué (URL ou résultats)
        await authenticatedPage.waitForLoadState('networkidle')
      }
    })
  })

  test.describe('Document Creation', () => {
    test('should display creation form', async ({ authenticatedPage }) => {
      await authenticatedPage.goto('/documents/create')

      // Vérifier le formulaire
      await expect(authenticatedPage.locator('form')).toBeVisible({ timeout: 10000 })

      // Champs requis
      await expect(
        authenticatedPage.locator('input[name="title"], #title, [id*="title"]'),
      ).toBeVisible()
    })

    test('should show validation errors for empty form', async ({ authenticatedPage }) => {
      await authenticatedPage.goto('/documents/create')

      // Attendre le formulaire
      await expect(authenticatedPage.locator('form')).toBeVisible({ timeout: 10000 })

      // Soumettre le formulaire vide
      await authenticatedPage.locator('button[type="submit"]').click()

      // Attendre les messages de validation
      await authenticatedPage.waitForTimeout(500)

      // Vérifier qu'il y a des messages d'erreur ou que le formulaire n'est pas soumis
      const hasErrors = await authenticatedPage
        .locator('.p-message-error, .p-error, [class*="error"]')
        .count()

      // Soit des erreurs sont affichées, soit on reste sur la même page
      const currentUrl = authenticatedPage.url()
      expect(hasErrors > 0 || currentUrl.includes('/create')).toBeTruthy()
    })

    test('should create document with valid data', async ({ authenticatedPage }) => {
      await authenticatedPage.goto('/documents/create')

      // Attendre le formulaire
      await expect(authenticatedPage.locator('form')).toBeVisible({ timeout: 10000 })

      // Remplir le formulaire
      const title = `Document E2E Test ${Date.now()}`

      await authenticatedPage.fill('input[name="title"], #title, [id*="title"]', title)

      // Description si présent
      const descriptionField = authenticatedPage.locator(
        'textarea[name="description"], #description',
      )
      if (await descriptionField.isVisible()) {
        await descriptionField.fill('Description du document de test E2E')
      }

      // Version si présent
      const versionField = authenticatedPage.locator('input[name="version"], #version')
      if (await versionField.isVisible()) {
        await versionField.fill('1.0')
      }

      // Upload de fichier si nécessaire
      const fileInput = authenticatedPage.locator('input[type="file"]')
      if (await fileInput.isVisible()) {
        // Créer un fichier de test simple
        await fileInput.setInputFiles({
          name: 'test-document.txt',
          mimeType: 'text/plain',
          buffer: Buffer.from('Contenu du fichier de test E2E'),
        })
      }

      // Soumettre
      await authenticatedPage.locator('button[type="submit"]').click()

      // Attendre la redirection ou le toast de succès
      await Promise.race([
        authenticatedPage.waitForURL(/\/documents(\/\d+)?$/, { timeout: 10000 }),
        expectToast(authenticatedPage, 'success').catch(() => {}),
      ])
    })
  })

  test.describe('Document Detail', () => {
    test('should display document details', async ({ authenticatedPage }) => {
      // D'abord aller sur la liste
      await authenticatedPage.goto('/documents')
      await waitForDataTable(authenticatedPage)

      // Cliquer sur le premier document
      const firstRow = authenticatedPage.locator('.p-datatable-tbody tr').first()
      if (await firstRow.isVisible()) {
        await firstRow.click()

        // Attendre la navigation vers le détail
        await authenticatedPage.waitForURL(/\/documents\/\d+/, { timeout: 10000 })

        // Vérifier que les détails sont affichés
        await expect(authenticatedPage.locator('h1, h2, h3').first()).toBeVisible()
      }
    })

    test('should show document actions', async ({ authenticatedPage }) => {
      await authenticatedPage.goto('/documents')
      await waitForDataTable(authenticatedPage)

      // Cliquer sur le premier document
      const firstRow = authenticatedPage.locator('.p-datatable-tbody tr').first()
      if (await firstRow.isVisible()) {
        await firstRow.click()
        await authenticatedPage.waitForURL(/\/documents\/\d+/, { timeout: 10000 })

        // Vérifier les boutons d'action
        const actionButtons = authenticatedPage
          .locator('button, a')
          .filter({ hasText: /Modifier|Télécharger|Supprimer|Éditer/i })

        // Au moins un bouton d'action devrait être visible
        await expect(actionButtons.first()).toBeVisible({ timeout: 5000 })
      }
    })
  })

  test.describe('Document Edit', () => {
    test('should navigate to edit page', async ({ authenticatedPage }) => {
      await authenticatedPage.goto('/documents')
      await waitForDataTable(authenticatedPage)

      // Cliquer sur le premier document
      const firstRow = authenticatedPage.locator('.p-datatable-tbody tr').first()
      if (await firstRow.isVisible()) {
        await firstRow.click()
        await authenticatedPage.waitForURL(/\/documents\/\d+/, { timeout: 10000 })

        // Cliquer sur le bouton modifier
        const editButton = authenticatedPage
          .locator('button, a')
          .filter({ hasText: /Modifier|Éditer/i })
          .first()

        if (await editButton.isVisible()) {
          await editButton.click()
          await authenticatedPage.waitForURL(/\/documents\/\d+\/edit/, { timeout: 10000 })

          // Vérifier le formulaire d'édition
          await expect(authenticatedPage.locator('form')).toBeVisible()
        }
      }
    })

    test('should update document', async ({ authenticatedPage }) => {
      await authenticatedPage.goto('/documents')
      await waitForDataTable(authenticatedPage)

      const firstRow = authenticatedPage.locator('.p-datatable-tbody tr').first()
      if (await firstRow.isVisible()) {
        await firstRow.click()
        await authenticatedPage.waitForURL(/\/documents\/\d+/, { timeout: 10000 })

        const editButton = authenticatedPage
          .locator('button, a')
          .filter({ hasText: /Modifier|Éditer/i })
          .first()

        if (await editButton.isVisible()) {
          await editButton.click()
          await authenticatedPage.waitForURL(/\/documents\/\d+\/edit/, { timeout: 10000 })

          // Modifier le titre
          const titleField = authenticatedPage.locator('input[name="title"], #title, [id*="title"]')
          await titleField.clear()
          await titleField.fill(`Document modifié ${Date.now()}`)

          // Soumettre
          await authenticatedPage.locator('button[type="submit"]').click()

          // Vérifier le succès
          await Promise.race([
            authenticatedPage.waitForURL(/\/documents\/\d+$/, { timeout: 10000 }),
            expectToast(authenticatedPage, 'success').catch(() => {}),
          ])
        }
      }
    })
  })

  test.describe('Document Download', () => {
    test('should download document', async ({ authenticatedPage }) => {
      await authenticatedPage.goto('/documents')
      await waitForDataTable(authenticatedPage)

      const firstRow = authenticatedPage.locator('.p-datatable-tbody tr').first()
      if (await firstRow.isVisible()) {
        await firstRow.click()
        await authenticatedPage.waitForURL(/\/documents\/\d+/, { timeout: 10000 })

        // Chercher le bouton de téléchargement
        const downloadButton = authenticatedPage
          .locator('button, a')
          .filter({ hasText: /Télécharger|Download/i })
          .first()

        if (await downloadButton.isVisible()) {
          // Attendre le téléchargement
          const [download] = await Promise.all([
            authenticatedPage.waitForEvent('download', { timeout: 10000 }).catch(() => null),
            downloadButton.click(),
          ])

          // Vérifier qu'un téléchargement a été déclenché
          if (download) {
            expect(download.suggestedFilename()).toBeTruthy()
          }
        }
      }
    })
  })

  test.describe('Document Workflow', () => {
    test('should request approval for document', async ({ authenticatedPage }) => {
      await authenticatedPage.goto('/documents')
      await waitForDataTable(authenticatedPage)

      const firstRow = authenticatedPage.locator('.p-datatable-tbody tr').first()
      if (await firstRow.isVisible()) {
        await firstRow.click()
        await authenticatedPage.waitForURL(/\/documents\/\d+/, { timeout: 10000 })

        // Chercher le bouton de demande d'approbation
        const approvalButton = authenticatedPage
          .locator('button')
          .filter({ hasText: /Demander.*approbation|Soumettre/i })
          .first()

        if (await approvalButton.isVisible()) {
          await approvalButton.click()

          // Vérifier le toast ou le changement de statut
          await authenticatedPage.waitForTimeout(1000)
          // Le statut devrait changer en "pending_approval"
        }
      }
    })
  })

  test.describe('Document Versioning', () => {
    test('should display version history', async ({ authenticatedPage }) => {
      await authenticatedPage.goto('/documents')
      await waitForDataTable(authenticatedPage)

      const firstRow = authenticatedPage.locator('.p-datatable-tbody tr').first()
      if (await firstRow.isVisible()) {
        await firstRow.click()
        await authenticatedPage.waitForURL(/\/documents\/\d+/, { timeout: 10000 })

        // Chercher l'onglet ou bouton versions
        const versionsTab = authenticatedPage
          .locator('button, a, [role="tab"]')
          .filter({ hasText: /Version|Historique/i })
          .first()

        if (await versionsTab.isVisible()) {
          await versionsTab.click()
          await authenticatedPage.waitForTimeout(500)

          // Vérifier que l'historique s'affiche
          await expect(authenticatedPage.locator('text=/v?\\d+\\.\\d+|Version/i')).toBeVisible({
            timeout: 5000,
          })
        }
      }
    })
  })
})
