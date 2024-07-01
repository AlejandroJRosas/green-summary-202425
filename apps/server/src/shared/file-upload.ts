export const renameFile = (req, file, callback) => {
  const fileName = file.originalname
  const randomName = Array(4)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('')

  callback(null, `${randomName}-${fileName}`)
}

export const fileFilter = (req, file, callback) => {
  if (
    !file.originalname.match(
      /\.(jpeg|jpg|webp|avif|png|svg|xls|xlsx|doc|docx|pdf)$/
    )
  ) {
    return callback(new Error('Invalid format type'), false)
  }
  callback(null, true)
}
