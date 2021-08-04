export default function findValidation(validationData, field) {

    if (validationData) {
        const validationElement = validationData.find(element => element.field === field)
        if (validationElement) {
            return validationElement.message
        }
    }
}
