const GITHUB_USERNAME = 'luisruiiz';
const MAX_REPOS = 6;

let cachedRepos = null;

function projectIcon(language) {
  const icons = {
    Python: '🐍', JavaScript: '📜', TypeScript: '📘', HTML: '🌐', CSS: '🎨',
    'C#': '🔷', Java: '☕', PHP: '🐘', Jupyter: '📓', Shell: '💻'
  };
  return icons[language] || '📦';
}

async function fetchGithubRepos() {
  if (cachedRepos) return cachedRepos;
  const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`);
  if (!res.ok) throw new Error('GitHub API error: ' + res.status);
  const repos = await res.json();
  cachedRepos = repos
    .filter(r => !r.fork)
    .sort((a, b) => (b.stargazers_count - a.stargazers_count) || (new Date(b.updated_at) - new Date(a.updated_at)))
    .slice(0, MAX_REPOS);
  return cachedRepos;
}

function renderProjectCard(repo) {
  const desc = repo.description || t('projects.noDesc');
  const lang = repo.language || '—';
  return `
    <div class="project-card reveal active">
      <div class="project-top">
        <span class="project-icon">${projectIcon(repo.language)}</span>
        <span class="project-star">★ ${repo.stargazers_count}</span>
      </div>
      <h3 class="project-name">${repo.name}</h3>
      <p class="project-desc">${desc}</p>
      <div class="project-meta">
        <span class="project-lang"><span class="lang-dot"></span>${lang}</span>
        <a href="${repo.html_url}" target="_blank" rel="noopener" class="project-link">${t('projects.viewRepo')} →</a>
      </div>
    </div>
  `;
}

async function loadProjects() {
  const grid = document.getElementById('projectsGrid');
  if (!grid) return;

  try {
    const repos = await fetchGithubRepos();
    if (!repos.length) {
      grid.innerHTML = `<p class="projects-status">${t('projects.empty')}</p>`;
      return;
    }
    grid.innerHTML = repos.map(renderProjectCard).join('');
  } catch (err) {
    grid.innerHTML = `<p class="projects-status">${t('projects.error')}</p>`;
  }
}

document.addEventListener('langchange', () => {
  if (cachedRepos) {
    const grid = document.getElementById('projectsGrid');
    if (grid && !grid.querySelector('.projects-status')) {
      grid.innerHTML = cachedRepos.map(renderProjectCard).join('');
    } else if (grid) {
      loadProjects();
    }
  }
});
