import { Check } from "lucide-react";

type Tier = {
    id: string;
    name: string;
    price: string;
    icon: any; // eslint-disable-line @typescript-eslint/no-explicit-any
    features: string[];
}

type PricingCardProps = {
    tier: Tier;
    isSelected: boolean;
    onSelect: (tierId: string) => void;
}

const PricingCard = ({ tier, isSelected, onSelect }: PricingCardProps) => {

    const Icon = tier.icon

    return (
        <div
            key={tier.id}
            className={`cursor-pointer transition-all hover:scale-105 ${isSelected ? "ring-2 ring-orange-500 glass-card" : "glass hover:glass-card"
                }`}
            onClick={() => onSelect(tier.id)}
        >
            <div className="text-center pb-2">
                <Icon className="w-8 h-8 mx-auto text-orange-500" />
                <div className="text-lg">{tier.name}</div>
                <div className="text-2xl font-bold text-orange-600">{tier.price}</div>
                {tier.id !== "free" && <div >per month</div>}
            </div>
            <div className="pt-0">
                <ul className="space-y-2 text-sm">
                    {tier.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2">
                            <Check className="w-4 h-4 text-green-500" />
                            {feature}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default PricingCard;