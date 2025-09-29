import { generateText } from "ai";
import { google } from "@ai-sdk/google";
import { db } from "@/firebase/admin";
import { getDebateIcon } from "@/lib/utils";

// export async function POST(request: Request) {
//   const { topic, stance, type, category, round, level, userid } = await request.json();

//   try {
//     // Generate AI arguments for debate
//     const { text: debateRaw } = await generateText({
//       model: google("gemini-1.5-flash"),
//       prompt: `You are an AI debate assistant.
//         Generate a debate session based on the following:
//         Topic: ${topic}
//         Stance for the user: ${stance} (for/against)
//         Debate level: ${level} (beginner/intermediate/advanced)
//         Debate type: ${type} (casual or formal)

//         Provide:
//         1. Opening statement for the user
//         2. Counterarguments from AI
//         3. Suggested rebuttals for user

//         Guidelines:
//         - If type is "formal", use professional, academic debate tone.
//         - If type is "casual", use conversational and simple tone.

//         Format the output as a JSON object like:
//         {
//           "openingStatement": "....",
//           "counterarguments": ["...", "..."],
//           "rebuttals": ["...", "..."]
//         }
//         Do not include any markdown or code formatting.
//         Only return valid JSON.`,
//     });

//     // Clean AI response
//     const cleaned = debateRaw
//       .trim()
//       .replace(/^```(?:json)?/, "")
//       .replace(/```$/, "")
//       .trim();

//     const debateData = JSON.parse(cleaned);

//     const debateSession = {
//       topic,
//       stance,
//       type,      
//       level,
//       userId: userid,
//       category,
//       round,
//       icon: getDebateIcon(topic),
//       ...debateData,
//       createdAt: new Date().toISOString(),
//     };

//     // Save to Firebase Firestore
//     await db.collection("debates").add(debateSession);

//     return Response.json({ success: true, data: debateSession }, { status: 200 });
//   } catch (error: any) {
//     console.error("Error generating or saving debate session:", error);
//     return Response.json({ success: false, error: error.message }, { status: 500 });
//   }
// }

// export async function GET() {
//   return Response.json({ success: true, data: "Debate API ready!" }, { status: 200 });
// }


export async function POST(request: Request) {
  const { topic, stance, type, category, round, level, userid, content } =
    await request.json();

  try {
    let basePrompt = "";
    let expectTopic = false;

    
      // Round 1 → Gemini generates a topic based on category
      basePrompt = `
        You are an AI debate assistant.
        Category: ${category}
        Generate a specific debate topic under this category.
        User stance: ${stance} (for/against).
        Debate level: ${level} (beginner/intermediate/advanced).
        Debate type: ${type} (casual or formal).
        Current round: ${round}.
      `;
      expectTopic = true;
 

    // Debate style based on level
    let modeInstructions = "";

    if (level === "beginner") {
      modeInstructions = `
        Beginner Mode:
        - Ignore user’s previous message.
        - Just create NEW points each round.
        - Keep arguments simple and easy to follow.
      `;
    } else {
      modeInstructions = `
        Reactive Mode:
        - Analyze user's latest message: "${content || "N/A"}"
        - Generate counterarguments that directly address their points.
        - Then propose possible rebuttals user could make.
        - Keep the flow natural, like a real-time debate.
      `;
    }

    const { text: debateRaw } = await generateText({
      model: google("gemini-1.5-flash"),
      prompt: `
        ${basePrompt}
        ${modeInstructions}

        Provide output in strict JSON format:
        {
          ${expectTopic ? `"topic": "string",` : ""}
          "openingStatement": "string (optional if not first round)",
          "counterarguments": ["...", "..."],
          "rebuttals": ["...", "..."]
        }
        Do not include markdown or code fences. Return pure JSON only.
      `,
    });

    // Clean Gemini response
    const cleaned = debateRaw
      .trim()
      .replace(/^```(?:json)?/, "")
      .replace(/```$/, "")
      .trim();

    const debateData = JSON.parse(cleaned);

    const debateSession = {
      topic: debateData.topic || topic, // use new topic if generated
      stance,
      type,
      level,
      userId: userid,
      category,
      round,
      content, // user input for this round
      openingStatement: debateData.openingStatement,
      counterarguments: debateData.counterarguments,
      rebuttals: debateData.rebuttals,
      createdAt: new Date().toISOString(),
    };

    // Save session in Firestore
    await db.collection("debates").add(debateSession);

    return Response.json({ success: true, data: debateSession }, { status: 200 });
  } catch (error: any) {
    console.error("Error generating or saving debate session:", error);
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function GET() {
  return Response.json({ success: true, data: "Debate API ready!" }, { status: 200 });
}
