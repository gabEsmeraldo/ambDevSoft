#ifndef NUM_TO_WORDS_H
#define NUM_TO_WORDS_H

/**
 * Converts a numerical value to its written form in Portuguese as currency (reais)
 * 
 * @param value The numerical value to convert (must be between 0 and 999.999)
 * @param result The character array where the result will be stored
 * @param size The size of the result array
 * @return 0 if successful, -1 if error occurred
 */
int number_to_words_pt(double value, char *result, int size);

/**
 * Validates if the input is a valid number format for conversion
 * 
 * @param input The string input to validate
 * @return 1 if valid, 0 if invalid
 */
int validate_input(const char *input);

#endif // NUM_TO_WORDS_H
