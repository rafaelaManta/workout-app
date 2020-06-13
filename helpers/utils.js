export const insert = (arr, index, newItem) => [...arr.slice(0, (index + 1)), newItem, ...arr.slice((index + 1))]

export const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
export const randomUniqueNumber = () => {

    const limit = 12,
        amount = 3,
        lower_bound = 1,
        upper_bound = 10,
        unique_random_numbers = [];

    if (amount > limit) limit = amount;

    while (unique_random_numbers.length < limit) {
        const random_number = Math.floor(Math.random() * (upper_bound - lower_bound) + lower_bound);
        if (unique_random_numbers.indexOf(random_number) == -1) {
            unique_random_numbers.push(random_number);
            return random_number
        }
    }
}