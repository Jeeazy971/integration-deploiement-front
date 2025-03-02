describe('Registration Form', () => {
    beforeEach(() => {
        // Simuler un utilisateur non admin
        localStorage.setItem('userRole', 'user');
        localStorage.removeItem('authToken');
        cy.visit('/');
    });

    it("affiche un message d'erreur si le formulaire est invalide", () => {
        // Par exemple, forcer la validation sur le champ firstName
        cy.get('#firstName').focus().blur();
        cy.contains('Prénom invalide').should('be.visible');
        // Vous pouvez ajouter d'autres vérifications pour d'autres champs si nécessaire.
    });

    it('enregistre un nouvel utilisateur avec un formulaire valide', () => {
        // Stubber l'API d'enregistrement public
        cy.intercept('POST', '**/public/register', {
            statusCode: 200,
            body: { token: 'fake-token' }
        }).as('register');

        // Remplir le formulaire avec des données valides
        cy.get('#firstName').type('Jean');
        cy.get('#lastName').type('Dupont');
        cy.get('#email').type('jean.dupont@example.com');
        cy.get('#password').type('secret123');
        cy.get('#birthDate').type('1990-01-01');
        cy.get('#city').type('Paris');
        cy.get('#postalCode').type('75001');

        // Vérifier que le bouton est activé puis cliquer
        cy.get('button[type="submit"]').should('not.be.disabled').click();
        cy.wait('@register');
        cy.contains('Enregistrement réussi').should('be.visible');
    });
});
