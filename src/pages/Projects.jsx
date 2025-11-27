import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ProjectCard from '../components/ProjectCard';
import  {projectsAPI}  from '../services/api.js';
import { PROJECT_CATEGORIES } from '../utils/constants';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await projectsAPI.getAll();
      setProjects(response.data || []);
      setError(null);
    } catch (err) {
      console.error('Error fetching projects:', err);
      setError('Failed to load projects');
    } finally {
      setLoading(false);
    }
  };


  const filteredProjects =
    activeCategory === 'All'
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  return (
    <div className="pt-32 px-6 pb-20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            My <span className="text-yellow-400">Projects</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            A collection of my work in AI/ML, full-stack development, and more.
            Each project represents a unique challenge and learning experience.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12 animate-fade-in">
          {PROJECT_CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                activeCategory === category
                  ? 'bg-yellow-400 text-black'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-yellow-400"></div>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="text-center py-12">
            <p className="text-red-400 mb-4">{error}</p>
            <button
              onClick={fetchProjects}
              className="px-6 py-2 bg-yellow-400 text-black rounded-lg font-semibold hover:bg-yellow-500 transition-all"
            >
              Retry
            </button>
          </div>
        )}

        {/* Projects Grid */}
        {!loading && !error && (
          <>
            {filteredProjects.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in">
                {filteredProjects.map((project) => (
                  <ProjectCard key={project._id} project={project} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-400 text-lg">
                  No projects found in this category.
                </p>
              </div>
            )}
          </>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20">
          <div className="text-center p-6 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border border-gray-700">
            <div className="text-4xl font-bold text-yellow-400 mb-2">
              {projects.length}
            </div>
            <div className="text-gray-400">Total Projects</div>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border border-gray-700">
            <div className="text-4xl font-bold text-yellow-400 mb-2">
              {projects.filter((p) => p.category === 'AI/ML').length}
            </div>
            <div className="text-gray-400">AI/ML Projects</div>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border border-gray-700">
            <div className="text-4xl font-bold text-yellow-400 mb-2">
              {projects.filter((p) => p.category === 'Full Stack').length}
            </div>
            <div className="text-gray-400">Full Stack</div>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border border-gray-700">
            <div className="text-4xl font-bold text-yellow-400 mb-2">
              {projects.filter((p) => p.status === 'in-progress').length}
            </div>
            <div className="text-gray-400">In Progress</div>
          </div>
        </div>
        <div className="text-center mt-12">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 px-8 py-3 bg-yellow-400 text-black rounded-full font-semibold hover:bg-yellow-500 transition-all"
            >
              Recognitions
              <ArrowRight size={20} />
            </Link>
          </div>
      </div>
    </div>
  );
};

export default Projects;