type Blockchain = 'Osmosis' | 'Ethereum' | 'Arbitrum' | 'Zilliqa' | 'Neo';

interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: Blockchain;
}

interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
}

const PRIORITY_MAP: Record<Blockchain, number> = {
  Osmosis: 100,
  Ethereum: 50,
  Arbitrum: 30,
  Zilliqa: 20,
  Neo: 20,
};

type WalletPageProps = BoxProps;

const WalletPage = ({ ...rest }: WalletPageProps) => {
  const balances = useWalletBalances();
  const prices = usePrices();

  const sortedBalances = useMemo(() => {
    return balances
      .filter(
        (b) => b.amount > 0 && PRIORITY_MAP[b.blockchain] !== undefined
      )
      .map((b) => ({
        ...b,
        priority: PRIORITY_MAP[b.blockchain],
      }))
      .sort((a, b) => b.priority - a.priority);
  }, [balances]);

  const formattedBalances = useMemo<FormattedWalletBalance[]>(() => {
    return sortedBalances.map((b) => ({
      ...b,
      formatted: new Intl.NumberFormat().format(b.amount),
    }));
  }, [sortedBalances]);

  const rows = useMemo(() => {
    return formattedBalances.map((balance) => {
      const usdValue = prices[balance.currency] * balance.amount;

      return (
        <WalletRow
          key={balance.currency}
          amount={balance.amount}
          usdValue={usdValue}
          formattedAmount={balance.formatted}
        />
      );
    });
  }, [formattedBalances, prices]);

  return <div {...rest}>{rows}</div>;
};
