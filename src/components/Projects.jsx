import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Github,
  ExternalLink,
  Star,
  ArrowUpRight,
  GitBranch,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  Columns,
  LayoutGrid
} from 'lucide-react';
import { projectsData } from '../data/portfolioData';

// Repositories to exclude from portfolio showcase (only the portfolio website itself)
const EXCLUDED_REPOS = new Set([
  'sailesh-portfolio',
  'portfolio'
]);

// Curated status badges for flagship repositories
const badgeOverrides = {
  'attendx': 'Production Ready',
  'Smart-Expense-Manager': 'Full Stack',
  'GradientMatch': 'Design Tool',
  'weatherly': 'React Dashboard',
  'CGPA-Calculator': 'Academic Utility',
  'ui-ux-stylepedia': 'Design System',
  'Smart-Bus-Monitoring-System': 'Hardware Prototype',
  'CodSoft_Task2': 'Full Stack',
  'codsoft_task1': 'Internship Hub',
  'chat-me': 'Open Source',
  'Web-Alarm': 'Live Utility',
  'codsoft_task3': 'Vanilla JS',
  'Simple-Calculator': 'JavaScript',
  'To-Do-List': 'Productivity Tool',
};

// Curated clean titles for better presentation
const titleOverrides = {
  'attendx': 'AttendX',
  'Smart-Expense-Manager': 'ExpensiQ (Smart Expense Manager)',
  'GradientMatch': 'GradientMatch',
  'weatherly': 'Weatherly',
  'CGPA-Calculator': 'CGPA Calculator & Analytics',
  'ui-ux-stylepedia': 'UI/UX Stylepedia',
  'Smart-Bus-Monitoring-System': 'Smart Bus Monitor',
  'CodSoft_Task2': 'Job Board Platform',
  'codsoft_task1': 'CodSoft Projects Hub',
  'chat-me': 'Chat-Me',
  'Web-Alarm': 'Web-Alarm',
  'codsoft_task3': 'Interactive Web Calculator',
  'Simple-Calculator': 'Quick Calc Utility',
  'To-Do-List': 'Task & To-Do Planner',
};

// Fallback stack map if repo has no GitHub topics configured yet
const fallbackStacks = {
  'attendx': ['Node.js', 'Express', 'Supabase', 'Vercel'],
  'Smart-Expense-Manager': ['React', 'Node.js', 'Express', 'Tailwind CSS', 'Recharts'],
  'GradientMatch': ['JavaScript', 'CSS3 Tokens', 'WCAG Contrast', 'Canvas API'],
  'weatherly': ['React', 'Vite', 'Tailwind CSS', 'OpenWeather API'],
  'CGPA-Calculator': ['Flask', 'Python', 'Vanilla JS', 'Chart.js', 'PDF Gen'],
  'ui-ux-stylepedia': ['Vanilla JS', 'CSS3 Custom Properties', 'Design Tokens', 'Glassmorphism'],
  'Smart-Bus-Monitoring-System': ['IoT', 'JavaScript', 'Hardware Sensors', 'AI-UI'],
  'CodSoft_Task2': ['React', 'Node.js', 'Express', 'SQLite', 'JWT Auth'],
  'codsoft_task1': ['HTML5', 'CSS3', 'JavaScript', 'Git'],
  'chat-me': ['Python', 'Streamlit', 'SQLite', 'bcrypt'],
  'Web-Alarm': ['JavaScript ES6+', 'Material Design 3', 'LocalStorage', 'Web Audio'],
  'codsoft_task3': ['HTML5', 'CSS3', 'JavaScript'],
  'Simple-Calculator': ['JavaScript', 'HTML5', 'CSS3'],
  'To-Do-List': ['HTML5', 'CSS3', 'JavaScript', 'LocalStorage']
};

// Curated category tags for filtering
const categoryOverrides = {
  'attendx': 'Full-Stack',
  'Smart-Expense-Manager': 'Full-Stack',
  'weatherly': 'Full-Stack',
  'CodSoft_Task2': 'Full-Stack',
  'GradientMatch': 'Tools & UI',
  'ui-ux-stylepedia': 'Tools & UI',
  'CGPA-Calculator': 'Tools & UI',
  'Web-Alarm': 'Tools & UI',
  'codsoft_task1': 'Tools & UI',
  'codsoft_task3': 'Tools & UI',
  'Simple-Calculator': 'Tools & UI',
  'To-Do-List': 'Tools & UI',
  'Smart-Bus-Monitoring-System': 'IoT & Systems',
  'chat-me': 'IoT & Systems',
};

// Heuristic title formatter for any new future repositories
function formatTitle(name) {
  if (!name) return '';
  if (titleOverrides[name]) return titleOverrides[name];
  return name
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

// Clean raw GitHub descriptions (stripping leading markdown # or quotes)
function cleanDescription(desc) {
  if (!desc) return '';
  return desc
    .replace(/^[#>\s"']+/g, '')
    .replace(/["']+$/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

// Extract a concise, punchy tagline from description
function extractTagline(desc, fallback) {
  if (fallback) return fallback;
  if (!desc) return '';
  const cleaned = cleanDescription(desc);
  const sentenceMatch = cleaned.match(/^([^.!?\n|]+[.!?]?)/);
  return sentenceMatch ? sentenceMatch[1].trim() : cleaned.slice(0, 85);
}

// Heuristic category detector for newly pushed repositories
function determineCategory(repo) {
  if (categoryOverrides[repo.name]) return categoryOverrides[repo.name];
  const lang = (repo.language || '').toLowerCase();
  const topics = (repo.topics || []).map((t) => t.toLowerCase()).join(' ');
  const combined = `${lang} ${topics}`;

  if (combined.includes('iot') || combined.includes('python') || combined.includes('sensor') || combined.includes('hardware')) {
    return 'IoT & Systems';
  }
  if (combined.includes('css') || combined.includes('design') || combined.includes('ui') || combined.includes('tool') || combined.includes('gradient')) {
    return 'Tools & UI';
  }
  return 'Full-Stack';
}

// Reusable, Pixel-Aligned Project Card Component
function ProjectCard({ project, isSlider = false }) {
  const isExternalDemo = project.demo && project.demo !== project.github;

  return (
    <article
      className={`${
        isSlider
          ? 'w-[88vw] sm:w-[320px] md:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)] xl:w-[calc(25%-15px)] flex-shrink-0 snap-start'
          : 'w-full'
      } glass-panel p-5 sm:p-6 border border-slate-800/90 hover:border-cyber/40 transition-all duration-300 flex flex-col justify-between group shadow-xl hover:shadow-[0_8px_30px_rgba(56,189,248,0.12)] min-h-[490px]`}
    >
      <div>
        {/* Row 1: Category Pill (what it is) & Action Link Icons */}
        <div className="flex items-center justify-between gap-2 h-7 mb-1.5">
          <span
            className="font-mono text-[10px] px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400 font-medium tracking-wide uppercase"
            title={`Category: ${project.category}`}
          >
            {project.category}
          </span>

          <div className="flex items-center gap-1.5 flex-shrink-0">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-colors"
              aria-label={`View ${project.title} on GitHub`}
            >
              <Github className="w-3.5 h-3.5" />
            </a>
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyber hover:border-cyber/40 transition-colors"
                aria-label={`Open link for ${project.title}`}
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>

        {/* Row 2: Status / Tool Type Badge & Stars (never wraps, constant height) */}
        <div className="flex items-center gap-1.5 h-6 mb-3">
          <span
            className="font-mono text-[11px] px-2.5 py-0.5 rounded bg-cyber/10 border border-cyber/30 text-cyber font-medium truncate"
            title={`Type: ${project.status}`}
          >
            {project.status}
          </span>
          {typeof project.stars === 'number' && project.stars > 0 && (
            <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-amber-950/40 border border-amber-800/40 text-amber-400 flex items-center gap-1 flex-shrink-0">
              <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
              <span>{project.stars}</span>
            </span>
          )}
        </div>

        {/* Row 3: Project Title: Wrapped up to 2 lines, fixed uniform height (h-14) so all cards align horizontally */}
        <div className="h-14 mb-2 flex items-start">
          <h3
            className="text-base sm:text-lg font-bold text-white group-hover:text-cyber transition-colors line-clamp-2 leading-snug break-words"
            title={project.title}
          >
            {project.title}
          </h3>
        </div>

        {/* Row 4: Clean Tagline: uniform height (h-9) so descriptions align horizontally */}
        <div className="h-9 mb-3 flex items-start">
          {project.tagline ? (
            <p className="text-xs font-mono text-emerald-400 font-medium line-clamp-2 leading-tight">
              // {project.tagline}
            </p>
          ) : (
            <div className="h-full" />
          )}
        </div>

        {/* Row 5: Narrative Description: uniform height (h-16) so tech stacks align horizontally */}
        <div className="h-16 mb-4 flex items-start">
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed line-clamp-3">
            {project.description}
          </p>
        </div>
      </div>

      <div>
        {/* Row 6: Tech Stack / Topics: 2 fully visible lines (h-16), no cutoff */}
        <div className="pt-3 border-t border-slate-800/80 mb-4 h-16 flex flex-wrap gap-1.5 content-start items-center">
          {project.stack?.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="font-mono text-[10px] px-2 py-0.5 rounded-md bg-slate-900/90 text-slate-300 border border-slate-800 flex-shrink-0"
            >
              {tech}
            </span>
          ))}
          {project.stack && project.stack.length > 4 && (
            <span className="font-mono text-[10px] px-1.5 py-0.5 rounded-md bg-slate-800/80 text-slate-400 border border-slate-700/50 flex-shrink-0">
              +{project.stack.length - 4}
            </span>
          )}
        </div>

        {/* Row 7: Dual Action Buttons */}
        <div className="grid grid-cols-2 gap-2 mt-auto">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2 px-2.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-600 text-slate-200 text-[11px] font-mono font-medium flex items-center justify-center gap-1.5 transition-colors"
          >
            <Github className="w-3 h-3" />
            <span>Code</span>
          </a>

          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className={`w-full py-2 px-2.5 rounded-lg text-[11px] font-mono font-bold flex items-center justify-center gap-1 transition-colors ${
              isExternalDemo
                ? 'bg-cyber/20 border border-cyber/40 hover:bg-cyber/30 text-cyber'
                : 'bg-slate-900 border border-slate-800 hover:border-cyber/40 text-slate-300 hover:text-cyber'
            }`}
          >
            <span>{isExternalDemo ? 'Demo' : 'View'}</span>
            <ArrowUpRight className="w-3 h-3" />
          </a>
        </div>
      </div>
    </article>
  );
}

export default function Projects() {
  const [projects, setProjects] = useState(projectsData.projects);
  const [isLiveSynced, setIsLiveSynced] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('slider'); // 'slider' (linear side-by-side 4 per slide) or 'grid'

  const sliderRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [totalSlides, setTotalSlides] = useState(1);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await fetch('https://api.github.com/users/sailesh-01/repos?sort=updated');
        if (!res.ok) throw new Error(`GitHub API returned status ${res.status}`);
        const repos = await res.json();

        if (Array.isArray(repos)) {
          // Filter out forks and self-repository, allowing all real active projects to show
          const nonForks = repos.filter(
            (r) => !r.fork && !EXCLUDED_REPOS.has(r.name)
          );

          const mapped = nonForks.map((r) => {
            const fallback = projectsData.projects.find(
              (p) =>
                p.id === r.name ||
                p.title.toLowerCase() === r.name.toLowerCase() ||
                p.github.toLowerCase().includes(r.name.toLowerCase())
            );

            const title = titleOverrides[r.name] || fallback?.title || formatTitle(r.name);
            const desc = fallback?.description || cleanDescription(r.description);
            const tagline = fallback?.tagline || extractTagline(r.description);
            const stack =
              fallbackStacks[r.name] ||
              (r.topics && r.topics.length > 0
                ? r.topics
                : fallback?.stack || (r.language ? [r.language] : ['Software']));
            const status =
              badgeOverrides[r.name] ||
              (r.homepage ? 'Live Demo' : r.language ? `${r.language} Project` : 'Active');
            const category = fallback?.category || determineCategory(r);

            return {
              id: r.name,
              title,
              tagline,
              description: desc,
              stack,
              github: r.html_url,
              demo: r.homepage || fallback?.demo || r.html_url,
              status,
              category,
              stars: r.stargazers_count,
              updatedAt: r.updated_at
            };
          });

          if (mapped.length > 0) {
            setProjects(mapped);
            setIsLiveSynced(true);
          }
        }
      } catch (err) {
        console.info('Using curated project data fallback:', err.message);
      }
    }

    fetchProjects();
  }, []);

  // Filtered projects based on Category + Search query
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesCategory =
        activeCategory === 'All' || project.category === activeCategory;

      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        project.title.toLowerCase().includes(query) ||
        project.tagline?.toLowerCase().includes(query) ||
        project.description?.toLowerCase().includes(query) ||
        project.stack?.some((t) => t.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [projects, activeCategory, searchQuery]);

  // Update slider metrics (scroll positions, total slides)
  const updateSliderMetrics = () => {
    if (!sliderRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
    const maxScroll = Math.max(0, scrollWidth - clientWidth);

    setCanScrollLeft(scrollLeft > 15);
    setCanScrollRight(scrollLeft < maxScroll - 15);

    if (clientWidth > 0) {
      const computedSlides = Math.max(1, Math.ceil((scrollWidth - 10) / clientWidth));
      setTotalSlides(computedSlides);
      const activeIdx = Math.min(
        computedSlides - 1,
        Math.max(0, Math.round(scrollLeft / clientWidth))
      );
      setCurrentSlide(activeIdx);
    }
  };

  // Re-calculate slider on filtered projects, resize or category change
  useEffect(() => {
    const timer = setTimeout(updateSliderMetrics, 100);
    window.addEventListener('resize', updateSliderMetrics);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updateSliderMetrics);
    };
  }, [filteredProjects, viewMode]);

  // Reset scroll when filter changes
  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    }
  }, [activeCategory, searchQuery]);

  // Slider navigation handlers (slides 1 full viewport = 4 cards on desktop)
  const handleNext = () => {
    if (sliderRef.current) {
      const { clientWidth } = sliderRef.current;
      sliderRef.current.scrollBy({ left: clientWidth, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    if (sliderRef.current) {
      const { clientWidth } = sliderRef.current;
      sliderRef.current.scrollBy({ left: -clientWidth, behavior: 'smooth' });
    }
  };

  const handleGoToSlide = (idx) => {
    if (sliderRef.current) {
      const { clientWidth } = sliderRef.current;
      sliderRef.current.scrollTo({ left: idx * clientWidth, behavior: 'smooth' });
    }
  };

  const categories = ['All', 'Full-Stack', 'Tools & UI', 'IoT & Systems'];

  return (
    <section id="projects" className="py-24 relative z-10 px-4 sm:px-6 border-t border-slate-800/60">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="font-mono text-xs text-cyber tracking-widest uppercase block mb-2 font-semibold">
              {projectsData.sectionTag}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight flex items-center gap-3">
              <span>{projectsData.title}</span>
              <div className="h-px bg-slate-800 flex-grow max-w-xs" />
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl">
              {projectsData.subtitle}
            </p>
          </div>

          {/* GitHub Sync Status Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 self-start md:self-end text-xs font-mono">
            <GitBranch className={`w-3.5 h-3.5 ${isLiveSynced ? 'text-neural' : 'text-cyber'}`} />
            <span className={isLiveSynced ? 'text-neural' : 'text-slate-400'}>
              {isLiveSynced ? `GITHUB LIVE // ${projects.length} REPOS SYNCED` : 'CURATED // REPOSITORIES'}
            </span>
          </div>
        </div>

        {/* Filter Controls & Layout Toolbar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800/70">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => {
              const count =
                cat === 'All'
                  ? projects.length
                  : projects.filter((p) => p.category === cat).length;
              const isActive = activeCategory === cat;

              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-200 flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-cyber text-canvas font-bold shadow-[0_0_15px_rgba(56,189,248,0.35)]'
                      : 'bg-slate-900/90 border border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
                  }`}
                >
                  <span>{cat}</span>
                  <span
                    className={`px-1.5 py-0.2 text-[10px] rounded ${
                      isActive ? 'bg-black/25 text-canvas' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search, View Mode & Slide Navigation Controls */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Search Input */}
            <div className="relative w-full sm:w-56">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search tech or name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 bg-slate-900/90 border border-slate-800 rounded-lg text-xs font-mono text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyber transition-colors"
              />
            </div>

            {/* View Mode Switcher */}
            <div className="flex items-center rounded-lg bg-slate-900/90 border border-slate-800 p-0.5">
              <button
                onClick={() => setViewMode('slider')}
                className={`px-2.5 py-1 rounded text-xs font-mono flex items-center gap-1.5 transition-colors ${
                  viewMode === 'slider'
                    ? 'bg-cyber text-canvas font-bold shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Side-by-side Linear Slider (4 per slide on desktop)"
              >
                <Columns className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Linear Slider</span>
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`px-2.5 py-1 rounded text-xs font-mono flex items-center gap-1.5 transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-cyber text-canvas font-bold shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Multi-column Grid View"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Grid</span>
              </button>
            </div>

            {/* Slide Next / Prev Controls (Visible in Slider Mode) */}
            {viewMode === 'slider' && totalSlides > 1 && (
              <div className="flex items-center gap-2 pl-1 border-l border-slate-800">
                <span className="font-mono text-xs text-slate-400">
                  <span className="text-cyber font-bold">{String(currentSlide + 1).padStart(2, '0')}</span>
                  <span className="text-slate-600 mx-1">/</span>
                  {String(totalSlides).padStart(2, '0')}
                </span>
                <button
                  onClick={handlePrev}
                  disabled={!canScrollLeft}
                  aria-label="Previous Slide"
                  className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyber hover:border-cyber/40 disabled:opacity-30 disabled:pointer-events-none transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNext}
                  disabled={!canScrollRight}
                  aria-label="Next Slide"
                  className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyber hover:border-cyber/40 disabled:opacity-30 disabled:pointer-events-none transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="glass-panel p-12 text-center rounded-2xl border border-slate-800">
            <Filter className="w-8 h-8 text-slate-500 mx-auto mb-3" />
            <h3 className="text-white font-mono text-base font-bold mb-1">No matching projects found</h3>
            <p className="text-slate-400 text-xs font-mono">
              Try adjusting your category filter or search query.
            </p>
            <button
              onClick={() => {
                setActiveCategory('All');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 rounded-lg bg-cyber text-canvas text-xs font-mono font-bold"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* LINEAR SLIDER MODE: Side-by-side 4 per slide on desktop */}
        {viewMode === 'slider' && filteredProjects.length > 0 && (
          <div className="relative">
            <div
              ref={sliderRef}
              onScroll={updateSliderMetrics}
              className="flex gap-5 overflow-x-auto scroll-smooth snap-x snap-mandatory py-3 px-1 scrollbar-none"
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none'
              }}
            >
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} isSlider={true} />
              ))}
            </div>

            {/* Slide Pagination Track & Progress Dots */}
            {totalSlides > 1 && (
              <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800/60 font-mono text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <span className="text-cyber font-semibold">// SLIDE CONTROLS:</span>
                  <span>Side by side (4 per slide) • Swipe or click arrows</span>
                </div>

                {/* Interactive Page Indicator Dots */}
                <div className="flex items-center gap-2">
                  {Array.from({ length: totalSlides }).map((_, idx) => {
                    const isActive = currentSlide === idx;
                    return (
                      <button
                        key={idx}
                        onClick={() => handleGoToSlide(idx)}
                        aria-label={`Jump to slide ${idx + 1}`}
                        className={`transition-all duration-300 rounded-full ${
                          isActive
                            ? 'w-7 h-2 bg-cyber shadow-[0_0_12px_rgba(56,189,248,0.6)]'
                            : 'w-2 h-2 bg-slate-800 hover:bg-slate-700'
                        }`}
                      />
                    );
                  })}
                </div>

                <div className="flex items-center gap-2 text-[11px]">
                  <span>{filteredProjects.length} REPOSITORIES LOADED</span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* GRID VIEW MODE: Responsive Multi-Column Grid */}
        {viewMode === 'grid' && filteredProjects.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} isSlider={false} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
