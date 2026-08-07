import type { NavLink } from "../types";

/** Section links shown in the navbar; each id matches a section's DOM id. */
export const NAV_LINKS: NavLink[] = [
  { label: "Mentors", sectionId: "mentors" },
  { label: "Resources", sectionId: "resources" },
];

/** Scroll distance (px) after which the "go to top" button appears. */
export const GO_TO_TOP_SCROLL_THRESHOLD = 300;

/** Duration of the animated ring-counter fill in YourRole's stats. */
export const RING_COUNTER_ANIMATION_MS = 1800;

/** Radius (in the 0-36 viewBox) shared by the ring counter's track and fill circles. */
export const RING_COUNTER_RADIUS = 15.9;
