import { redirect } from "next/navigation"
import { BillingForm } from "@/components/billing-form"
import { DashboardHeader } from "@/components/header"
// import { Icons } from "@/components/icons"
import { DashboardShell } from "@/components/shell"
// import { stripe } from "@/lib/stripe"
import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { getUserSubscriptionPlan } from "@/lib/subscription"
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export const metadata = {
  title: "Billing",
  description: "Manage billing and your subscription plan.",
}

export default async function BillingPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const subscriptionPlan = await getUserSubscriptionPlan(user.id)

  // // If user has a pro plan, check cancel status on Stripe.
  // let isCanceled = false
  // if (subscriptionPlan.isPro && subscriptionPlan.stripeSubscriptionId) {
  //   // const stripePlan = await stripe.subscriptions.retrieve(
  //   //   subscriptionPlan.stripeSubscriptionId
  //   // )
  //   // isCanceled = stripePlan.cancel_at_period_end
  // }

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Billing"
        text="Manage billing and your subscription plan."
      />
      <div className="grid gap-8">
        <BillingForm
          subscriptionPlan={subscriptionPlan}
          // isCanceled={isCanceled}
        />
        {/* <Alert variant="destructive">
          <Icons.warning className="h-4 w-4" />
          <AlertTitle>This is a demo app.</AlertTitle>
          <AlertDescription>
            Taxonomy app is a demo app using a Stripe test environment. You can
            find a list of test card numbers on the{" "}
            <a
              href="https://stripe.com/docs/testing#cards"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              Stripe docs
            </a>
            .
          </AlertDescription>
        </Alert> */}
      </div>
    </DashboardShell>
  )
}
