/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    // timeout: 20000,
    testMatch: ['**/**/*.test.ts', '**/__tests__/**/*.test.ts'],
    verbose: true,
    forceExit: true,
    // clearMocks: true
};