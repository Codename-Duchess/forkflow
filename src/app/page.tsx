import AnimatedHero from "@/components/animated-hero/animated-hero";
import { SignupForm } from "@/components/forms/sign-up/sign-up";

export default function Home() {
  return (
    <main className="page pre-launch-page bg-ff-mid-blue">
      <AnimatedHero />
      <SignupForm />
    </main>
  );
}
