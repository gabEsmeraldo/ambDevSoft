#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <ctype.h>
#include "num_to_words.h"

#define MAX_INPUT_SIZE 20
#define MAX_OUTPUT_SIZE 500

/**
 * Program to convert numerical currency values to their written form in Portuguese
 * 
 * Example: 245.276 -> "Duzentos e Quarenta e Cinco Mil, Duzentos e Setenta e Seis Reais"
 * Note: The decimal point is interpreted as a thousand separator when there are more than 3 digits before it
 */
int main() {
    char input[MAX_INPUT_SIZE];
    char result[MAX_OUTPUT_SIZE];
    double value;
    
    printf("Digite um valor monetário (até 999.999): ");
    if (fgets(input, MAX_INPUT_SIZE, stdin) == NULL) {
        printf("Erro ao ler a entrada.\n");
        return 1;
    }
    
    // Remove trailing newline if present
    size_t input_len = strlen(input);
    if (input_len > 0 && input[input_len - 1] == '\n') {
        input[input_len - 1] = '\0';
    }
    
    // Replace comma with dot if present (for Brazilian format)
    for (int i = 0; input[i] != '\0'; i++) {
        if (input[i] == ',') {
            input[i] = '.';
        }
    }
    
    // Count digits before decimal point
    int digits_before_point = 0;
    int found_decimal = 0;
    int decimal_pos = -1;
    
    for (int i = 0; input[i] != '\0'; i++) {
        if (input[i] == '.') {
            found_decimal = 1;
            decimal_pos = i;
            break;
        }
        if (isdigit(input[i])) {
            digits_before_point++;
        }
    }
    
    // Debug prints removidos
    
    // Convert to value based on decimal point interpretation
    // Para tratar corretamente números como 1.234 onde o ponto está na posição 1 mas o total de dígitos é maior que 3
    int total_digits = 0;
    for (int i = 0; input[i] != '\0'; i++) {
        if (isdigit(input[i])) {
            total_digits++;
        }
    }
    
    // Se o número total de dígitos for maior que 3, tratamos como separador de milhares
    // independentemente da posição do ponto
    if (found_decimal && total_digits <= 3) {
        // Se o ponto decimal está nas posições 1, 2 ou 3 (após o primeiro, segundo ou terceiro dígito)
        // então é um valor decimal (ex: 9.99, 99.99, 999.99)
        // Convert directly (ignore decimal part)
        value = atof(input);
    } else if (found_decimal) {
        // If there are more than 3 digits before decimal, treat as thousand separator
        // We need to properly interpret numbers like 246.276 as 246276
        
        // Get the part before the decimal point
        char before_decimal[MAX_INPUT_SIZE] = {0};
        strncpy(before_decimal, input, decimal_pos);
        before_decimal[decimal_pos] = '\0';
        
        // Get the part after the decimal point
        char after_decimal[MAX_INPUT_SIZE] = {0};
        strcpy(after_decimal, input + decimal_pos + 1);
        
        // Combine them without the decimal point
        char full_number[MAX_INPUT_SIZE * 2] = {0};
        sprintf(full_number, "%s%s", before_decimal, after_decimal);
        
        value = atof(full_number);
    } else {
        // No decimal point, convert directly
        value = atof(input);
    }
    
    // Validate input
    if (!validate_input(input)) {
        printf("Formato de entrada inválido. Por favor, digite um número com no máximo 6 dígitos (formato: 999.999).\n");
        return 1;
    }
    
    // Check range
    if (value < 0 || value > 999999) {
        printf("O valor deve estar entre 0 e 999.999.\n");
        return 1;
    }
    
    // Mensagem mais clara para o usuário
    printf("Convertendo %s para extenso...\n", input);
    
    // Convert number to words
    if (number_to_words_pt(value, result, MAX_OUTPUT_SIZE) == -1) {
        printf("Erro ao converter o número para extenso.\n");
        return 1;
    }
    
    // Print the result
    printf("%s\n", result);
    
    return 0;
}
