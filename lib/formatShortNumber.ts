export function formatShortNumber(n: number, decimals = 1): string {
  // keep sign and operate on absolute value
  const sign = n < 0 ? "-" : "";
  const abs = Math.abs(n);

  // 0..999 -> return same number as string (no formatting)
  if (abs < 1000) {
    // preserve integer formatting for whole numbers
    return sign + String(Math.trunc(abs));
  }

  // helper: format value with up to `decimals` places and trim trailing zeros
  const trim = (value: number) => {
    // toFixed produces a predictable decimal string
    const fixed = value.toFixed(decimals);
    // remove trailing ".0" or other trailing zeros: "1.0" -> "1", "1.20" -> "1.2"
    return fixed.replace(/\.0+$|(\.\d*?[1-9])0+$/u, "$1");
  };

  if (abs < 1_000_000) {
    return `${sign}${trim(abs / 1_000)}k`;
  }

  if (abs < 1_000_000_000) {
    return `${sign}${trim(abs / 1_000_000)}M`;
  }

  // billions and larger
  return `${sign}${trim(abs / 1_000_000_000)}B`;
}