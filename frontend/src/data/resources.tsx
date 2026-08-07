import { Video, Presentation, FolderGit2, Newspaper } from "lucide-react";
import type { Resource } from "../types";

// Note: the four resource cards previously carried distinct `cardColor`
// values (card-blue/green/yellow/pink), but every one of them resolved
// to the exact same background/border styling -- so the field was dead
// weight. Removed here rather than reproduced (see feedback item 9).
export const resources: Resource[] = [
  {
    title: "Event & Insights Videos",
    linkText: "Watch on YouTube",
    icon: <Video size={32} />,
  },
  {
    title: "Workshops",
    linkText: "Checkout Recordings",
    icon: <Presentation size={32} />,
  },
  {
    title: "Projects by Partners",
    linkText: "Checkout Latest Projects",
    icon: <FolderGit2 size={32} />,
  },
  {
    title: "Look at the Byte Side",
    linkText: "Checkout on LinkedIn",
    icon: <Newspaper size={32} />,
  },
];
