// https://kulshekhar.github.io/ts-jest/docs/getting-started/paths-mapping/

module.exports = {
  preset: "ts-jest",
  transform: {
    "^.+\\.[tj]sx?$": "ts-jest",
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga|css)$":
      "<rootDir>/fileTransformer.js",
  },
  testEnvironment: "jsdom",

  setupFilesAfterEnv: ["./src/setupTests.ts"],
  transformIgnorePatterns: ["node_modules/(?!(axios))"],
  moduleNameMapper: {
    "src(.*)$": "<rootDir>/src$1",
  },
};
