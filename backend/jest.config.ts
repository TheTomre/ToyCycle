export default {
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.json"
    }
  },
  moduleFileExtensions: ["js", "ts"],
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/tests/**/*.(spec|test).[jt]s?(x)"]
};
