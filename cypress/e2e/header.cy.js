describe('Header Component', () => {
    beforeEach(() => {
        // On réinitialise le localStorage et on visite la page d'accueil
        localStorage.clear();
        cy.visit('/');
    });

    it('affiche le titre "Gestion des utilisateurs"', () => {
        cy.get('header')
            .find('.text-xl')
            .should('contain', 'Gestion des utilisateurs');
    });

    it('affiche les boutons pour un utilisateur non connecté', () => {
        cy.get('header').within(() => {
            cy.contains("S'enregistrer").should('be.visible');
            cy.contains('Connexion').should('be.visible');
        });
    });

    it('affiche les boutons pour un utilisateur admin', () => {
        // Simuler un utilisateur admin en mettant en place un token et un rôle
        localStorage.setItem('authToken', 'fake-admin-token');
        localStorage.setItem('userRole', 'admin');
        cy.reload();
        cy.get('header').within(() => {
            cy.contains("Ajouter un utilisateur").should('be.visible');
            cy.contains('Liste des utilisateurs').should('be.visible');
            cy.contains('Déconnexion').should('be.visible');
        });
    });

    it('affiche les boutons pour un utilisateur connecté non admin', () => {
        localStorage.setItem('authToken', 'fake-token');
        localStorage.setItem('userRole', 'user');
        cy.reload();
        cy.get('header').within(() => {
            cy.contains("S'enregistrer").should('be.visible');
            cy.contains('Liste des utilisateurs').should('be.visible');
            cy.contains('Déconnexion').should('be.visible');
        });
    });
});
