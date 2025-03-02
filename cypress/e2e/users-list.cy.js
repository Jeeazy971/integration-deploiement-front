describe('Users List', () => {
    beforeEach(() => {
        // Simuler un utilisateur admin dans le localStorage
        localStorage.setItem('authToken', 'fake-admin-token');
        localStorage.setItem('userRole', 'admin');

        // Stub des appels
        cy.intercept('GET', '**/users', {
            statusCode: 200,
            body: [
                { id: '1', firstName: 'Alice', lastName: 'Martin', email: 'alice@example.com', birthDate: '1990-05-01' },
                { id: '2', firstName: 'Bob', lastName: 'Durand', email: 'bob@example.com', birthDate: '1985-03-15' }
            ]
        }).as('getUsersForAdmin');

        cy.intercept('GET', '**/users/admins', {
            statusCode: 200,
            body: []
        }).as('getAdmins');

        // Visiter la page /users
        cy.visit('/users');

        // Attendre que les requêtes soient terminées avant de tester l'affichage
        cy.wait(['@getUsersForAdmin', '@getAdmins']);
    });

    it('affiche la liste des utilisateurs inscrits', () => {
        // Puisque nous avons stubbé la réponse avec 2 utilisateurs, le composant doit afficher le titre
        cy.contains('Liste des utilisateurs inscrits').should('be.visible');
        cy.contains('Alice Martin').should('be.visible');
        cy.contains('Bob Durand').should('be.visible');
    });
});
