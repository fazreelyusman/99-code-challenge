# Computational Inefficiencies & Anti-Patterns

---

## 1. Missing Types

```ts
const getPriority = (blockchain: any): number => { ... }
```

#### Issue: 
- `any` usage defeats TypeScript
- Allows invalid values without compile-time errors
- Hides logical bugs

#### Improvement:
- Replace `any` with a union type or enum
```ts
type Blockchain = 'Osmosis' | 'Ethereum' | 'Arbitrum' | 'Zilliqa' | 'Neo';
```



## 2. Missing Property in Interface

```ts
interface WalletBalance {
  currency: string;
  amount: number;
}
```

Later usage:
```ts
balance.blockchain
```

#### Issue:
- `blockchain` is accessed but not declared
- Leads to implicit `any` or runtime errors

#### Improvement:
- Define `blockchain` in the interface



## 3. Function Recreated on Every Render

```ts
const getPriority = (...) => { ... }
```

#### Issue:
- Function recreated on each render
- Reduces effectiveness of memoization

#### Improvement:
- Move function outside component or use a constant lookup map



## 4. Hard-Coded `switch` Logic

```ts
switch (blockchain) { ... }
```

#### Issue:
- Not scalable
- Hard to maintain and extend

#### Improvement:
- Replace with a priority map object
```ts
const PRIORITY_MAP: Record<Blockchain, number>
```



## 5. Undefined Variable (`lhsPriority`)

```ts
if (lhsPriority > -99) {
```

#### Issue:
- Variable is not defined
- Causes runtime crash

#### Improvement:
- Use the correct variable name (`balancePriority`)



## 6. Incorrect Filter Logic

```ts
if (balance.amount <= 0) {
  return true;
}
```

#### Issue:
- Includes zero or negative balances
- Usually wallets display positive balances

#### Improvement:
- Filter balances with amount equal or greater than zero
```ts
balance.amount >= 0
```



## 7. Repeated Priority Computation During Sort

```ts
getPriority(lhs.blockchain)
getPriority(rhs.blockchain)
```

#### Issue:
- Called repeatedly during sort (`O(n log n)`).
- Causes unnecessary computation

#### Improvement:
- Compute priority once per balance before sorting



## 8. Incorrect `useMemo` Dependencies

```ts
useMemo(() => { ... }, [balances, prices])
```

#### Issue:
- `prices` is not used inside the memo
- Triggers unnecessary recomputation

#### Improvement:
- Remove unused dependencies
```ts
[balances]
```



## 9. Derived Data Not Memoized

```ts
const formattedBalances = sortedBalances.map(...)
```

#### Issue:
- Runs on every render
- Fully derived from memoized data

#### Improvement:
- Wrap derived data in `useMemo`



## 10. Wrong Data Source Used for Rendering

```ts
sortedBalances.map((balance: FormattedWalletBalance) => ...)
```

#### Issue:
- Data does not include `formatted`
- Type mismatch and runtime risk

#### Improvement:
- Render from `formattedBalances`



## 11. Using Array Index as React Key

```tsx
key={index}
```

#### Issue:
- Breaks React reconciliation
- Causes unnecessary re-renders

#### Improvement:
- Use a stable unique key such as `balance.currency`



## 12. Unnecessary Use of `React.FC`

```ts
const WalletPage: React.FC<Props>
```

#### Issue:
- Implicit `children`
- Redundant typing
- No longer recommended by many TS teams

#### Improvement:
- Type props directly in function parameters



## 13. Unused `children` Prop

```ts
const { children, ...rest } = props;
```

#### Issue:
- `children` is never used

#### Improvement:
- Remove unused destructuring



## 14. Primitive Number Formatting

```ts
balance.amount.toFixed()
```

#### Issue:
- Not locale awareness
- Poor UX

#### Improvement:
- Use `Intl.NumberFormat`
