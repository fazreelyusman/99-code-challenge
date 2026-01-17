import { useEffect, useMemo, useState } from "react";
import TokenSelect from "./TokenSelect";

interface PriceItem {
    currency: string;
    price: number;
}

export default function SwapForm() {
    const [prices, setPrices] = useState<PriceItem[]>([]);
    const [from, setFrom] = useState<string>(() => localStorage.getItem("swap_from") || "");
    const [to, setTo] = useState<string>(() => localStorage.getItem("swap_to") || "");
    const [amount, setAmount] = useState<string>(() => localStorage.getItem("swap_amount") || "");
    const [error, setError] = useState<string>("");
    const [rotated, setRotated] = useState(false);

    // Fetch prices
    useEffect(() => {
        fetch("https://interview.switcheo.com/prices.json")
            .then(res => res.json())
            .then((data: PriceItem[]) => setPrices(data))
            .catch(() => setError("Failed to load prices"));
    }, []);

    const tokens = useMemo(() => {
        return prices.filter(p => p.price > 0);
    }, [prices]);
  
    useEffect(() => {
        console.log("prices", prices);
    },[prices])
    
    useEffect(() => {
        console.log("tokens", tokens);
    },[tokens])
    
    const handleSwitch = () => {
        if (!from && !to) return;

        setFrom(to);
        setTo(from);
        setAmount(outputAmount);
        setRotated(prev => !prev);
    };

    const fromPrice = prices.find(p => p.currency === from)?.price;
    const toPrice = prices.find(p => p.currency === to)?.price;
    const rate = fromPrice && toPrice ? fromPrice / toPrice : 0;

    const outputAmount = rate && amount ? (Number(amount) * rate).toFixed(6) : "0";

    // Save 'from'
    useEffect(() => {
        localStorage.setItem("swap_from", from);
    }, [from]);

    // Save 'to'
    useEffect(() => {
        localStorage.setItem("swap_to", to);
    }, [to]);

    // Save 'amount'
    useEffect(() => {
        localStorage.setItem("swap_amount", amount);
    }, [amount]);

    // Validation
    useEffect(() => {
        if (!amount) {
            setError("");
            return;
        }

        if (Number(amount) <= 0) {
            setError("Amount must be greater than zero");
            return;
        }

        if (from === to && from) {
            setError("Cannot swap the same token");
            return;
        }

        setError("");
    }, [amount, from, to]);

    return (
        <div className="max-w-md mx-auto mt-16 p-6 rounded-2xl bg-bg/80 backdrop-blur-xl shadow-xl border border-border bg-white/30 dark:bg-gray-800/60">
            <h2 className="text-2xl font-bold mb-6 text-center text-primary">
                Swap Tokens
            </h2>

            {/* FROM */}
            <div className="mb-4">
                <label className="text-sm mb-1 block">From</label>

                <div
                    className="flex items-center rounded-lg border border-border bg-bg
                    focus:outline-none"
                >
                    {/* Token prefix */}
                    <div className="border-r border-border">
                        <TokenSelect
                            value={from}
                            onChange={setFrom}
                            tokens={tokens}
                        />
                    </div>

                    {/* Amount input */}
                    <input
                        type="number"
                        placeholder="0.0"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="flex-1 px-3 py-2 bg-transparent focus:outline-none
                            placeholder:text-placeholder"
                    />
                </div>
            </div>

            {/* SWITCH */}
            <div className="flex justify-center mt-6 mb-2">
                <button
                    type="button"
                    onClick={handleSwitch}
                    disabled={!from || !to}
                    className={`
                        h-10 w-10 rounded-full flex items-center justify-center font-body
                        border border-border bg-button text-white
                        hover:bg-muted hover:scale-110 active:scale-100
                        transition-transform duration-300
                        ${rotated ? "rotate-180" : "rotate-360"}
                        disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100
                    `}
                    aria-label="Switch currencies"
                >
                    ⇅
                </button>
            </div>

            {/* TO */}
            <div className="mb-4">
                <label className="text-sm mb-1 block">To</label>

                <div
                    className="flex items-center rounded-lg border border-border bg-bg
                     focus:outline-none"
                >
                    {/* Token prefix */}
                    <div className="border-r border-border">
                        <TokenSelect
                            value={to}
                            onChange={setTo}
                            tokens={tokens}
                        />
                    </div>

                    {/* Amount input */}
                    
                    <input
                        type="text"
                        disabled
                        value={outputAmount}
                        className="flex-1 px-3 py-2 bg-transparent focus:outline-none cursor-not-allowed"
                    />
                </div>
            </div>

            {/* RATE */}
            {rate > 0 && !error && (
                <p className="text-xs text-placeholder mb-3">
                    Rate: 1 {from} ≈ {rate.toFixed(6)} {to}
                </p>
            )}

            {/* ERROR */}
            {error && (
                <p className="text-sm text-red-500 mb-3">{error}</p>
            )}
        </div>
    );
}
