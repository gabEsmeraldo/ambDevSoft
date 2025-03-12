import java.util.Arrays;

public class codes {
    public static void main(String[] args) {
        // Testando a função de verificação de número primo
        System.out.println("Testando a função isPrime:");
        System.out.println("7 é primo? " + isPrime(7));  // true
        System.out.println("10 é primo? " + isPrime(10)); // false
        System.out.println();

        // Testando a função de somatório
        System.out.println("Testando a função sum:");
        int[] numbers = {1, 2, 3, 4};
        System.out.println("Somatório de [1, 2, 3, 4]: " + sum(numbers));  // 10
        System.out.println();

        // Testando a função de Fibonacci
        System.out.println("Testando a função fibonacci:");
        int[] fibSeq = fibonacci(6);
        System.out.print("Sequência de Fibonacci até o 6º termo: ");
        for (int num : fibSeq) {
            System.out.print(num + " ");
        }
        System.out.println("\n");

        // Testando a função de Máximo Divisor Comum (MDC)
        System.out.println("Testando a função mdc:");
        System.out.println("MDC de 56 e 98: " + mdc(56, 98));  // 14
        System.out.println();

        // Testando a função de ordenação com Quicksort
        System.out.println("Testando a função quicksort:");
        int[] arr = {10, 7, 8, 9, 1, 5};
        System.out.println("Array original: " + Arrays.toString(arr));
        System.out.println("Array ordenado: " + Arrays.toString(quicksort(arr)));
        System.out.println();

        // Testando a função de contagem de números dentro de um intervalo
        System.out.println("Testando a função countInRange:");
        int[] rangeArr = {1, 2, 3, 4, 5};
        System.out.println("Números no intervalo [1, 4]: " + countInRange(rangeArr, 4)); // 4
    }

    // Função para verificar se um número é primo
    public static boolean isPrime(int n) {
        if (n <= 1) return false;
        for (int i = 2; i <= Math.sqrt(n); i++) {
            if (n % i == 0) return false;
        }
        return true;
    }

    // Função para calcular o somatório de um array de números
    public static int sum(int[] numbers) {
        int total = 0;
        for (int num : numbers) {
            total += num;
        }
        return total;
    }

    // Função para gerar a sequência de Fibonacci até o n-ésimo termo
    public static int[] fibonacci(int n) {
        int[] fib = new int[n + 1];
        fib[0] = 0;
        fib[1] = 1;
        for (int i = 2; i <= n; i++) {
            fib[i] = fib[i - 1] + fib[i - 2];
        }
        return fib;
    }

    // Função para calcular o Máximo Divisor Comum (MDC)
    public static int mdc(int a, int b) {
        while (b != 0) {
            int temp = b;
            b = a % b;
            a = temp;
        }
        return a;
    }

    // Função para ordenação com Quicksort
    public static int[] quicksort(int[] arr) {
        if (arr.length <= 1) return arr;
        int pivot = arr[0];
        int[] left = Arrays.stream(arr).filter(x -> x < pivot).toArray();
        int[] right = Arrays.stream(arr).filter(x -> x > pivot).toArray();
        return concatenate(quicksort(left), new int[]{pivot}, quicksort(right));
    }

    // Função auxiliar para concatenar arrays
    public static int[] concatenate(int[] left, int[] middle, int[] right) {
        int[] result = new int[left.length + middle.length + right.length];
        System.arraycopy(left, 0, result, 0, left.length);
        System.arraycopy(middle, 0, result, left.length, middle.length);
        System.arraycopy(right, 0, result, left.length + middle.length, right.length);
        return result;
    }

    // Função para contar números dentro de um intervalo
    public static int countInRange(int[] arr, int N) {
        int lowerBound = arr[0];
        int count = 0;
        for (int num : arr) {
            if (num >= lowerBound && num <= N) {
                count++;
            }
        }
        return count;
    }
}