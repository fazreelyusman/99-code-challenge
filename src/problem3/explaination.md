# Computational Inefficiencies & Anti-Patterns

## 1. Incorrect Use of `any`
```ts
const getPriority = (blockchain: any): number => { ... }

Using any removes TypeScript’s type safety.

Allows invalid values without compile-time errors.

Hides logical bugs.

Improvement:
Use a union type or enum for blockchain.
