# Graph Report - mazarini-frontend  (2026-08-26)

## Corpus Check
- 256 files · ~345,644 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 539 nodes · 790 edges · 87 communities (80 shown, 7 thin omitted)
- Extraction: 83% EXTRACTED · 17% INFERRED · 0% AMBIGUOUS · INFERRED: 135 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `e73d6315`
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
- [[_COMMUNITY_Community 21|Community 21]]
- [[_COMMUNITY_Community 23|Community 23]]
- [[_COMMUNITY_Community 24|Community 24]]
- [[_COMMUNITY_Community 25|Community 25]]

## God Nodes (most connected - your core abstractions)
1. `getStrapiMediaUrl()` - 113 edges
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

## Communities (87 total, 7 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.05
Nodes (13): ProjectFilterCard(), TestimonialCard(), JobCard(), postedLabel(), NewsFilterCard(), ServiceFilterCard(), go(), handleDragEnd() (+5 more)

### Community 1 - "Community 1"
Cohesion: 0.07
Nodes (27): getCorporateResponsibilityPage(), getEstablishesNonprofitFoundationPage(), getAllJobs(), getJobsPage(), getLeadershipPage(), getPreconstructionPage(), getRdPage(), getYouBelongHerePage() (+19 more)

### Community 3 - "Community 3"
Cohesion: 0.09
Nodes (22): About(), generateMetadata(), getAbout(), getCareerPage(), getJobs(), strapiGet(), getConstructionPage(), getExperiencePage() (+14 more)

### Community 4 - "Community 4"
Cohesion: 0.06
Nodes (5): getStrapiMediaUrl(), JobsHero(), handleActiveChange(), handleActiveChange(), SparkImageSection()

### Community 5 - "Community 5"
Cohesion: 0.09
Nodes (15): getColabPage(), getContact(), submitContactForm(), getGlobal(), getSubcontractorsPage(), generateMetadata(), ColabPage(), generateMetadata() (+7 more)

### Community 7 - "Community 7"
Cohesion: 0.13
Nodes (14): getNews(), getNewsPage(), getSafetyPage(), getSparkPage(), getToolsAndTechnologyPage(), generateMetadata(), generateMetadata(), SafetyPage() (+6 more)

### Community 8 - "Community 8"
Cohesion: 0.15
Nodes (14): getInsightBySlug(), getInsights(), getInsightsPage(), getNewsBySlug(), getProjects(), getService(), getServices(), getServicesPage() (+6 more)

### Community 9 - "Community 9"
Cohesion: 0.13
Nodes (6): getStrapiUrl(), submitReportDownload(), searchContent(), searchStrapi(), useSearch(), InsightDownloadForm()

### Community 10 - "Community 10"
Cohesion: 0.22
Nodes (8): getProject(), getProjectsPage(), getProjectTeams(), generateMetadata(), ProjectDetailPage(), generateMetadata(), ProjectKeyTeamSection(), ProjectOverviewSection()

### Community 11 - "Community 11"
Cohesion: 0.17
Nodes (6): CareerCultureSection(), CareerHeroSection(), CareerPeopleSection(), CareerResourcesSection(), CareerSections(), CareerStatsSection()

### Community 13 - "Community 13"
Cohesion: 0.38
Nodes (4): getAwardPage(), AwardSections(), AwardPageRoute(), generateMetadata()

### Community 14 - "Community 14"
Cohesion: 0.38
Nodes (4): getConsiderationPage(), ConsiderationSections(), ConsiderationPageRoute(), generateMetadata()

### Community 15 - "Community 15"
Cohesion: 0.29
Nodes (3): HeroCta(), HeroSection(), HeroVideo()

### Community 16 - "Community 16"
Cohesion: 0.6
Nodes (4): getLocationPage(), getLocations(), generateMetadata(), LocationPage()

### Community 17 - "Community 17"
Cohesion: 0.47
Nodes (3): finish(), unlockScroll(), waitForLoad()

### Community 18 - "Community 18"
Cohesion: 0.6
Nodes (4): getTeams(), getTeamsPage(), generateMetadata(), TeamPage()

## Knowledge Gaps
- **7 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `getStrapiMediaUrl()` connect `Community 4` to `Community 0`, `Community 1`, `Community 2`, `Community 3`, `Community 5`, `Community 8`, `Community 9`, `Community 10`, `Community 12`, `Community 15`, `Community 19`, `Community 20`, `Community 21`, `Community 24`, `Community 27`, `Community 28`, `Community 29`, `Community 41`, `Community 42`, `Community 43`, `Community 44`, `Community 45`, `Community 46`, `Community 47`, `Community 48`, `Community 49`, `Community 50`, `Community 51`, `Community 52`, `Community 53`, `Community 54`, `Community 55`, `Community 56`, `Community 57`, `Community 58`, `Community 59`, `Community 60`, `Community 61`, `Community 62`, `Community 63`, `Community 64`, `Community 65`, `Community 66`?**
  _High betweenness centrality (0.423) - this node is a cross-community bridge._
- **Why does `buildMetadata()` connect `Community 1` to `Community 3`, `Community 4`, `Community 5`, `Community 7`, `Community 8`, `Community 10`, `Community 13`, `Community 14`, `Community 16`, `Community 18`?**
  _High betweenness centrality (0.289) - this node is a cross-community bridge._
- **Why does `FadeIn()` connect `Community 2` to `Community 0`, `Community 3`, `Community 4`, `Community 5`, `Community 7`, `Community 8`, `Community 10`, `Community 45`, `Community 47`, `Community 50`, `Community 21`, `Community 24`, `Community 28`, `Community 29`?**
  _High betweenness centrality (0.105) - this node is a cross-community bridge._
- **Are the 14 inferred relationships involving `getStrapiMediaUrl()` (e.g. with `EstablishesNonprofitFoundation()` and `ProjectDetailPage()`) actually correct?**
  _`getStrapiMediaUrl()` has 14 INFERRED edges - model-reasoned connections that need verification._
- **Are the 31 inferred relationships involving `buildMetadata()` (e.g. with `generateMetadata()` and `generateMetadata()`) actually correct?**
  _`buildMetadata()` has 31 INFERRED edges - model-reasoned connections that need verification._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.05 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.07 - nodes in this community are weakly interconnected._