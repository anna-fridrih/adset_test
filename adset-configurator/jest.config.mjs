export default {
  preset: "ts-jest/presets/default-esm",
  testEnvironment: "node",
  extensionsToTreatAsEsm: [".ts"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^(\\.{1,2}/.*)\\.js$": "$1"
  },
  transform: {
    "^.+\\.ts$": ["ts-jest", {
      useESM: true,
      tsconfig: "<rootDir>/tsconfig.json"
    }]
  },
  transformIgnorePatterns: [
    "node_modules/(?!(tslib|@nestjs)/)"
  ],
  globals: {
  }
};