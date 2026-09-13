/**
 * GitHub API service for fetching repositories and user profile info.
 * Includes caching in sessionStorage to prevent GitHub rate-limiting.
 */

const CACHE_TTL_MS = 1000 * 60 * 10; // 10 minutes cache

export async function fetchGithubProfile(username) {
  const cacheKey = `gh_profile_${username.toLowerCase()}`;
  const cached = getFromCache(cacheKey);
  if (cached) return cached;

  const response = await fetch(`https://api.github.com/users/${encodeURIComponent(username)}`, {
    headers: {
      Accept: 'application/vnd.github.v3+json',
    },
  });

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error(`GitHub user "${username}" was not found.`);
    }
    if (response.status === 403) {
      throw new Error('GitHub API rate limit reached. Showing cached or featured projects.');
    }
    throw new Error(`Failed to load GitHub profile (${response.status})`);
  }

  const data = await response.json();
  saveToCache(cacheKey, data);
  return data;
}

export async function fetchGithubRepos(username) {
  const cacheKey = `gh_repos_${username.toLowerCase()}`;
  const cached = getFromCache(cacheKey);
  if (cached) return cached;

  const response = await fetch(
    `https://api.github.com/users/${encodeURIComponent(username)}/repos?sort=updated&per_page=100`,
    {
      headers: {
        Accept: 'application/vnd.github.v3+json',
      },
    }
  );

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error(`GitHub user "${username}" was not found.`);
    }
    if (response.status === 403) {
      throw new Error('GitHub API rate limit exceeded (60 requests/hour for unauthenticated users).');
    }
    throw new Error(`Failed to fetch repositories (${response.status})`);
  }

  const rawRepos = await response.json();

  // Normalize and clean repos (exclude forks by default, or include if desired)
  const repos = rawRepos
    .map((repo) => ({
      id: repo.id,
      name: repo.name,
      description: repo.description || 'No description provided.',
      html_url: repo.html_url,
      homepage: repo.homepage || '',
      language: repo.language || 'Plain Text',
      stargazers_count: repo.stargazers_count || 0,
      forks_count: repo.forks_count || 0,
      topics: repo.topics || [],
      updated_at: repo.updated_at,
      created_at: repo.created_at,
      fork: repo.fork,
    }))
    // Sort primarily by stars then update date
    .sort((a, b) => b.stargazers_count - a.stargazers_count || new Date(b.updated_at) - new Date(a.updated_at));

  saveToCache(cacheKey, repos);
  return repos;
}

function getFromCache(key) {
  try {
    const item = sessionStorage.getItem(key);
    if (!item) return null;
    const parsed = JSON.parse(item);
    if (Date.now() - parsed.timestamp < CACHE_TTL_MS) {
      return parsed.data;
    }
    sessionStorage.removeItem(key);
  } catch (e) {
    console.warn('Could not read from cache', e);
  }
  return null;
}

function saveToCache(key, data) {
  try {
    sessionStorage.setItem(
      key,
      JSON.stringify({
        timestamp: Date.now(),
        data,
      })
    );
  } catch (e) {
    console.warn('Could not write to cache', e);
  }
}
