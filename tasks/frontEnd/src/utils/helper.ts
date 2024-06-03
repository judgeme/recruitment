export const createRatingFromFirstDigit = (number) => {
  // Ensure number is positive
  number = Math.abs(number)

  // Check if number is between 1 and 5
  if (number >= 1 && number <= 5) {
    return number
  }

  // Get the first digit of the number
  const firstDigit = parseInt(number.toString().charAt(0))

  // Map the first digit from range 1-9 to range 1-5
  return Math.ceil((firstDigit / 9) * 5)
}
