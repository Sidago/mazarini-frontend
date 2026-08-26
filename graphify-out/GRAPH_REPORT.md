# Graph Report - mazarini-frontend  (2026-08-26)

## Corpus Check
- 256 files · ~345,519 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 538 nodes · 788 edges · 85 communities (79 shown, 6 thin omitted)
- Extraction: 83% EXTRACTED · 17% INFERRED · 0% AMBIGUOUS · INFERRED: 134 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `24868d7b`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 5|Community 5]]
- [[_COMMUNITY_Community 6|Community 6]]
- [[_COMMUNITY_Community 7|Community 7]]
- [[_COMMUNITY_Community 8|Community 8]]
- [[_COMMUNITY_Community 9|Community 9]]
- [[_COMMUNITY_Community 10|Community 10]]
- [[_COMMUNITY_Community 11|Community 11]]
- [[_COMMUNITY_Community 12|Community 12]]
- [[_COMMUNITY_Community 13|Community 13]]
- [[_COMMUNITY_Community 14|Community 14]]
- [[_COMMUNITY_Community 15|Community 15]]
- [[_COMMUNITY_Community 16|Community 16]]
- [[_COMMUNITY_Community 17|Community 17]]
- [[_COMMUNITY_Community 18|Community 18]]
- [[_COMMUNITY_Community 20|Community 20]]
- [[_COMMUNITY_Community 23|Community 23]]
- [[_COMMUNITY_Community 24|Community 24]]

## God Nodes (most connected - your core abstractions)
1. `getStrapiMediaUrl()` - 112 edges
2. `buildMetadata()` - 65 edges
3. `FadeIn()` - 61 edges
4. `strapiGet()` - 33 edges
5. `Icon()` - 21 edges
6. `aliasStats()` - 19 edges
7. `getNews()` - 13 edges
8. `NotFound()` - 10 edges
9. `generateMetadata()` - 7 edges
10. `getGlobal()` - 7 edges

## Surprising Connections (you probably didn't know these)
- `MemberCard()` --calls--> `getStrapiMediaUrl()`  [INFERRED]
  components/leadership/members-carousel.tsx → lib/api/client.ts
- `generateMetadata()` --calls--> `buildMetadata()`  [INFERRED]
  app/layout.tsx → lib/utils/seo.ts
- `generateMetadata()` --calls--> `buildMetadata()`  [INFERRED]
  app/page.tsx → lib/utils/seo.ts
- `Home()` --calls--> `getHomepage()`  [INFERRED]
  app/page.tsx → lib/api/homepage.ts
- `generateMetadata()` --calls--> `buildMetadata()`  [INFERRED]
  app/about/page.tsx → lib/utils/seo.ts

## Communities (85 total, 6 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.05
Nodes (12): ProjectFilterCard(), JobCard(), postedLabel(), NewsFilterCard(), ServiceFilterCard(), go(), handleDragEnd(), next() (+4 more)

### Community 1 - "Community 1"
Cohesion: 0.08
Nodes (26): getConstructionPage(), getNews(), getNewsPage(), getProjects(), getSafetyPage(), getService(), getServices(), getServicesPage() (+18 more)

### Community 3 - "Community 3"
Cohesion: 0.06
Nodes (4): getStrapiMediaUrl(), TestimonialCard(), handleActiveChange(), SparkImageSection()

### Community 4 - "Community 4"
Cohesion: 0.08
Nodes (23): getCorporateResponsibilityPage(), getEstablishesNonprofitFoundationPage(), getLocationPage(), getLocations(), getProjectsPage(), getRdPage(), getSubcontractorsPage(), getYouBelongHerePage() (+15 more)

### Community 5 - "Community 5"
Cohesion: 0.1
Nodes (15): getColabPage(), getContact(), submitContactForm(), getGlobal(), getSparkPage(), generateMetadata(), ColabPage(), generateMetadata() (+7 more)

### Community 6 - "Community 6"
Cohesion: 0.09
Nodes (13): getStrapiUrl(), getInsightBySlug(), getInsights(), getInsightsPage(), getNewsBySlug(), submitReportDownload(), searchContent(), searchStrapi() (+5 more)

### Community 8 - "Community 8"
Cohesion: 0.12
Nodes (14): About(), generateMetadata(), getAbout(), strapiGet(), getExperiencePage(), getTeams(), getTeamsPage(), getPostConstructionPage() (+6 more)

### Community 9 - "Community 9"
Cohesion: 0.14
Nodes (10): getCareerPage(), getJobs(), CareerCultureSection(), CareerHeroSection(), CareerPeopleSection(), CareerResourcesSection(), CareerSections(), CareerStatsSection() (+2 more)

### Community 10 - "Community 10"
Cohesion: 0.2
Nodes (6): getHomepage(), generateMetadata(), Home(), HeroCta(), HeroSection(), HeroVideo()

### Community 11 - "Community 11"
Cohesion: 0.29
Nodes (6): getProject(), getProjectTeams(), generateMetadata(), ProjectDetailPage(), ProjectKeyTeamSection(), ProjectOverviewSection()

### Community 12 - "Community 12"
Cohesion: 0.39
Nodes (5): getAllJobs(), getJobsPage(), JobsHero(), generateMetadata(), JobsPageRoute()

### Community 14 - "Community 14"
Cohesion: 0.38
Nodes (4): getConsiderationPage(), ConsiderationSections(), ConsiderationPageRoute(), generateMetadata()

### Community 15 - "Community 15"
Cohesion: 0.38
Nodes (4): getLeadershipPage(), LeadershipSections(), generateMetadata(), LeadershipPage()

### Community 16 - "Community 16"
Cohesion: 0.38
Nodes (4): getPreconstructionPage(), generateMetadata(), PreconstructionPageRoute(), PreconstructionSections()

### Community 17 - "Community 17"
Cohesion: 0.38
Nodes (4): getAwardPage(), AwardSections(), AwardPageRoute(), generateMetadata()

### Community 18 - "Community 18"
Cohesion: 0.47
Nodes (3): finish(), unlockScroll(), waitForLoad()

## Knowledge Gaps
- **6 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `getStrapiMediaUrl()` connect `Community 3` to `Community 0`, `Community 1`, `Community 2`, `Community 4`, `Community 5`, `Community 6`, `Community 8`, `Community 10`, `Community 11`, `Community 12`, `Community 13`, `Community 19`, `Community 20`, `Community 21`, `Community 23`, `Community 26`, `Community 27`, `Community 28`, `Community 36`, `Community 37`, `Community 38`, `Community 39`, `Community 40`, `Community 41`, `Community 42`, `Community 43`, `Community 44`, `Community 45`, `Community 46`, `Community 47`, `Community 48`, `Community 49`, `Community 50`, `Community 51`, `Community 52`, `Community 53`, `Community 54`, `Community 55`, `Community 56`, `Community 57`, `Community 58`, `Community 59`, `Community 60`?**
  _High betweenness centrality (0.421) - this node is a cross-community bridge._
- **Why does `buildMetadata()` connect `Community 4` to `Community 1`, `Community 3`, `Community 5`, `Community 6`, `Community 8`, `Community 9`, `Community 10`, `Community 11`, `Community 12`, `Community 14`, `Community 15`, `Community 16`, `Community 17`?**
  _High betweenness centrality (0.289) - this node is a cross-community bridge._
- **Why does `FadeIn()` connect `Community 2` to `Community 0`, `Community 1`, `Community 3`, `Community 4`, `Community 5`, `Community 6`, `Community 37`, `Community 8`, `Community 11`, `Community 49`, `Community 50`, `Community 20`, `Community 23`, `Community 56`, `Community 26`, `Community 27`?**
  _High betweenness centrality (0.105) - this node is a cross-community bridge._
- **Are the 13 inferred relationships involving `getStrapiMediaUrl()` (e.g. with `EstablishesNonprofitFoundation()` and `ProjectDetailPage()`) actually correct?**
  _`getStrapiMediaUrl()` has 13 INFERRED edges - model-reasoned connections that need verification._
- **Are the 31 inferred relationships involving `buildMetadata()` (e.g. with `generateMetadata()` and `generateMetadata()`) actually correct?**
  _`buildMetadata()` has 31 INFERRED edges - model-reasoned connections that need verification._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.05 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.08 - nodes in this community are weakly interconnected._