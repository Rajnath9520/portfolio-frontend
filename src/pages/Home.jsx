import React from 'react';
import Hero from '../components/Hero';
import { Link } from 'react-router-dom';
import { ArrowRight, Code, Brain, Database, Cpu } from 'lucide-react';
import { ABOUT_STATS, EXPERTISE_AREAS } from '../utils/constants';
import About from './About'
import Skills from './Skills';
import Reveal from '../components/Reveal';

const Home = () => {
  const iconMap = {
    Brain: Brain,
    Code: Code,
    Database: Database,
    Cpu: Cpu,
  };

  const colorClasses = {
    blue: 'from-blue-500/10 border-blue-500/20 text-blue-400',
    green: 'from-green-500/10 border-green-500/20 text-green-400',
    purple: 'from-purple-500/10 border-purple-500/20 text-purple-400',
    yellow: 'from-yellow-500/10 border-yellow-500/20 text-yellow-400',
  };

  return (
    <div>
    <Hero />
    <About/> 
    <Skills/>    
      

      <section className="py-20 px-6 bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <Reveal direction="up">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              What I <span className="text-yellow-400">Do</span>
            </h2>
            <p className="text-gray-400 text-lg">
              Where Full-Stack engineering meets AI innovation and Cloud scalability.
            </p>
          </div>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 ">
            {EXPERTISE_AREAS.map((area, index) => {
              const Icon = iconMap[area.icon];
              return (
                <div
                  key={index}
                  className={`p-6 bg-gradient-to-br ${colorClasses[area.color]} rounded-xl border transition-all duration-300 hover:transform hover:-translate-y-2`}
                >
                  <Icon className={colorClasses[area.color].split(' ')[2]} size={40} />
                  <h3 className="font-semibold text-lg mt-4 mb-2 text-white">
                    {area.title}
                  </h3>
                  <p className="text-gray-400 text-sm">{area.description}</p>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* CTA Section */}
      
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-r from-yellow-400/10 to-yellow-600/10 border border-yellow-400/20 rounded-3xl p-12 text-center">
            <Reveal direction='up'>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Let's Work <span className="text-yellow-400">Together</span>
            </h2>
            
            <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
              I'm always interested in hearing about new projects and opportunities.
              Let's create something amazing together!
            </p>
            </Reveal>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="px-8 py-4 bg-yellow-400 text-black rounded-full font-semibold hover:bg-yellow-500 transition-all"
              >
                Get In Touch
              </Link>
              <Link
                to="/projects"
                className="px-8 py-4 border-2 border-yellow-400 text-yellow-400 rounded-full font-semibold hover:bg-yellow-400 hover:text-black transition-all"
              >
                View My Work
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;