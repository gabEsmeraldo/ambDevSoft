// Import algorithms from the codes.js file - rewritten as TypeScript
function isPrime(n: number): boolean {
  if (n <= 1) return false;
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) return false;
  }
  return true;
}

function sum(numbers: number[]): number {
  return numbers.reduce((acc, curr) => acc + curr, 0);
}

function fibonacci(n: number): number[] {
  let fib = [0, 1];
  for (let i = 2; i <= n; i++) {
    fib[i] = fib[i - 1] + fib[i - 2];
  }
  return fib;
}

function mdc(a: number, b: number): number {
  while (b !== 0) {
    let temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}

function quicksort(arr: number[]): number[] {
  if (arr.length <= 1) return arr;
  const pivot = arr[0];
  const left = arr.slice(1).filter(x => x < pivot);
  const right = arr.slice(1).filter(x => x >= pivot);
  return [...quicksort(left), pivot, ...quicksort(right)];
}

function countInRange(arr: number[], N: number): number {
  const lowerBound = arr[0];
  return arr.filter(num => num >= lowerBound && num <= N).length;
}

export type Algorithm = {
  title: string;
  description: string;
  category: {
    name: string;
    color: string;
  };
  example: string;
  code: string;
  formFields: Array<{
    id: string;
    label: string;
    type: "number" | "text";
    placeholder: string;
    helperText?: string;
  }>;
  execute: (inputs: Record<string, string>) => any;
};

export const algorithms: Record<string, Algorithm> = {
  isPrime: {
    title: "Is Prime",
    description: "Determine if a number is prime",
    category: {
      name: "Math",
      color: "blue",
    },
    example: "isPrime(7) ➡️ true",
    code: `function isPrime(n) {
    if (n <= 1) return false;
    for (let i = 2; i <= Math.sqrt(n); i++) {
        if (n % i === 0) return false;
    }
    return true;
}`,
    formFields: [
      {
        id: "number-input",
        label: "Number",
        type: "number",
        placeholder: "Enter a number (e.g. 7)",
      },
    ],
    execute: (inputs) => {
      const n = parseInt(inputs["number-input"]);
      if (isNaN(n)) {
        throw new Error("Please enter a valid number");
      }
      return isPrime(n);
    },
  },
  sum: {
    title: "Sum",
    description: "Calculate the sum of an array of numbers",
    category: {
      name: "Math",
      color: "blue",
    },
    example: "sum([1, 2, 3, 4]) ➡️ 10",
    code: `function sum(numbers) {
    return numbers.reduce((acc, curr) => acc + curr, 0);
}`,
    formFields: [
      {
        id: "array-input",
        label: "Array of Numbers",
        type: "text",
        placeholder: "Comma-separated numbers (e.g. 1,2,3,4)",
        helperText: "Enter numbers separated by commas",
      },
    ],
    execute: (inputs) => {
      const input = inputs["array-input"].trim();
      if (!input) {
        throw new Error("Please enter an array of numbers");
      }

      try {
        const numbers = input.split(",").map((n) => {
          const parsed = parseFloat(n.trim());
          if (isNaN(parsed)) {
            throw new Error(`'${n.trim()}' is not a valid number`);
          }
          return parsed;
        });
        return sum(numbers);
      } catch (e: any) {
        throw new Error("Invalid input: " + e.message);
      }
    },
  },
  fibonacci: {
    title: "Fibonacci",
    description: "Generate Fibonacci sequence up to n",
    category: {
      name: "Sequence",
      color: "yellow",
    },
    example: "fibonacci(6) ➡️ [0,1,1,2,3,5,8]",
    code: `function fibonacci(n) {
    let fib = [0, 1];
    for (let i = 2; i <= n; i++) {
        fib[i] = fib[i - 1] + fib[i - 2];
    }
    return fib;
}`,
    formFields: [
      {
        id: "number-input",
        label: "N (Number of Terms)",
        type: "number",
        placeholder: "Enter a number (e.g. 6)",
        helperText: "Generate Fibonacci sequence up to nth term",
      },
    ],
    execute: (inputs) => {
      const n = parseInt(inputs["number-input"]);
      if (isNaN(n)) {
        throw new Error("Please enter a valid number");
      }
      if (n < 0) {
        throw new Error("Please enter a positive number");
      }
      if (n > 1000) {
        throw new Error("Input too large, please use a smaller number (max 1000)");
      }
      return fibonacci(n);
    },
  },
  mdc: {
    title: "MDC",
    description: "Find the greatest common divisor (GCD)",
    category: {
      name: "Math",
      color: "blue",
    },
    example: "mdc(56, 98) ➡️ 14",
    code: `function mdc(a, b) {
    while (b !== 0) {
        let temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}`,
    formFields: [
      {
        id: "number-a",
        label: "First Number (a)",
        type: "number",
        placeholder: "e.g. 56",
      },
      {
        id: "number-b",
        label: "Second Number (b)",
        type: "number",
        placeholder: "e.g. 98",
      },
    ],
    execute: (inputs) => {
      const a = parseInt(inputs["number-a"]);
      const b = parseInt(inputs["number-b"]);

      if (isNaN(a) || isNaN(b)) {
        throw new Error("Please enter valid numbers");
      }

      return mdc(Math.abs(a), Math.abs(b));
    },
  },
  quicksort: {
    title: "Quicksort",
    description: "Sort an array using quicksort algorithm",
    category: {
      name: "Sorting",
      color: "purple",
    },
    example: "quicksort([5,2,9,1,5,6]) ➡️ [1,2,5,5,6,9]",
    code: `function quicksort(arr) {
    if (arr.length <= 1) return arr;
    const pivot = arr[0];
    const left = arr.slice(1).filter(x => x < pivot);
    const right = arr.slice(1).filter(x => x >= pivot);
    return [...quicksort(left), pivot, ...quicksort(right)];
}`,
    formFields: [
      {
        id: "array-input",
        label: "Array to Sort",
        type: "text",
        placeholder: "Comma-separated numbers (e.g. 5,2,9,1,5,6)",
        helperText: "Enter numbers separated by commas",
      },
    ],
    execute: (inputs) => {
      const input = inputs["array-input"].trim();
      if (!input) {
        throw new Error("Please enter an array of numbers");
      }

      try {
        const numbers = input.split(",").map((n) => {
          const parsed = parseFloat(n.trim());
          if (isNaN(parsed)) {
            throw new Error(`'${n.trim()}' is not a valid number`);
          }
          return parsed;
        });

        if (numbers.length > 1000) {
          throw new Error("Array too large, please use fewer elements (max 1000)");
        }

        return quicksort(numbers);
      } catch (e: any) {
        throw new Error("Invalid input: " + e.message);
      }
    },
  },
  countInRange: {
    title: "Count In Range",
    description: "Count numbers within a range",
    category: {
      name: "Array",
      color: "green",
    },
    example: "countInRange([1,2,3,4,5], 4) ➡️ 4",
    code: `function countInRange(arr, N) {
    const lowerBound = arr[0];
    return arr.filter(num => num >= lowerBound && num <= N).length;
}`,
    formFields: [
      {
        id: "array-input",
        label: "Array of Numbers",
        type: "text",
        placeholder: "Comma-separated numbers (e.g. 1,2,3,4,5)",
        helperText: "Enter numbers separated by commas",
      },
      {
        id: "upper-bound",
        label: "Upper Bound (N)",
        type: "number",
        placeholder: "e.g. 4",
        helperText: "Upper bound for counting numbers",
      },
    ],
    execute: (inputs) => {
      const arrayInput = inputs["array-input"].trim();
      const upperBound = parseInt(inputs["upper-bound"]);

      if (!arrayInput) {
        throw new Error("Please enter an array of numbers");
      }

      if (isNaN(upperBound)) {
        throw new Error("Please enter a valid upper bound");
      }

      try {
        const numbers = arrayInput.split(",").map((n) => {
          const parsed = parseFloat(n.trim());
          if (isNaN(parsed)) {
            throw new Error(`'${n.trim()}' is not a valid number`);
          }
          return parsed;
        });

        if (numbers.length === 0) {
          throw new Error("Array cannot be empty");
        }

        return countInRange(numbers, upperBound);
      } catch (e: any) {
        throw new Error("Invalid input: " + e.message);
      }
    },
  },
};
