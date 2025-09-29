import Image from "next/image";
import { redirect } from "next/navigation";

import Agent from "@/components/Agent";
import { getDebateIcon } from "@/lib/utils";
import { RouteParams } from "@/types";
import {
  getFeedbackByDebateId,
  getDebateById,
} from "@/lib/actions/general.actions";
import { getCurrentUser } from "@/lib/actions/auth.actions";

const DebateDetails = async ({ params }: RouteParams) => {
  const { id } = await params;

  const user = await getCurrentUser();

  const debate = await getDebateById(id);
  if (!debate) redirect("/");

  const feedback = await getFeedbackByDebateId({
    debateId: id,
    userId: user?.id!,
  });

  return (
    <>
      {/* Header */}
      <div className="flex flex-row gap-4 justify-between">
        <div className="flex flex-row gap-4 items-center max-sm:flex-col">
          <div className="flex flex-row gap-4 items-center">
            <Image
              src={getDebateIcon(debate.topic)} // ✅ use icon based on topic
              alt="debate-icon"
              width={40}
              height={40}
              className="rounded-full object-cover size-[40px]"
            />
            <h3 className="capitalize">{debate.topic}</h3>
          </div>

          <p className="text-sm bg-dark-200 px-3 py-1 rounded-lg capitalize">
            {debate.category}
          </p>
        </div>

        <p className="bg-dark-200 px-4 py-2 rounded-lg h-fit capitalize">
          {debate.type}
        </p>
      </div>

      {/* Debate Agent */}
      <Agent
        userName={user?.name!}
        userId={user?.id}
        debateId={id}
        type="debate"
        feedbackId={feedback?.id}
      />
    </>
  );
};

export default DebateDetails;
