def find_prime_factors_with_steps(num):
    """
    Encontra a fatoração em números primos com passos detalhados
    """
    steps = []
    prime_factorization = {}
    
    current = num
    divisor = 2
    
    while current > 1:
        if current % divisor == 0:
            steps.append({"divisor": divisor, "quotient": current // divisor, "is_common": False})
            current = current // divisor
            
            # Conta ocorrências para a fatoração prima
            prime_factorization[divisor] = prime_factorization.get(divisor, 0) + 1
        else:
            divisor += 1
    
    return {"steps": steps, "prime_factorization": prime_factorization}

def find_common_factors(factors1, factors2):
    """
    Encontra fatores comuns com seus expoentes mínimos
    """
    common_factors = {}
    
    for factor, exponent1 in factors1.items():
        if factor in factors2:
            # Pega o expoente mínimo para fatores comuns
            common_factors[factor] = min(exponent1, factors2[factor])
    
    return common_factors

def calculate_gcd_from_common_factors(common_factors):
    """
    Calcula o MDC a partir dos fatores comuns
    """
    if not common_factors:
        return 1  # Não há fatores comuns além do 1
    
    gcd = 1
    
    for factor, exponent in common_factors.items():
        gcd *= factor ** exponent
    
    return gcd

def mark_common_factors_in_steps(steps1, steps2, common_factors):
    """
    Marca os fatores comuns nos passos
    """
    # Acompanha quantos de cada fator comum já vimos
    factor_count1 = {factor: 0 for factor in common_factors}
    factor_count2 = {factor: 0 for factor in common_factors}
    common_factor_counts = {}
    
    # Inicializa contagens
    for factor in common_factors:
        # Conta quantos fatores comuns no MDC final
        common_factor_counts[factor] = sum(1 for step in steps1 if step["divisor"] == factor)
        common_factor_counts[factor] = min(
            common_factor_counts[factor],
            sum(1 for step in steps2 if step["divisor"] == factor)
        )
    
    # Marca fatores comuns em steps1
    for step in steps1:
        if step["divisor"] in common_factors:
            factor_count1[step["divisor"]] += 1
            if factor_count1[step["divisor"]] <= common_factor_counts[step["divisor"]]:
                step["is_common"] = True
    
    # Marca fatores comuns em steps2
    for step in steps2:
        if step["divisor"] in common_factors:
            factor_count2[step["divisor"]] += 1
            if factor_count2[step["divisor"]] <= common_factor_counts[step["divisor"]]:
                step["is_common"] = True

def calculate_gcd(a, b):
    """
    Calcula o MDC usando o algoritmo de Euclides
    """
    if b == 0:
        return a
    return calculate_gcd(b, a % b)

def find_all_divisors(num):
    """
    Encontra todos os divisores de um número
    """
    divisors = []
    for i in range(1, num + 1):
        if num % i == 0:
            divisors.append(i)
    return divisors

def find_all_common_divisors(num1, num2):
    """
    Encontra todos os divisores comuns de dois números
    """
    gcd = calculate_gcd(num1, num2)
    return find_all_divisors(gcd)

def main():
    # Exemplo de uso
    num1 = int(input("Digite o primeiro número: "))
    num2 = int(input("Digite o segundo número: "))
    
    # Passo 1: Encontra a fatoração em números primos com passos
    factorization1 = find_prime_factors_with_steps(num1)
    factorization2 = find_prime_factors_with_steps(num2)
    
    # Passo 2: Encontra fatores comuns com expoentes mínimos
    common_factors = find_common_factors(
        factorization1["prime_factorization"], 
        factorization2["prime_factorization"]
    )
    
    # Passo 3: Calcula o MDC a partir dos fatores comuns
    gcd = calculate_gcd_from_common_factors(common_factors)
    
    # Passo 4: Marca fatores comuns nos passos
    mark_common_factors_in_steps(
        factorization1["steps"],
        factorization2["steps"],
        common_factors.keys()
    )
    
    # Passo 5: Encontra todos os divisores comuns
    all_common_divisors = find_all_common_divisors(num1, num2)
    
    # Exibe resultados
    print(f"\nMDC de {num1} e {num2} é: {gcd}")
    
    print("\nFatoração de", num1)
    for step in factorization1["steps"]:
        common_mark = "*" if step["is_common"] else ""
        print(f"{step['divisor']}{common_mark} | {step['quotient']}")
    
    print("\nFatoração de", num2)
    for step in factorization2["steps"]:
        common_mark = "*" if step["is_common"] else ""
        print(f"{step['divisor']}{common_mark} | {step['quotient']}")
    
    print("\nFatores comuns:")
    for factor, exponent in common_factors.items():
        print(f"{factor}^{exponent}", end=" ")
    print()
    
    print("\nTodos os divisores comuns:", all_common_divisors)
    
    return {
        "gcd": gcd,
        "factorization1": factorization1,
        "factorization2": factorization2,
        "common_factors": [{"factor": factor, "exponent": exponent} for factor, exponent in common_factors.items()],
        "all_common_divisors": all_common_divisors
    }

if __name__ == "__main__":
    result = main()