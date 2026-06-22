/**
 * Stats moved from a repeatable `stats` component to a shared `stat` collection
 * exposed via the `statItems` many-to-many relation. To keep every page
 * component reading `data.stats` unchanged, this prefers `statItems` when it has
 * entries and falls back to the legacy `stats` component otherwise.
 */
export function aliasStats<T extends object>(data: T): T {
  const d = data as { stats?: unknown; statItems?: unknown };
  // The legacy `stats` component is gone, so `stats` only exists if we set it.
  // Always resolve to an array so consumers can safely read `data.stats.length`.
  d.stats = Array.isArray(d.statItems)
    ? d.statItems
    : Array.isArray(d.stats)
      ? d.stats
      : [];
  return data;
}
