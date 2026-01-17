import { useEffect, useRef, useState } from "react";

interface Token {
    currency: string;
    price: number;
}

interface Props {
    value: string;
    onChange: (v: string) => void;
    tokens: Token[];
}

const tokenIcon = (symbol: string) => `https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${symbol}.svg`;

export default function TokenSelect({ value, onChange, tokens }: Props) {
    const [open, setOpen] = useState(false);
    const [isImgError, setIsImgError] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    // On outside click
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) setOpen(false);
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [])

    // On ESC key
    useEffect(() => {
        function handleEsc(event: KeyboardEvent) {
            if (event.key === "Escape") setOpen(false);
        }
        document.addEventListener("keydown", handleEsc);
        return () => document.removeEventListener("keydown", handleEsc);
    }, [])

    return (
        <div className="relative w-[130px]" ref={wrapperRef}>
            {/* Selected */}
            <button
                type="button"
                onClick={() => setOpen(!open)}
                className="w-full flex items-center gap-2 px-3 py-2
                bg-transparent hover:bg-muted"
            >
                {value ? (
                    <>
                        { !isImgError &&
                            <img
                                src={tokenIcon(value)}
                                className="h-5 w-5"
                                onError={() => setIsImgError(true)}
                            />
                        }
                        <span>{value}</span>
                    </>
                ) : (
                    <span className="text-muted-foreground">Select</span>
                )}
            </button>

            {/* Dropdown */}
            {open && (
                <div className="absolute z-50 mt-1 w-full rounded-lg scrollable
                    bg-bg border border-border shadow-lg max-h-60 overflow-auto"
                >
                    
                    <button
                        type="button"
                        onClick={() => {
                            onChange("");
                            setIsImgError(true);
                            setOpen(false);
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2
                            hover:bg-hover text-left"
                    >
                        <span>Select</span>
                    </button>
                    {tokens.map(t => (
                        <button
                            key={t.currency}
                            type="button"
                            onClick={() => {
                                onChange(t.currency);
                                setIsImgError(false);
                                setOpen(false);
                            }}
                            className="w-full flex items-center gap-2 px-3 py-2
                                hover:bg-hover text-left"
                        >
                            <img
                                src={tokenIcon(t.currency)}
                                className="h-5 w-5"
                                onError={(e) => (e.currentTarget.style.display = "none")}
                            />
                            <span>{t.currency}</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
