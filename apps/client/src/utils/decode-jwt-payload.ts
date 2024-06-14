/**
 * Function to decode jwt token payload
 * @param {string} token - The jwt token with the payload to decode
 * @returns the decoded JSON payload as an object
 * @throws Error if token is not a valid jwt token
 */
export function decodeJwtPayload(token: string | null | undefined): object {
  if (!validateJwt(token)) {
    throw new Error('Invalid jwt token provided')
  }

  const base64UrlPayload = token.split('.')[1]
  const base64Payload = decodeURIComponent(base64UrlPayload)
  const jsonPayload = window.atob(base64Payload)

  return JSON.parse(jsonPayload)
}

/**
 * Function that validates if a given string is a jwt token
 * @param {string} token - The jwt token to validate
 * @returns if the token is a jwt token or not
 */
function validateJwt(token: string | null | undefined): token is JwtString {
  if (token == null) {
    return false
  }

  if (token.trim() === '') {
    return false
  }

  const tokenParts = token.split('.')

  // Simplified regex to test if a string has valid base64 characters
  //TODO: Streghten this regex 'cuz it only checks if the string has valid base64 characters, not if it is actually a base64 string. Take in mind that padding must be optional in the new regex
  const base64ishRegex = /^[-A-Za-z0-9+/=]|=[^=]|={3,}$/

  return (
    tokenParts.length === 3 &&
    tokenParts[2].length === 43 &&
    tokenParts.every((part) => base64ishRegex.test(decodeURIComponent(part)))
  )
}

type JwtString = string
