// Número é Primo
function isPrime(n) {
    if (n <= 1) return false;
    for (let i = 2; i <= Math.sqrt(n); i++) {
        if (n % i === 0) return false;
    }
    return true;
}
console.log("Testando números primos: 7 e 10");
console.log(isPrime(7));  // true
console.log(isPrime(10)); // false
console.log("\n")

// Somatório
function sum(numbers) {
    return numbers.reduce((acc, curr) => acc + curr, 0);
}
console.log("Testando somatório de [1, 2, 3, 4]");
console.log(sum([1, 2, 3, 4]));  // 10
console.log("\n")

// Fibonacci
function fibonacci(n) {
    let fib = [0, 1];
    for (let i = 2; i <= n; i++) {
        fib[i] = fib[i - 1] + fib[i - 2];
    }
    return fib;
}
console.log("Testando fibonacci de 6");
console.log(fibonacci(6));
console.log("\n")

// Máximo Divisor Comum (MDC)
function mdc(a, b) {
    while (b !== 0) {
        let temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}
console.log("Testando MDC de 56 e 98");
console.log(mdc(56, 98));  // 14
console.log("\n")

// Ordenação com Quicksort
function quicksort(arr) {
    if (arr.length <= 1) return arr;
    const pivot = arr[0];
    const left = arr.slice(1).filter(x => x < pivot);
    const right = arr.slice(1).filter(x => x >= pivot);
    return [...quicksort(left), pivot, ...quicksort(right)];
}
console.log("Testando quicksort de [5, 2, 9, 1, 5, 6]");
console.log(quicksort([5, 2, 9, 1, 5, 6]));
console.log("\n")

// Contagem de Números Dentro de um Intervalo
function countInRange(arr, N) {
  const lowerBound = arr[0];
  return arr.filter(num => num >= lowerBound && num <= N).length;
}
console.log("Testando contagem de números no intervalo [1, 2, 3, 4, 5] e 4");
console.log(countInRange([1, 2, 3, 4, 5], 4)); // 4
console.log("\n")