// const { pathsToModuleNameMapper } = require("ts-jest");
// In the following statement, replace `./tsconfig` with the path to your `tsconfig` file
// which contains the path mapping (ie the `compilerOptions.paths` option):
// const { compilerOptions } = require("./tsconfig");

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
};
