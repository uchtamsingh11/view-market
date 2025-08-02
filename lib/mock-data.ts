interface CandlestickData {
  datetime: string;
  open: number;
  high: number;
  low: number;
  close: number;
}

// Function to generate random price fluctuations
const generateRandomFluctuation = (base: number): number => {
  return base + (Math.random() - 0.5) * 10; // Adjust the multiplier for more/less volatility
};

// Function to generate mock Nifty 50 data
export const generateNifty50MockData = (): CandlestickData[] => {
  const data: CandlestickData[] = [];
  const startDate = new Date("2025-01-01T09:15:00");
  const endDate = new Date("2025-03-31T15:30:00");

  let currentDate = new Date(startDate);
  let lastClose = 21000; // Starting price for Nifty 50

  while (currentDate <= endDate) {
    const dayOfWeek = currentDate.getDay();

    // Check if it's a weekday (Monday to Friday)
    if (dayOfWeek >= 1 && dayOfWeek <= 5) {
      const tradingStartTime = new Date(currentDate);
      tradingStartTime.setHours(9, 15, 0, 0);

      const tradingEndTime = new Date(currentDate);
      tradingEndTime.setHours(15, 30, 0, 0);

      let currentTime = new Date(tradingStartTime);

      while (currentTime <= tradingEndTime) {
        const open = lastClose;
        const high = generateRandomFluctuation(open + 5);
        const low = generateRandomFluctuation(open - 5);
        const close = generateRandomFluctuation(open);

        data.push({
          datetime: currentTime.toISOString().slice(0, 16).replace("T", " "),
          open,
          high,
          low,
          close,
        });

        lastClose = close;
        currentTime.setMinutes(currentTime.getMinutes() + 1);
      }
    }

    currentDate.setDate(currentDate.getDate() + 1);
    currentDate.setHours(9, 15, 0, 0);
  }

  return data;
};