#include "num_to_words.h"
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <ctype.h>

// Arrays of Portuguese words for numbers
const char *units[] = {
    "", "Um", "Dois", "Três", "Quatro", "Cinco", 
    "Seis", "Sete", "Oito", "Nove", "Dez", "Onze", 
    "Doze", "Treze", "Quatorze", "Quinze", "Dezesseis", 
    "Dezessete", "Dezoito", "Dezenove"
};

const char *tens[] = {
    "", "", "Vinte", "Trinta", "Quarenta", "Cinquenta", 
    "Sessenta", "Setenta", "Oitenta", "Noventa"
};

const char *hundreds[] = {
    "", "Cento", "Duzentos", "Trezentos", "Quatrocentos", "Quinhentos", 
    "Seiscentos", "Setecentos", "Oitocentos", "Novecentos"
};

// Special case for zero
const char *zero = "Zero";

/**
 * Converts a 3-digit number to its written form in Portuguese
 * 
 * @param num The number to convert (0-999)
 * @param result The character array where the result will be stored
 * @param isReais Flag indicating if we're naming reais (affects 'Um' vs 'Um Mil')
 * @return The length of the string added to result
 */
int convert_three_digits(int num, char *result, int isReais) {
    if (num == 0) {
        return 0;
    }
    
    int len = 0;
    
    // Handle hundreds
    if (num >= 100) {
        if (num == 100) {
            len += sprintf(result + len, "Cem");
        } else {
            len += sprintf(result + len, "%s", hundreds[num / 100]);
        }
        num %= 100;
        
        if (num > 0) {
            len += sprintf(result + len, " e ");
        }
    }
    
    // Handle tens and units
    if (num > 0) {
        if (num < 20) {
            // Special case for 1 in reais context
            if (num == 1 && isReais) {
                len += sprintf(result + len, "Um");
            } else {
                len += sprintf(result + len, "%s", units[num]);
            }
        } else {
            len += sprintf(result + len, "%s", tens[num / 10]);
            if (num % 10 > 0) {
                len += sprintf(result + len, " e %s", units[num % 10]);
            }
        }
    }
    
    return len;
}

int number_to_words_pt(double value, char *result, int size) {
    if (value < 0 || value > 999999) {
        return -1;
    }
    
    // Initialize result string
    result[0] = '\0';
    
    // Handle zero case
    if (value == 0.0) {
        strcat(result, "Zero Reais");
        return 0;
    }
    
    // Get only the integer part (ignore centavos)
    int intPart = (int)value;
    
    int len = 0;
    
    // Handle thousands (100000-999999)
    if (intPart >= 1000) {
        int thousands = intPart / 1000;
        
        // Convert thousands
        if (thousands > 0) {
            len += convert_three_digits(thousands, result + len, 0);
            
            len += sprintf(result + len, " Mil");
            
            // Check if there are remaining digits
            if (intPart % 1000 > 0) {
                len += sprintf(result + len, " e ");
            }
        }
        
        intPart %= 1000;
    }
    
    // Handle remaining digits (1-999)
    if (intPart > 0) {
        len += convert_three_digits(intPart, result + len, 1);
    }
    
    // Add "Reais"
    if (intPart > 0) {
        if (intPart == 1) {
            len += sprintf(result + len, " Real");
        } else {
            len += sprintf(result + len, " Reais");
        }
    }
    
    // Não precisamos lidar com centavos
    
    // Capitalize the first letter
    if (result[0] != '\0') {
        result[0] = toupper(result[0]);
    }
    
    return 0;
}

int validate_input(const char *input) {
    if (input == NULL || *input == '\0') {
        return 0;
    }
    
    int len = strlen(input);
    int decimal_point = 0;
    int digit_count = 0;
    int decimal_digits = 0;
    int digits_before_point = 0;
    
    // Count the digits before the decimal point (if any)
    for (int i = 0; i < len && input[i] != '.' && input[i] != ','; i++) {
        if (isdigit(input[i])) {
            digits_before_point++;
        }
    }
    
    // Reset digit count for the full validation
    for (int i = 0; i < len; i++) {
        if (input[i] == '.' || input[i] == ',') {
            if (decimal_point) {
                return 0; // More than one decimal point
            }
            decimal_point = 1;
        } else if (isdigit(input[i])) {
            if (decimal_point) {
                decimal_digits++;
                if (decimal_digits > 3) {
                    return 0; // More than 3 decimal places
                }
            } else {
                digit_count++;
            }
        } else if (input[i] != ' ') {
            return 0; // Invalid character
        }
    }
    
    // If the decimal point is a thousand separator (more than 3 digits before it)
    // Then we count the total digits as one number
    if (decimal_point && digits_before_point > 3) {
        int total_digits = digit_count + decimal_digits;
        return total_digits <= 6;
    }
    
    // Otherwise, we just check the non-decimal part
    return digit_count <= 6;
}
