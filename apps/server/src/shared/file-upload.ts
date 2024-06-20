export const renameFile = (req, file, callback) => {
  const fileName = file.originalname
  const randomName = Array(4)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('')

  callback(null, `${randomName}-${fileName}`)
}
