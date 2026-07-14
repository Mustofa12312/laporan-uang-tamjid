import imageCompression from 'browser-image-compression'

/**
 * Compress image before upload
 * Target: <= 500KB as per PRD spec
 * Max input: 10MB
 *
 * @param {File} file - Image file to compress
 * @returns {Promise<File>} Compressed file
 */
export async function compressImage(file) {
  const MAX_SIZE_MB = 10
  const TARGET_SIZE_MB = 0.5

  // Validate file size
  if (file.size > MAX_SIZE_MB * 1024 * 1024) {
    throw new Error(`Ukuran file melebihi ${MAX_SIZE_MB}MB`)
  }

  // Validate file type
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
  if (!validTypes.includes(file.type)) {
    throw new Error('Format file tidak didukung. Gunakan JPG, PNG, atau WEBP')
  }

  // If already small enough, return as-is
  if (file.size <= TARGET_SIZE_MB * 1024 * 1024) {
    return file
  }

  const options = {
    maxSizeMB: TARGET_SIZE_MB,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
    fileType: 'image/jpeg',
  }

  try {
    const compressed = await imageCompression(file, options)
    return compressed
  } catch (error) {
    console.error('Image compression failed:', error)
    throw new Error('Gagal mengompresi gambar')
  }
}

/**
 * Create image preview URL from file
 * @param {File} file
 * @returns {string} Object URL for preview
 */
export function createPreviewURL(file) {
  return URL.createObjectURL(file)
}

/**
 * Revoke preview URL to free memory
 * @param {string} url
 */
export function revokePreviewURL(url) {
  URL.revokeObjectURL(url)
}

/**
 * Convert file to base64 for GAS upload
 * @param {File} file
 * @returns {Promise<string>}
 */
export function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result.split(',')[1])
    reader.onerror = (error) => reject(error)
  })
}
