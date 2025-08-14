import fs from 'fs'
import path from 'path'
import { generateKeyPairSync } from 'crypto'

const keysDir = path.join(__dirname, '../src/keys')

if (!fs.existsSync(keysDir)) {
  fs.mkdirSync(keysDir, { recursive: true })
}

const { privateKey, publicKey } = generateKeyPairSync('rsa', {
  modulusLength: 2048,
  publicKeyEncoding: {
    type: 'spki',
    format: 'pem'
  },
  privateKeyEncoding: {
    type: 'pkcs8',
    format: 'pem'
  }
})

fs.writeFileSync(path.join(keysDir, 'private.key'), privateKey)
fs.writeFileSync(path.join(keysDir, 'public.key'), publicKey)

console.log('RSA key pair generated in src/keys/')
