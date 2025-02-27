export default {
  preset: "ts-jest/presets/default-esm",  // Используем preset для работы с ESM
  transformIgnorePatterns: [
    'node_modules/(?!(your-esm-dependencies)/)',  // Указываем, какие зависимости из node_modules нужно обрабатывать
    'node_modules/(?!(module-to-transform|another-module)/)'  // Другие модули, которые нужно транслировать
  ],
  testEnvironment: "node",  // Для работы с Node.js
  moduleFileExtensions: ["js", "ts", "tsx", "json"],  // Добавляем необходимые расширения файлов
  transform: {
    '^.+\\.(t|j)s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.json' }],  // Применяем ts-jest для всех ts/js файлов
    '^.+\\.(ts|tsx)$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.json' }],  // Применяем ts-jest для ts/tsx файлов
    '^.+\\.js$': 'babel-jest',  // Для JS файлов используем babel-jest

  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",  // Настроено маппирование путей
    "^(\\.{1,2}/.*)\\.js$": "$1"  // Убираем .js из импорта для относительных путей
  },
  roots: ["<rootDir>/tests"],  // Указываем корень для тестов
  extensionsToTreatAsEsm: [".ts", ".tsx", ],  // Указываем расширения для ESM
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.json',  // Указываем tsconfig
    }
  },
  // Для поддержания ES-модулей
};