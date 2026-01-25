import React, { useState, useEffect } from 'react';
import AchievementCard from '../components/AchievementCard';
import { achievementsAPI } from '../services/api.js';
import { ACHIEVEMENT_CATEGORIES } from '../utils/constants';

const Achievements = () => {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [showTimeline, setShowTimeline] = useState(false);

  useEffect(() => {
    fetchAchievements();
  }, []);

  const fetchAchievements = async () => {
    try {
      setLoading(true);
      const response = await achievementsAPI.getAll();
      setAchievements(response.data || []);
      setError(null);
    } catch (err) {
      console.error('Error fetching achievements:', err);
      setError('Failed to load achievements');
      setAchievements([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredAchievements =
    activeCategory === 'All'
      ? achievements
      : achievements.filter((achievement) => achievement.category === activeCategory);

  const featuredAchievements = achievements.filter(a => a.featured);

  return (
    <div className="pt-32 px-6 pb-20">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl sm:text-2xl font-bold mb-6 break-words leading-tight">
            Achievements & <span className="text-yellow-400">Badges</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            A showcase of certifications, awards, and recognitions earned through dedication,
            learning, and consistent hard work in tech and beyond.
          </p>
        </div>

        {/* Featured Achievements Banner */}
        {featuredAchievements.length > 0 && !loading && !showTimeline && (
          <div className="mb-12 animate-fade-in">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <span className="text-yellow-400">⭐</span>
              Featured Achievements
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredAchievements.slice(0, 3).map((achievement) => (
                <div
                  key={achievement._id}
                  className="p-6 bg-gradient-to-br from-yellow-400/10 to-orange-500/10 rounded-xl border-2 border-yellow-400/30 hover:border-yellow-400/50 "
                >
                  <div className="flex items-start gap-4">
                    <img
                      src={achievement.images?.[0]}
                      alt={achievement.title}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-1">{achievement.title}</h3>
                      <p className="text-sm text-gray-400 mb-2">{achievement.issuer}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(achievement.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short'
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Category Filter */}
        {!showTimeline && (
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {ACHIEVEMENT_CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2 rounded-full font-medium  ${
                  activeCategory === category
                    ? 'bg-yellow-400 text-black'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        )}

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
              onClick={fetchAchievements}
              className="px-6 py-2 bg-yellow-400 text-black rounded-lg font-semibold hover:bg-yellow-500 "
            >
              Retry
            </button>
          </div>
        )}

        {/* GRID MODE */}
        {!loading && !error && !showTimeline && (
          <>
            {filteredAchievements.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-1 gap-8 ">
                {filteredAchievements.map((achievement) => (
                  <AchievementCard key={achievement._id} achievement={achievement} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-400 text-lg">
                  No achievements found in this category.
                </p>
              </div>
            )}
          </>
        )}

        {/* TIMELINE MODE */}
        {!loading && !error && showTimeline && (
          <div className="mt-16 animate-fade-in">
            <h2 className="text-3xl font-bold text-center mb-12 text-yellow-400">
              Achievement Timeline
            </h2>

            <div className="relative border-l border-gray-700 ml-6">

              {achievements
                .slice()
                .sort((a, b) => new Date(a.date) - new Date(b.date))
                .map((achievement, index) => (
                  <div key={achievement._id} className="mb-12 ml-6 relative">

                    {/* Dot */}
                    <span className="absolute -left-9 mt-2 w-4 h-4 bg-yellow-400 rounded-full border-2 border-gray-900 shadow-md"></span>

                    <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl border border-gray-700 shadow-lg hover:shadow-xl  w-full">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-bold text-white">
                          {achievement.title}
                        </h3>
                        <span className="text-sm text-gray-400">
                          {new Date(achievement.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short'
                          })}
                        </span>
                      </div>

                      <p className="text-gray-400 mt-2 mb-4">
                        {achievement.description}
                      </p>

                      {/* Preview image */}
                      {achievement.images?.[0] && (
                        <img
                          src={achievement.images[0]}
                          alt={achievement.title}
                          className="w-40 h-28  rounded-lg border border-gray-700"
                        />
                      )}
                    </div>
                  </div>
              ))}
            </div>
          </div>
        )}

        {/* Stats (Hide in Timeline mode) */}
        {!showTimeline && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20">
            <div className="text-center p-6 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border border-gray-700">
              <div className="text-4xl font-bold text-yellow-400 mb-2">
                {achievements.length}
              </div>
              <div className="text-gray-400">Total Achievements</div>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border border-gray-700">
              <div className="text-4xl font-bold text-yellow-400 mb-2">
                {achievements.filter((a) => a.category === 'Courses & Certifications').length}
              </div>
              <div className="text-gray-400">Certifications</div>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border border-gray-700">
              <div className="text-4xl font-bold text-yellow-400 mb-2">
                {achievements.filter((a) => a.category === 'Hackathons').length}
              </div>
              <div className="text-gray-400">Competitions</div>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border border-gray-700">
              <div className="text-4xl font-bold text-yellow-400 mb-2">
                {achievements.filter((a) => a.category === 'Extracurricular Activities').length}
              </div>
              <div className="text-gray-400">Extracurricular Activities</div>
            </div>
          </div>
        )}

        {/* Timeline Toggle Button */}
        <div className="mt-16 text-center">
          <button
            onClick={() => setShowTimeline(!showTimeline)}
            className="px-6 py-3 bg-gray-800 text-white rounded-lg font-semibold hover:bg-gray-700 "
          >
            {showTimeline ? "Back to Grid View" : "View Timeline"}
          </button>
        </div>

      </div>
    </div>
  );
};

export default Achievements;
