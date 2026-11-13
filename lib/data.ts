export const stages = ["Initial Review", "Strategy Prep", "School District Meeting", "Accommodation Approved"];

export const heroImg = "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1400&q=70";
export const avatar = (n: number) => `https://i.pravatar.cc/160?img=${n}`;

export type Advocate = {
  id: number;
  name: string;
  state: string;
  district: string;
  spec: string[];
  rate: number;
  rating: number;
  cases: number;
  avail: "Today" | "This week" | "Next week";
  img: number;
  bio: string;
};

export const advocates: Advocate[] = [
  { id: 1, name: "Dr. Meera Kapoor", state: "Texas", district: "Austin ISD", spec: ["IEP Review", "Autism"], rate: 85, rating: 4.9, cases: 214, avail: "Today", img: 47, bio: "Former special-ed coordinator. 12 years negotiating IEP accommodations." },
  { id: 2, name: "James Whitfield", state: "California", district: "LAUSD", spec: ["504 Plans", "ADHD"], rate: 70, rating: 4.8, cases: 167, avail: "This week", img: 12, bio: "Parent advocate and certified 504 specialist across Los Angeles County." },
  { id: 3, name: "Sofia Alvarez", state: "Texas", district: "Houston ISD", spec: ["Dyslexia", "IEP Review"], rate: 75, rating: 4.9, cases: 190, avail: "Today", img: 32, bio: "Reading-disability specialist. Bilingual (English / Spanish)." },
  { id: 4, name: "Rahul Desai", state: "New York", district: "NYC DOE", spec: ["Due Process", "Autism"], rate: 95, rating: 4.7, cases: 143, avail: "Next week", img: 15, bio: "Ex-school psychologist supporting due-process and mediation cases." },
  { id: 5, name: "Hannah Brooks", state: "Florida", district: "Miami-Dade", spec: ["504 Plans", "Speech & Language"], rate: 65, rating: 4.8, cases: 121, avail: "This week", img: 45, bio: "Speech-language pathologist turned advocate." },
  { id: 6, name: "Omar Haddad", state: "California", district: "San Diego USD", spec: ["IEP Review", "ADHD", "Behavior"], rate: 80, rating: 4.9, cases: 176, avail: "Today", img: 68, bio: "Behavior-plan expert. Calm negotiator in tough district meetings." },
];

export const states = ["All states", "California", "Texas", "New York", "Florida"];
export const specs = ["All specializations", "IEP Review", "504 Plans", "Autism", "ADHD", "Dyslexia", "Due Process", "Behavior", "Speech & Language"];
export const availOpts = ["Any time", "Today", "This week", "Next week"];

export type Case = { id: string; child: string; district: string; stage: number; advocate: string; adv: number; next: string; progress: number };

export const initialCases: Case[] = [
  { id: "C-1042", child: "Aarav", district: "Austin ISD", stage: 1, advocate: "Dr. Meera Kapoor", adv: 47, next: "IEP meeting · Nov 25", progress: 48 },
  { id: "C-1057", child: "Diya", district: "Austin ISD", stage: 0, advocate: "Sofia Alvarez", adv: 32, next: "Records review · Nov 19", progress: 18 },
  { id: "C-0988", child: "Kabir", district: "Round Rock ISD", stage: 3, advocate: "Omar Haddad", adv: 68, next: "Accommodations active", progress: 100 },
];

export const upcoming = [
  { t: "IEP review call", who: "Dr. Meera Kapoor", when: "Tomorrow · 4:30 PM", img: 47 },
  { t: "School district meeting", who: "Austin ISD Office", when: "Nov 25 · 10:00 AM", img: 12 },
  { t: "Strategy session", who: "Sofia Alvarez", when: "Nov 28 · 6:00 PM", img: 32 },
];

export const activity = [
  { a: "Dr. Kapoor added a note on IEP v3", t: "12 min ago", c: "text-brand-400" },
  { a: "Case C-1042 moved to Strategy Prep", t: "2 h ago", c: "text-emerald-400" },
  { a: "You uploaded Psych Evaluation (v1)", t: "Yesterday", c: "text-amber-400" },
  { a: "Reminder sent: Records due in 3 days", t: "Yesterday", c: "text-rose-400" },
];

export const docs = [
  { id: 1, name: "IEP 2025-26", type: "IEP", ver: 3, size: "1.4 MB", date: "Nov 10", by: "Parent" },
  { id: 2, name: "504 Plan — Grade 4", type: "504", ver: 1, size: "620 KB", date: "Oct 28", by: "Parent" },
  { id: 3, name: "Psychological Evaluation", type: "Eval", ver: 2, size: "2.1 MB", date: "Nov 02", by: "Parent" },
  { id: 4, name: "School Email Thread", type: "Letter", ver: 1, size: "180 KB", date: "Oct 21", by: "Parent" },
];

export const annotations = [
  { id: 1, page: 3, tag: "Missing", clause: "Speech therapy: 30 min / month", note: "Request 30 min / week. Evaluation supports higher frequency.", color: "bg-rose-500/20 text-rose-300 border-rose-500/30" },
  { id: 2, page: 4, tag: "Strong", clause: "Extended time on all assessments (1.5x)", note: "Keep as is. Good, specific language.", color: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30" },
  { id: 3, page: 6, tag: "Vague", clause: "Sensory breaks 'as needed'", note: "Define frequency and trigger. Vague terms are hard to enforce.", color: "bg-amber-500/20 text-amber-300 border-amber-500/30" },
];

export const chats = [
  { id: 1, name: "Dr. Meera Kapoor", case: "C-1042 · Aarav", img: 47, last: "I've added notes to the IEP.", unread: 2 },
  { id: 2, name: "Sofia Alvarez", case: "C-1057 · Diya", img: 32, last: "Please upload the reading eval.", unread: 0 },
  { id: 3, name: "Omar Haddad", case: "C-0988 · Kabir", img: 68, last: "Congrats! Accommodations approved.", unread: 0 },
];
