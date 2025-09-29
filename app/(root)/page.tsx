import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/actions/auth.actions";
import {
  getDebatesByUserId,
  getLatestDebates,
} from "@/lib/actions/general.actions";
import DebateCard from "@/components/DebateCard";

const Page = async () => {
  const user = await getCurrentUser();

  // Fetch user debates and latest debates in parallel
  const [userDebates, latestDebates] = await Promise.all([
    getDebatesByUserId(user?.id!),
    getLatestDebates({ userId: user?.id! }),
  ]);

  const hasPastDebates = userDebates?.length > 0;
  const hasUpcomingDebates = latestDebates?.length > 0;

  return (
    <>
      {/* CTA Section */}
  <section className="card-cta flex items-center justify-between max-sm:flex-col">
  <div className="flex flex-col gap-6 max-w-lg">
    <h1>Sharpen Your Skills with AI-Powered Debates</h1>
    <p>
      Practice debating real topics & get instant AI-driven feedback to
      improve your reasoning and delivery.
    </p>
    <Button asChild className="btn-primary max-sm:w-full">
      <Link href="/debate">Start a Debate</Link>
    </Button>
  </div>

  <div className="flex items-center justify-center">
    <Image 
      src="/debate1.png"
      alt="debate-illustration"
      width={400}
      height={400}
      className="max-sm:hidden rounded-2xl"
    />
  </div>
</section>


      {/* Past Debates Section */}
      <section className="flex flex-col gap-6 mt-8">
        <h1>Your Debates</h1>
        <div className="debates-section">
          {hasPastDebates ? (
            userDebates?.map((debate) => (
              <DebateCard {...debate} key={debate.id} />
            ))
          ) : (
            <p>You haven’t taken any debates yet</p>
          )}
        </div>
      </section>

      {/* Latest/Upcoming Debates Section */}
      <section className="flex flex-col gap-6 mt-8">
        <h2>Take a New Debate</h2>
        <div className="debates-section">
          {hasUpcomingDebates ? (
            latestDebates?.map((debate) => (
              <DebateCard {...debate} key={debate.id} />
            ))
          ) : (
            <p>No new debates are available right now</p>
          )}
        </div>
      </section>
    </>
  );
};

export default Page;
