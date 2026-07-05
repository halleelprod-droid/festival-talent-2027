import { festivalEvents } from "@/data/events";

export function getFestivalEvents() {
  return festivalEvents;
}

export function getFestivalEventsByEdition(editionId: string) {
  return festivalEvents.filter((event) => event.editionId === editionId);
}

export function getFestivalEventsCount() {
  return festivalEvents.length;
}
