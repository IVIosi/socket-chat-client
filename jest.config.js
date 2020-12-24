module.exports = {
  // The root of your source code, typically /src
  // `<rootDir>` is a token Jest substitutes
  roots: ['<rootDir>/src'],

  // Jest transformations -- this adds support for TypeScript
  // using ts-jest
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },

  // Runs special logic, when using React Testing Library
  // and adds special extended assertions to Jest
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],

  moduleNameMapper: {
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@helpers/(.*)$': '<rootDir>/src/helpers/$1',
  },
  // Test spec file resolution pattern
  // Matches parent folder `__tests__` and filename
  // should contain `test` or `spec`.
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',

  // Module file extensions for importing
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
