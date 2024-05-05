export function oklabScaledNumber(input) {
    /**
     * Scales a number between -0.4 and 0.4. Adapted from various AI tools.
     * @param {number} num - the number to be scaled
     * @returns {number} the scaled number between -0.4 and 0.4
     */
    // check if the input is already within our desired range
    if (input >= -0.4 && input <= 0.4) {
        return input;
    }
    // calculate the normalized value within the range
    const min = -0.4;
    const max = 0.4;
    const normalized = ((input - min) % (max - min)) + min;

    // if the result is greater than 0.4, wrap around to -0.4
    if (normalized > max) {
        return min + (normalized - max);
    }

    // if less than -0.4, wrap around to 0.4
    if (normalized < min) {
        return max - (min - normalized);
    }
    return normalized;
}
