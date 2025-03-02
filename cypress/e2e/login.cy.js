describe('Login Form', () => {
    beforeEach(() => {
        cy.visit('/login');
    });

    it("affiche un message d'erreur quand l'email est invalide", () => {
        // Tape un email invalide et sort du champ pour déclencher la validation
        cy.get('#email').type('email-invalide').blur();
        // Vérifie que le message d'erreur apparaît
        cy.contains('Email invalide').should('be.visible');
    });

    it('redirige vers la page des utilisateurs en cas de succès', () => {
        // 1. Stub de l’API de login : suppose que votre back écoute sur /auth/login
        cy.intercept('POST', '**/auth/login', {
            statusCode: 200,
            body: { token: 'fake-token' }
        }).as('login');

        // 2. Saisir des informations valides
        cy.get('#email').clear().type('loise.fenoll@ynov.com');
        cy.get('#password').clear().type('ANKymoUTFu4rbybmQ9Mt'); // au moins 6 caractères

        // 3. Le bouton doit être activé
        cy.get('button[type="submit"]').should('not.be.disabled').click();

        // 4. Attendre la requête interceptée puis vérifier l’URL
        cy.wait('@login');
        cy.url().should('include', '/users');
    });
});
