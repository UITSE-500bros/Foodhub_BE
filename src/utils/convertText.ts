export function convertVietnameseToEnglish(input: string): string {
    return input
        .normalize('NFD') // Normalize to separate diacritical marks
        .replace(/[\u0300-\u036f]/g, '') // Remove diacritical marks
        .replace(/đ/g, 'd') // Replace specific Vietnamese character
        .replace(/Đ/g, 'D'); // Replace uppercase Vietnamese character
}