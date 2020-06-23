module.exports = {
    "ignorePatterns": [
        ".eslintrc.js", 
        "cypress/support/**/*", 
        "gatsby-config.js",
        "gatsby-node.js",
        "cypress/plugins/**/*"
    ],
    "globals": {
        "__PATH_PREFIX__": true,
    },
    "env": {
        "browser": true,
        "es2020": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 11,
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "@typescript-eslint",
        "@kaminrunde/firescout"
    ],
    "rules": {
        "@kaminrunde/firescout/onclick-needs-handle":1
    }
};
