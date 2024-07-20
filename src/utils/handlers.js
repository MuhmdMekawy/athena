export const getFileExtension = (file) => {
  return `.${file.type.slice(6)}`
}
