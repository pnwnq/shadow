"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { UserSubscriptionPlan } from "@/types"
import { toast } from "@/hooks/use-toast"
import { cn, formatDate } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Icons } from "@/components/icons"

interface BillingFormProps extends React.HTMLAttributes<HTMLFormElement> {
  subscriptionPlan: UserSubscriptionPlan
  className?: string
}

export function BillingForm({
  subscriptionPlan,
  className,
  ...props
}: BillingFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  // async function onSubmit(event) {
  //   event.preventDefault()
  //   setIsLoading(!isLoading)

  //   // Get a Stripe session URL.
  //   const response = await fetch("/api/users/stripe")

  //   if (!response?.ok) {
  //     return toast({
  //       title: "Something went wrong.",
  //       description: "Please refresh the page and try again.",
  //       variant: "destructive",
  //     })
  //   }

  //   // Redirect to the Stripe session.
  //   const session = await response.json()
  //   if (session) {
  //     router.push(session.url)
  //   }
  // }

  return (
    // <form className={cn(className)} onSubmit={onSubmit} {...props}>
    <form className={cn(className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Subscription Plan</CardTitle>
          <CardDescription>
            You are currently on the <strong>{subscriptionPlan?.name}</strong>{" "}
            plan.
          </CardDescription>
        </CardHeader>
        <CardContent>{subscriptionPlan?.description}</CardContent>
        <CardFooter className="flex flex-col items-start space-y-2 md:flex-row md:justify-between md:space-x-0">
          {/* <button
            type="submit"
            className={cn(buttonVariants())}
            disabled={isLoading}
          >
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            {subscriptionPlan.isPro ? "Manage Subscription" : "Upgrade to PRO"}
          </button> */}
          {/* {subscriptionPlan.isPro && (
            <p className="rounded-full text-xs font-medium">
              {subscriptionPlan.isCanceled
                ? "Your plan will be canceled on "
                : "Your plan renews on "}
              {formatDate(subscriptionPlan.stripeCurrentPeriodEnd)}.
            </p>
          )} */}
          <p className="rounded-full text-xs font-medium">
            Currently on the {subscriptionPlan?.name} plan.
          </p>
        </CardFooter>
      </Card>
    </form>
  )
}
