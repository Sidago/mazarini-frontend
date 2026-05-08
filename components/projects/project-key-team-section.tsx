import { ServiceKeyTeamMembers } from "@/components/services/service-key-team-members";
import type { Teams } from "@/lib/types/strapi";

interface Props {
  members: Teams[];
}

export function ProjectKeyTeamSection({ members }: Props): React.ReactElement | null {
  if (!members?.length) return null;
  return <ServiceKeyTeamMembers members={members} />;
}
