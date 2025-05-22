
export function validateEnv() {
  const requiredEnvs = ["GOOGLE_CLIENT_ID", "GOOGLE_CLIENT_SECRET", "NEXTAUTH_SECRET", "NEXTAUTH_URL"]

  const missingEnvs = requiredEnvs.filter((env) => !process.env[env])

  if (missingEnvs.length > 0) {
    if (typeof window === "undefined") {
      
      console.error(`❌ Missing required environment variables: ${missingEnvs.join(", ")}`)
    }
    return false
  }

  return true
}
