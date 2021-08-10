import CustomError from "../../helpers/custom-error"

export default function buildMakeMedia() {
    return function makeMedia({
        fileName,
        fileType     
    } = {}) {
        if (!fileName) {
            throw new CustomError('Meda must have a file name.', 400)
        }
        if (!fileType) {
            throw new CustomError('Media must have a file type.', 400)
        }
        return Object.freeze({
            getFileName: () => fileName,
            getFileType: () => fileType
        })
    }
}
