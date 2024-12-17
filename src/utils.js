export const values = [
  { label: "1", value: "1" },
  { label: "2", value: "2" },
  { label: "3", value: "3" },
  { label: "4", value: "4" },
  { label: "5", value: "5" },
  { label: "6", value: "6" },
  { label: "7", value: "7" },
  { label: "8", value: "8" },
  { label: "9", value: "9" },
  { label: "0", value: "0" },
];

export const controlValues = [
  { label: "+", value: "+" },
  { label: "-", value: "-" },
  { label: "*", value: "*" },
  { label: "/", value: "/" },
];

export const calc = (first, second, op) => {
  switch (op) {
    case "+": {
      return Number(second) + Number(first);
    }
    case "-": {
      return Number(second) - Number(first);
    }
    case "*": {
      return Number(second) * Number(first);
    }
    case "/": {
      return Number(second) / Number(first);
    }
    default: {
      return 0;
    }
  }
};
