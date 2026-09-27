/**
 * Minimal local ESLint plugin referenced by eslint.config.ts.
 * The `route-element-jsx` rule applies only to src/router/config.tsx
 * (which this project does not use) — implemented as a no-op so that
 * `npm run lint` can execute.
 */
const rule = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Ensure route elements are JSX components (no-op in this project).',
    },
    schema: [],
    messages: {},
  },
  create() {
    return {};
  },
};

module.exports = {
  rules: {
    'route-element-jsx': rule,
  },
};
