import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { CheckCircle, Mail } from "lucide-react"

export function PasswordResetSuccess({
  className,
  email = "your email",
  ...props
}: React.ComponentProps<"div"> & { email?: string }) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0 transition-all duration-300 hover:shadow-lg">
        <CardContent className="grid p-0 md:grid-cols-2">
          <div className="p-6 md:p-8">
            <div className="flex flex-col gap-6 items-center text-center">
              {/* Success Icon */}
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mb-2">
                <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>

              {/* Header */}
              <div className="space-y-2">
                <h1 className="text-2xl font-bold">Check your email</h1>
                <p className="text-muted-foreground text-balance">
                  We sent a password reset link to{" "}
                  <span className="font-medium text-foreground">{email}</span>
                </p>
              </div>

              {/* Instructions */}
              <div className="bg-muted/50 rounded-lg p-4 text-sm text-muted-foreground text-left w-full max-w-sm">
                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
                  <div className="space-y-1">
                    <p className="font-medium text-foreground">Didn't receive the email?</p>
                    <ul className="space-y-1 text-xs">
                      <li>• Check your spam folder</li>
                      <li>• Verify the email address is correct</li>
                      <li>• Wait a few minutes for delivery</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-3 w-full">
                <Button asChild className="w-full">
                  <Link href="/sign-in">
                    Back to sign in
                  </Link>
                </Button>
                
                <Button variant="outline" type="button" className="w-full">
                  Resend email
                </Button>
              </div>

              {/* Help Link */}
              <div className="text-center text-sm">
                Still having trouble?{" "}
                <Link href="/support" className="underline underline-offset-4">
                  Contact support
                </Link>
              </div>
            </div>
          </div>
          
          {/* Right Side Image Placeholder */}
          <div className="bg-muted relative hidden md:block">
            <div className="absolute inset-0 h-full w-full flex items-center justify-center bg-gray-100 dark:bg-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-600">
              <span className="text-4xl font-semibold text-gray-500 dark:text-gray-400">Img</span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Footer */}
      <div className="text-muted-foreground text-center text-xs text-balance">
        By clicking continue, you agree to our{" "}
        <Link href="/terms-of-service" className="underline underline-offset-4 hover:text-primary">
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link href="/privacy" className="underline underline-offset-4 hover:text-primary">
          Privacy Policy
        </Link>.
      </div>
    </div>
  )
}