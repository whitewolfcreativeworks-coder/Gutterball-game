// Course-design tools (not part of the normal test run): npx vitest run --config tools/vitest.config.ts
export default { test: { include: ['tools/**/*.test.ts'], testTimeout: 1800000 } };
