/**
 * Service to automatically synchronize public repositories from GitHub
 * with fallback to curated portfolio data and caching to avoid rate limits.
 */

const CACHE_KEY_PREFIX = 'gh_repos_';
const CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutes cache

export async function fetchSyncedProjects(username, fallbackProjects = []) {
  if (!username) return fallbackProjects;

  const cacheKey = `${CACHE_KEY_PREFIX}${username.toLowerCase()}`;

  // 1. Check browser sessionStorage for cached data
  try {
    const cached = sessionStorage.getItem(cacheKey);
    if (cached) {
      const { timestamp, data } = JSON.parse(cached);
      if (Date.now() - timestamp < CACHE_TTL_MS && Array.isArray(data) && data.length > 0) {
        return data;
      }
    }
  } catch (err) {
    // Ignore storage parse issues and proceed to fetch
  }

  // 2. Fetch fresh public repositories from GitHub API
  try {
    const response = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`,
      {
        headers: {
          Accept: 'application/vnd.github.v3+json',
        },
      }
    );

    if (!response.ok) {
      // e.g., Rate limit (403) or not found (404)
      return fallbackProjects;
    }

    const repos = await response.json();
    if (!Array.isArray(repos)) {
      return fallbackProjects;
    }

    // 3. Filter out forks and the special user profile README repo (e.g. austinz2428/austinz2428)
    const validRepos = repos.filter(
      (repo) => !repo.fork && repo.name.toLowerCase() !== username.toLowerCase()
    );

    // Map existing curated projects for quick lookup by lower-case name
    const curatedMap = new Map();
    fallbackProjects.forEach((item) => {
      curatedMap.set(item.name.toLowerCase(), item);
    });

    // 4. Merge live GitHub data with curated overrides
    const mergedList = validRepos.map((repo) => {
      const repoKey = repo.name.toLowerCase();
      const curated = curatedMap.get(repoKey);

      if (curated) {
        // Keep curated high-quality description & tech, update URL & stats
        return {
          ...curated,
          url: repo.html_url,
          liveUrl: curated.liveUrl || repo.homepage || null,
          stars: repo.stargazers_count,
          updatedAt: repo.pushed_at || repo.updated_at,
        };
      }

      // Automatically construct format for any newly added GitHub repository
      const techList = [repo.language, ...(repo.topics || [])].filter(Boolean);
      const techString = techList.length > 0 ? techList.slice(0, 3).join(' · ') : 'Software';

      return {
        id: repoKey,
        name: repo.name,
        url: repo.html_url,
        liveUrl: repo.homepage || null,
        description: repo.description || 'Open source repository.',
        tech: techString,
        stars: repo.stargazers_count,
        updatedAt: repo.pushed_at || repo.updated_at,
      };
    });

    // 5. Order: Put recently active repositories first, anchoring 'Portfolio' at the end
    const nonPortfolio = mergedList.filter((p) => p.name.toLowerCase() !== 'portfolio');
    const portfolio = mergedList.filter((p) => p.name.toLowerCase() === 'portfolio');

    // Also include any fallback projects that might be private or not returned by API
    const returnedNames = new Set(mergedList.map((p) => p.name.toLowerCase()));
    const missingFallback = fallbackProjects.filter(
      (p) => !returnedNames.has(p.name.toLowerCase()) && p.name.toLowerCase() !== 'portfolio'
    );

    const finalProjects = [...nonPortfolio, ...missingFallback, ...portfolio];

    // 6. Cache the merged result
    try {
      sessionStorage.setItem(
        cacheKey,
        JSON.stringify({
          timestamp: Date.now(),
          data: finalProjects,
        })
      );
    } catch (err) {
      // Ignore quota exceeded errors
    }

    return finalProjects;
  } catch (error) {
    console.warn('Failed to fetch repos from GitHub API, using fallback data:', error);
    return fallbackProjects;
  }
}
