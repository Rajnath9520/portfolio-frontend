import React from 'react';
import { Code, Brain, Database, Cpu, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ABOUT_STATS, EXPERTISE_AREAS } from '../utils/constants';
import Reveal from '../components/Reveal'


const About = () => {
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
    <div className="pt-8 px-6 pb-20 overflow-x-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <Reveal direction="up">
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            About <span className="text-yellow-400">Me</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            A Full-Stack developer passionate about building intelligent, cloud-ready, and user-focused solutions.
          </p>
        </div>
        </Reveal>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-12 items-start mb-20">
          {/* Left: Bio */}
          <div className="space-y-6 animate-fade-in-left">
            <Reveal direction="left" delay={0.1}>
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700">
              <h2 className="text-3xl font-bold mb-6 text-yellow-400">My Journey</h2>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  I'm an AI and Full-Stack developer passionate about building intelligent, scalable, and user-centered 
                  digital experiences. My journey in tech began with curiosity—exploring how systems work and how AI can 
                  create real impact. Over time, that curiosity has grown into a commitment to mastering both modern web 
                  development and artificial intelligence
                </p>
                <p>
                  I’ve built a range of projects, from AI-driven semantic search with LLaMA, RAG-based systems, and smart
                   solutions like Ez-Smart Agriculture, to full-stack platforms such as Civic-Sight and complete admin 
                   dashboards with authentication, content management, and cloud deployment. Each project has helped me
                    refine my problem-solving approach and create cleaner, more scalable applications.
                </p>
                <p>
                  My expertise includes Python, JavaScript, React, Node.js, Express, MongoDB, FastAPI, and ML frameworks like TensorFlow, PyTorch, and LLaMA. 
                  I love crafting clean architectures—whether it's an AI pipeline, a backend service, or a polished frontend.
                </p>
                <p>
                  Outside of development, I stay focused on exploring new technologies, sharpening my AI knowledge, and playing badminton to stay balanced. 
                  My journey is rooted in continuous learning and building solutions that truly make an impact.
                </p>
              </div>
            </div>
            </Reveal>
          </div>

          {/* Right: Stats and Expertise */}
          <Reveal direction="right" delay={0.2}>
          <div className="space-y-6 animate-fade-in-right">
            
            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              {ABOUT_STATS.map((stat, index) => (
                <div
                  key={index}
                  className="text-center p-6 bg-gradient-to-br from-yellow-400/10 to-transparent rounded-xl border border-yellow-400/20"
                >
                  <div className="text-4xl font-bold text-yellow-400 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Expertise Cards */}
            <div className="grid grid-cols-2 gap-4">
              {EXPERTISE_AREAS.map((area, index) => {
                const Icon = iconMap[area.icon];
                return (
                  <div
                    key={index}
                    className={`p-6 bg-gradient-to-br ${colorClasses[area.color]} rounded-xl border`}
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
          </Reveal>
        </div>

        {/* Education & Experience */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          <Reveal direction="up">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700 animate-fade-in">
            <h3 className="text-2xl font-bold mb-6 text-yellow-400">Education</h3>
            <div className="space-y-6">
              <div className="border-l-2 border-yellow-400 pl-6">
                <div className="text-sm text-gray-400 mb-1">2023 - 2027</div>
                <h4 className="text-xl font-semibold mb-2">
                  B.Tech in Information Technology
                </h4>
                <p className="text-gray-400">Institute of Technology,Guru Ghasidas Vishwavidyalaya- Central University Chhattisgarh</p>
              </div>
              <div className="border-l-2 border-gray-600 pl-6">
                <div className="text-sm text-gray-400 mb-1">Online</div>
                <h4 className="text-xl font-semibold mb-2">
                  Complete Data Science,Machine Learning,DL,NLP
                </h4>
                <p className="text-gray-400">Udemy.com</p>
              </div>
              <div className="border-l-2 border-gray-600 pl-6">
                <div className="text-sm text-gray-400 mb-1">Online</div>
                <h4 className="text-xl font-semibold mb-2">
                  Full Stack Development
                </h4>
                <p className="text-gray-400">Apna College\Delta-6</p>
              </div>
              <div className="border-l-2 border-yellow-400 pl-6">
                <div className="text-sm text-gray-400 mb-1">2020 - 2021</div>
                <h4 className="text-xl font-semibold mb-2">
                  12th
                </h4>
                <p className="text-gray-400">89.4%</p>
                <p className="text-gray-400">JNV Etawah(U.P)</p>
              </div>
            </div>
          </div>
          </Reveal>

          {/* Experience */}
          <Reveal direction="up" delay={0.2}>
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700 animate-fade-in">
            <h3 className="text-2xl font-bold mb-6 text-yellow-400">Experience</h3>
            <div className="space-y-6">
              <div className="border-l-2 border-yellow-400 pl-6">
                <div className="text-sm text-gray-400 mb-1">0</div>
                {/* <h4 className="text-xl font-semibold mb-2">
                  Full Stack Developer
                </h4>
                <p className="text-gray-400 mb-2">Freelance</p>
                <ul className="text-sm text-gray-400 space-y-1">
                  <li>• Built AI-powered applications</li>
                  <li>• Developed full-stack web solutions</li>
                  <li>• Implemented ML models in production</li>
                </ul> */}
              </div>
              {/* <div className="border-l-2 border-gray-600 pl-6">
                <div className="text-sm text-gray-400 mb-1">2022 - 2023</div>
                <h4 className="text-xl font-semibold mb-2">AI/ML Intern</h4>
                <p className="text-gray-400 mb-2">Tech Company</p>
                <ul className="text-sm text-gray-400 space-y-1">
                  <li>• Worked on computer vision projects</li>
                  <li>• Developed NLP applications</li>
                </ul>
              </div> */}
            </div>
          </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
};




export default About ;