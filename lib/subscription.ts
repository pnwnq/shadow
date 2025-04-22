// @ts-nocheck
// TODO: Fix this when we turn strict mode on.
import { UserSubscriptionPlan } from "types"
import { freePlan, proPlan } from "@/config/subscriptions"
import { db } from "@/lib/db"

export async function getUserSubscriptionPlan(
  userId: string
): Promise<UserSubscriptionPlan> {
  const user = await db.user.findFirst({
    where: {
      id: userId,
    },
    select: {
      // stripeSubscriptionId: true,
      // stripeCurrentPeriodEnd: true,
      // stripeCustomerId: true,
      // stripePriceId: true,
    },
  })

  if (!user) {
    throw new Error("User not found")
  }

  // Check if user is on a pro plan.
  // const isPro = Boolean(
  //   user.stripePriceId &&
  //   user.stripeCurrentPeriodEnd?.getTime() + 86_400_000 > Date.now()
  // )

  // Simplified: Assume not pro if Stripe fields are removed
  const isPro = false

  // Find the plan the user is on.
  // const plan = isPro ? proPlan : freePlan

  // Simplified: Assume free plan
  const plan = freePlan

  return {
    ...plan,
    // ...user,
    // stripeSubscriptionId: user.stripeSubscriptionId,
    // stripeCurrentPeriodEnd: user.stripeCurrentPeriodEnd?.getTime(),
    // stripeCustomerId: user.stripeCustomerId,
    isPro,
  }
}
