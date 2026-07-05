import { cmsEntries, type CmsCollection } from "@/content/cms/site-content";

export function getCmsEntries() {
  return cmsEntries;
}

export function getCmsEntriesByCollection(collection: CmsCollection) {
  return cmsEntries.filter((entry) => entry.collection === collection);
}
