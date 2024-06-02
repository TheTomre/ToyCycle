export default {
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.json"
    }
  },
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  moduleFileExtensions: ["js", "ts"],
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/tests/**/*.(spec|test).[jt]s?(x)"]
};
