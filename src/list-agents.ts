import { getAllAgents } from "./supabase.js";

async function main() {
  try {
    const agents = await getAllAgents();
    
    if (agents.length === 0) {
      console.log("No agents found in the ChainMind Framework.");
      return;
    }

    console.log("\n🤖 ChainMind Agents Directory 🤖");
    console.log("================================");
    
    const table = agents.map((agent, index) => {
      const personality = agent.personality || "neutral";
      return {
        "No.": index + 1,
        "Agent Name": agent.name,
        "Personality Type": personality
      };
    });

    console.table(table);
  } catch (error) {
    console.error("❌ Error fetching agents:", error instanceof Error ? error.message : String(error));
    process.exit(1);
  }
}

main();