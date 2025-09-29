"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { vapi } from "@/lib/vapi.sdk";
import { createFeedback } from "@/lib/actions/general.actions";
import { AgentProps } from "@/types";
enum CallStatus {
  INACTIVE = "INACTIVE",
  CONNECTING = "CONNECTING",
  ACTIVE = "ACTIVE",
  FINISHED = "FINISHED",
}


interface SavedMessage {
  role: "user" | "system" | "assistant";
  content: string;
}

const Agent = ({ userName, userId, debateId, feedbackId, type, questions }: AgentProps) => {
  const router = useRouter();
  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
  const [messages, setMessages] = useState<SavedMessage[]>([]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [lastMessage, setLastMessage] = useState<string>("");

  useEffect(() => {
    const onCallStart = () => setCallStatus(CallStatus.ACTIVE);
    const onCallEnd = () => setCallStatus(CallStatus.FINISHED);
    const onMessage = (message: Message) => {
      if (message.type === "transcript" && message.transcriptType === "final") {
        setMessages((prev) => [...prev, { role: message.role, content: message.transcript }]);
      }
    };

    vapi.on("call-start", onCallStart);
    vapi.on("call-end", onCallEnd);
    vapi.on("message", onMessage);
    vapi.on("speech-start", () => setIsSpeaking(true));
    vapi.on("speech-end", () => setIsSpeaking(false));

    return () => {
      vapi.off("call-start", onCallStart);
      vapi.off("call-end", onCallEnd);
      vapi.off("message", onMessage);
    };
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      setLastMessage(messages[messages.length - 1].content);
    }

    const handleGenerateFeedback = async () => {
      const { success, feedbackId: id } = await createFeedback({
        debateId: debateId!,
        userId: userId!,
        transcript: messages,
        feedbackId,
      });

      if (success && id) {
        router.push(`/debate/${debateId}/feedback`);
      } else {
        router.push("/");
      }
    };

    if (callStatus === CallStatus.FINISHED && type === "debate") {
      handleGenerateFeedback();
    }
  }, [messages, callStatus]);

  const handleCall = async () => {
    setCallStatus(CallStatus.CONNECTING);
    await vapi.start(
      undefined,
      undefined,
      undefined,
      process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID!,
      {
        variableValues: { username: userName, userid: userId, questions },
      }
    );
  };

  const handleDisconnect = () => {
    setCallStatus(CallStatus.FINISHED);
    vapi.stop();
  };

  return (
    <>
      <div className="call-view">
        <div className="card-interviewer">
          <div className="avatar">
            <Image src="/ai-avatar.png" alt="ai" width={65} height={54} />
            {isSpeaking && <span className="animate-speak" />}
          </div>
          <h3>AI Opponent</h3>
        </div>

        <div className="card-border">
          <div className="card-content">
            <Image
              src="/avatar.png"
              alt="profile"
              width={120}
              height={120}
              className="rounded-full"
            />
            <h3>{userName}</h3>
          </div>
        </div>
      </div>

      {messages.length > 0 && (
        <div className="transcript-border">
          <div className="transcript">
            <p className={cn("animate-fadeIn")}>{lastMessage}</p>
          </div>
        </div>
      )}

      <div className="w-full flex justify-center">
        {callStatus !== "ACTIVE" ? (
          <button className="btn-call" onClick={handleCall}>
            {callStatus === "INACTIVE" ? "Start Debate" : "..."}
          </button>
        ) : (
          <button className="btn-disconnect" onClick={handleDisconnect}>
            End
          </button>
        )}
      </div>
    </>
  );
};

export default Agent;
