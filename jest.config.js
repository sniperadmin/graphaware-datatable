module.exports = {
  // preset: 'ts-jest',
  moduleNameMapper: {
    "^@/(.*)$": '<rootDir>/src/$1',
    "^~/(.*)$": '<rootDir>/src/$1',
    '^vue$': 'vue/dist/vue.common.js',
  },
  moduleFileExtensions: [
    'js',
    'jsx',
    'ts',
    'tsx',
    'json',
    'vue'
  ],
  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.+\\.vue$': 'vue-jest',
    '^.+\\.(t|j)sx?$': 'ts-jest',
    '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|svg|woff|woff2)$': 'jest-transform-stub'
  },
  transformIgnorePatterns: ["<rootDir>/node_modules/(?!(vuetify)/)"],
  testMatch: ['<rootDir>/tests/*.spec.ts?(x)'],
  testEnvironment: "jest-environment-jsdom",
  setupFiles: ["<rootDir>/tests/index.ts"],

  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/src/components/**/*.vue',
  ],
  coveragePathIgnorePatterns: ["/node_modules/", "package.json"],
}
