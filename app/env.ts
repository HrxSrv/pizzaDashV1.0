// This file ensures all required environment variables are defined
// It's imported in the layout.tsx file to validate environment variables early

export function validateEnv() {
  const requiredEnvs = ["GOOGLE_CLIENT_ID", "GOOGLE_CLIENT_SECRET", "NEXTAUTH_SECRET", "NEXTAUTH_URL"]

  const missingEnvs = requiredEnvs.filter((env) => !process.env[env])

  if (missingEnvs.length > 0) {
    if (typeof window === "undefined") {
      // Only log on server
      console.error(`❌ Missing required environment variables: ${missingEnvs.join(", ")}`)
    }
    return false
  }

  return true
}
