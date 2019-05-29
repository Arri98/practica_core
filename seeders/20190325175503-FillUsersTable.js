'use strict';

var crypt = require('../helpers/crypt');


module.exports = {
    up(queryInterface, Sequelize) {

        return queryInterface.bulkInsert('users', [
            {
                username: 'admin',
                password: crypt.encryptPassword('1234', 'aaaa'),
                salt: 'aaaa',
                question: '¿Donde hice la comunion?',
                answer: 'No la hice',
                isAdmin: true,
                createdAt: new Date(), updatedAt: new Date()
            },
            {
                username: 'pepe',
                password: crypt.encryptPassword('5678', 'bbbb'),
                salt: 'bbbb',
                question: '¿Donde hice la comunion?',
                answer: 'No la hice',
                createdAt: new Date(), updatedAt: new Date()
            },
            {
                username: 'Carlos',
                password: crypt.encryptPassword('aaaa', 'bbbb'),
                salt: 'bbcc',
                question: '1+1',
                isAdmin: true,
                answer: '3',
                createdAt: new Date(), updatedAt: new Date()
            }
        ]);
    },

    down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('users', null, {});
    }
};
