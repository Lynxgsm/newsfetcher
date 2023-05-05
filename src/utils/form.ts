export const formatFormToObject = (formData: FormData) => {
    const input: { [key: string]: any } = {};
    formData.forEach((value, key) => {
        input[key] = value
    })

    return input
}