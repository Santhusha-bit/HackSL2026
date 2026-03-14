import { readFile } from "fs/promises";
import path from "path";
import type { Hackathon } from "./hackathon-types";

export type { Hackathon } from "./hackathon-types";
export { getHackathonStatus, formatDate } from "./hackathon-types";

const DATA_PATH = path.join(process.cwd(), "data", "hackathons.json");

export async function getHackathons(): Promise<Hackathon[]> {
  try {
    const data = await readFile(DATA_PATH, "utf-8");
    const hackathons = JSON.parse(data) as Hackathon[];
    // Sort by date ascending (soonest first)
    return hackathons.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
  } catch {
    return [];
  }
}
