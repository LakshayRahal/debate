"use server";
import { Feedback } from "@/types";
import { generateObject } from "ai";
import { google } from "@ai-sdk/google";
import { db } from "@/firebase/admin";
import { feedbackSchema } from "@/constants";
import { CreateFeedbackParams } from "@/types";
// import { CreateFeedbackParams } from "@/types";
import { GetLatestDebatesParams } from "@/types";
import { Debate } from "@/types";
import { GetFeedbackByDebateIdParams } from "@/types";
export async function createFeedback(params: CreateFeedbackParams) {
  const { debateId, userId, transcript, feedbackId } = params;

  try {
    const formattedTranscript = transcript
      .map(
        (sentence: { role: string; content: string }) =>
          `- ${sentence.role}: ${sentence.content}\n`
      )
      .join("");

    const { object } = await generateObject({
      model: google("gemini-2.0-flash-001"),
      // structuredOutputs: false, // 
      schema: feedbackSchema,
      prompt: `
        You are an AI debate evaluator. Your task is to analyze the user's debate performance against the AI. Be thorough and detailed in your analysis. Don't be lenient with the debater. If there are mistakes or areas for improvement, point them out.
        Transcript:
        ${formattedTranscript}

        Please score the debater from 0 to 100 in the following areas. Do not add categories other than the ones provided:
        - **Argument Quality**: Logical reasoning, evidence, clarity.
        - **Rebuttal Effectiveness**: Ability to counter AI arguments effectively.
        - **Communication Skills**: Clarity, articulation, structured responses.
        - **Confidence & Engagement**: Confidence in responses, persuasiveness, engagement.
        - **Overall Strategy**: Coherence and organization of debate strategy.
      `,
      system:
        "You are a professional debate evaluator analyzing a user's debate session against AI. Your task is to evaluate the user based on structured categories",
    });
    const feedback = {
      debateId: debateId,
      userId: userId,
      totalScore: object.totalScore,
      categoryScores: object.categoryScores,
      strengths: object.strengths,
      areasForImprovement: object.areasForImprovement,
      finalAssessment: object.finalAssessment,
      createdAt: new Date().toISOString(),
    };

    let feedbackRef;

    if (feedbackId) {
      feedbackRef = db.collection("feedback").doc(feedbackId);
    } else {
      feedbackRef = db.collection("feedback").doc();
    }

    await feedbackRef.set(feedback);

    return { success: true, feedbackId: feedbackRef.id };
  } catch (error) {
    console.error("Error saving feedback:", error);
    return { success: false };
  }
}

export async function getDebateById(id: string): Promise<Debate | null> {
  const debate = await db.collection("debates").doc(id).get();

  return debate.data() as Debate | null;
}

export async function getFeedbackByDebateId(
  params: GetFeedbackByDebateIdParams
): Promise<Feedback | null> {
  const { debateId, userId } = params;

  const querySnapshot = await db
    .collection("feedback")
    .where("debateId", "==", debateId)
    .where("userId", "==", userId)
    .limit(1)
    .get();

  if (querySnapshot.empty) return null;

  const feedbackDoc = querySnapshot.docs[0];
  return { id: feedbackDoc.id, ...feedbackDoc.data() } as Feedback;
}

export async function getLatestDebates(
  params: GetLatestDebatesParams
): Promise<Debate[] | null> {
  const { userId, limit = 20 } = params;

  const debates = await db
    .collection("debates")
    .orderBy("createdAt", "desc")
    .where("finalized", "==", true)
    .where("userId", "!=", userId)
    .limit(limit)
    .get();

  return debates.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Debate[];
}

export async function getDebatesByUserId(
  userId: string
): Promise<Debate[] | null> {
  const debates = await db
    .collection("debates")
    .where("userId", "==", userId)
    .orderBy("createdAt", "desc")
    .get();

  return debates.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Debate[];
}
