export function authorize(id: string): Promise<string[]> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(['admin']); //Return value of a Promise function
        }, 1000);
    });
}
