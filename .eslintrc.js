module.exports = {
  extends: 'airbnb-base',
  "globals": {
    "window": true,
    "document": true,
    "m": true, // mithrill global scoped object
  },
  rules: {
    "arrow-body-style": ["error", "as-needed",{requireReturnForObjectLiteral: false}],
    "no-underscore-dangle": [0],
    'arrow-parens': ['error', 'as-needed'],
    'comma-dangle': ['error', 'never'],
    'max-len': ['error', { code: 120 }],
    'quote-props': ['error', 'as-needed'],
    'no-param-reassign': ["error", { "props": false }],
    camelcase: [0],
    camelcase: ["off"],
    quotes: ['error', 'single'],
    indent: ['error', 2],
  }
};
