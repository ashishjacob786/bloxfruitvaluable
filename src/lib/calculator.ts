export type TradeItem = {
  id: string;
  name: string;
  imageUrl: string;
  currentTradingValue: number;
};

export type TradeResult = 'MASSIVE_W' | 'W' | 'F' | 'L' | 'MASSIVE_L';

export interface TradeAnalysis {
  sideATotal: number;
  sideBTotal: number;
  differenceValue: number;
  differencePercentage: number;
  result: TradeResult;
}

export function calculateTrade(sideA: TradeItem[], sideB: TradeItem[]): TradeAnalysis {
  const sideATotal = sideA.reduce((sum, item) => sum + item.currentTradingValue, 0);
  const sideBTotal = sideB.reduce((sum, item) => sum + item.currentTradingValue, 0);

  const differenceValue = sideBTotal - sideATotal;
  
  let differencePercentage = 0;
  if (sideATotal > 0) {
    differencePercentage = (differenceValue / sideATotal) * 100;
  } else if (sideATotal === 0 && sideBTotal > 0) {
    differencePercentage = 100; // Infinity, but we cap it at 100% for Massive W
  }

  let result: TradeResult = 'F';

  if (differencePercentage > 25) {
    result = 'MASSIVE_W';
  } else if (differencePercentage > 5) {
    result = 'W';
  } else if (differencePercentage >= -5 && differencePercentage <= 5) {
    result = 'F';
  } else if (differencePercentage >= -25) {
    result = 'L';
  } else {
    result = 'MASSIVE_L';
  }

  // Edge case: Both empty
  if (sideATotal === 0 && sideBTotal === 0) {
    result = 'F';
    differencePercentage = 0;
  }

  return {
    sideATotal,
    sideBTotal,
    differenceValue,
    differencePercentage,
    result,
  };
}

export function formatValue(val: number): string {
  if (val === 0) return "N/A";
  if (val >= 1000000000) {
    return (val / 1000000000).toFixed(2).replace(/\.?0+$/, '') + 'B';
  }
  if (val >= 1000000) {
    return (val / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  }
  if (val >= 1000) {
    return (val / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
  }
  return val.toString();
}
