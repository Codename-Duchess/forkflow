'use client'

import { Zap, Crown, Building } from "lucide-react";
import { useState } from "react";
import PricingCard from "./PricingCard";

const PricingCardList = () => {

  const tiers = [
    {
      id: "free",
      name: "Free",
      price: "$0",
      icon: Zap,
      features: ["Up to 3 projects", "Basic time tracking", "Simple invoicing", "1GB storage"],
    },
    {
      id: "pro",
      name: "Pro",
      price: "$29",
      icon: Crown,
      features: [
        "Unlimited projects",
        "Advanced analytics",
        "Client collaboration",
        "10GB storage",
        "Read access sharing",
      ],
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: "$99",
      icon: Building,
      features: [
        "Everything in Pro",
        "Team management",
        "Advanced permissions",
        "100GB storage",
        "Full access control",
        "Priority support",
      ],
    },
  ]

  const [selectedTier, setSelectedTier] = useState("pro")


  return (
    <div className="grid gap-4">
      <h3 className="text-lg font-semibold text-center">Choose Your Plan</h3>
      <div className="grid md:grid-cols-3 gap-4">
        {tiers.map((tier) => {
          return (
            <PricingCard
              key={tier.id}
              tier={tier}
              isSelected={selectedTier === tier.id}
              onSelect={() => setSelectedTier(tier.id)}
            />
          )
        })}
      </div>
    </div>
  );
}

export default PricingCardList;