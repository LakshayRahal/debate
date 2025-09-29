import React from "react";
import dayjs from "dayjs";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import { getFeedbackByDebateId } from "@/lib/actions/general.actions";
import { getDebateIcon, getDebateKeywords } from "@/lib/utils";

import { DebateCardProps } from "@/types";
const DebateCard = async ({
  id,
  userId,
  topic,
  category,
  createdAt,
}: DebateCardProps) => {
  const feedback =
    userId && id
      ? await getFeedbackByDebateId({ debateId: id, userId })
      : null;

  const formattedDate = dayjs(
    feedback?.createdAt || createdAt || Date.now()
  ).format("MMM D, YYYY");

  // Use helper functions instead of full meta
  const icon = getDebateIcon(topic);
  const keywords = getDebateKeywords(topic);

  return (
    <div className="card-border w-[320px] max-sm:w-full min-h-80">
      <div className="card-interview gap-3 relative">
        {/* Category Badge */}
        <div className="absolute top-0 right-0 w-fit px-3 py-1.5 text-lg rounded-bl-lg bg-light-600">
          <p className="badge-text">{category}</p>
        </div>

        {/* Debate Cover (icon) */}
        <div className="flex items-center justify-center mt-3">
          <Image
            src={icon || "/icons/general.png"}
            alt={topic}
            width={60}
            height={60}
            className="rounded-full object-cover size-[60px] bg-gray-200"
          />
        </div>

        {/* Title */}
        <h3 className="mt-5 text-2xl capitalize text-center">{topic}</h3>

        {/* Keywords */}
        {keywords.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 mt-3">
            {keywords.map((word, i) => (
              <span
                key={i}
                className="px-2 py-1 text-xs rounded-lg border border-gray-500 text-gray-300 bg-gray-800"
              >
                {word}
              </span>
            ))}
          </div>
        )}

        {/* Date + Score */}
        <div className="flex flex-row gap-5 mt-3 justify-center">
          <div className="flex flex-row gap-2 items-center">
            <Image src="/calendar.svg" alt="calendar" width={22} height={22} />
            <p>{formattedDate}</p>
          </div>
          <div className="flex flex-row gap-2 items-center">
            <Image src="/star.svg" alt="star" width={22} height={22} />
            <p>{feedback?.totalScore ?? "---"}/100</p>
          </div>
        </div>

        {/* Feedback or Info */}
        <p className="line-clamp-2 mt-5 text-center">
          {feedback?.finalAssessment ||
            "You haven't joined this debate yet. Take it now to improve your skills."}
        </p>

        {/* Button */}
        <div className="flex flex-row items-center justify-center mt-7">
          <Button className="btn-primary">
            <Link href={feedback ? `/debate/${id}/feedback` : `/debate/${id}`}>
              {feedback ? "Check Feedback" : "Join Debate"}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DebateCard;
