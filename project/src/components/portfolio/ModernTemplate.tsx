import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Twitter, Globe, Mail, MapPin, ArrowLeft, FileText } from 'lucide-react';
import { PortfolioData } from '../../types/portfolio';

const API = "http://localhost:3000";

export function ModernTemplate() {
 
  const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(null);

  useEffect(() => {
    fetchPortfolio();
  }, []);

  // const fetchPortfolio = async () => {
  //   try {
  //     const token = localStorage.getItem('token');
  //     const response = await fetch(`${API}/api/portfolio/:id`, {
  //       headers: {
  //         'Authorization': `Bearer ${token}`,
  //       },
  //     });
  //     const data = await response.json();
  //     setPortfolioData(data);
  //   } catch (error) {
  //     console.error('Error fetching portfolio:', error);
  //   }
  // };
  const fetchPortfolio = async () => {
    try {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId'); // Get userId from localStorage
      
      const response = await fetch(`${API}/api/portfolio`, {  // Remove the :id
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setPortfolioData(data);
      console.log('Fetched portfolio:', data); // Add this for debugging
    } catch (error) {
      console.error('Error fetching portfolio:', error);
    }
  };

  const deployPortfolio = async () => {
    try {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');
      
      const response = await fetch(`${API}/api/portfolio/${userId}/deploy`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Deployment successful:', data.url);
      alert(`Your portfolio has been deployed! Visit: ${data.url}`);
    } catch (error) {
      console.error('Error deploying portfolio:', error);
      alert('Failed to deploy portfolio. Please try again.');
    }
  };

  if (!portfolioData) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">No portfolio data available</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Link
        to="/dashboard"
        className="fixed top-6 left-6 flex items-center px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
      >
        <ArrowLeft className="h-5 w-5 mr-2" />
        Back to Editor
      </Link>

       <button
                  onClick={deployPortfolio}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded mb-8 flex items-center justify-center"
                >
                  <Globe className="h-5 w-5 mr-2" />
                  Deploy Portfolio 🚀
                </button>
      

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
          <div className="text-center">
            {portfolioData.basics.avatar && (
              <img
                src={portfolioData.basics.avatar}
                alt={portfolioData.basics.name}
                className="w-32 h-32 rounded-full mx-auto mb-8 border-4 border-white shadow-lg"
              />
            )}
            <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl">
              {portfolioData.basics.name}
            </h1>
            <p className="mt-3 text-xl">{portfolioData.basics.role}</p>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-100">
              {portfolioData.basics.bio}
            </p>
            <div className="mt-6 flex justify-center space-x-4">
              {portfolioData.basics.location && (
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 mr-1" />
                  <span>{portfolioData.basics.location}</span>
                </div>
              )}
              <div className="flex items-center">
                <Mail className="h-5 w-5 mr-1" />
                <span>{portfolioData.basics.email}</span>
              </div>
            </div>
            <div className="mt-8 flex justify-center space-x-6">
              {portfolioData.basics.resumeUrl && (
                <a
                  href={portfolioData.basics.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-white hover:text-gray-200 transition-colors"
                >
                  <FileText className="h-6 w-6 mr-2" />
                  Resume
                </a>
              )}
              {portfolioData.basics.socialLinks.github && (
                <a
                  href={portfolioData.basics.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-gray-200 transition-colors"
                >
                  <Github className="h-6 w-6" />
                </a>
              )}
              {portfolioData.basics.socialLinks.linkedin && (
                <a
                  href={portfolioData.basics.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-gray-200 transition-colors"
                >
                  <Linkedin className="h-6 w-6" />
                </a>
              )}
              {portfolioData.basics.socialLinks.twitter && (
                <a
                  href={portfolioData.basics.socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-gray-200 transition-colors"
                >
                  <Twitter className="h-6 w-6" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Skills Section */}
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Skills</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {Object.entries(portfolioData.skills).map(([category, skills]) => (
            <div key={category} className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4 capitalize">{category}</h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Education Section */}
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 bg-gray-50">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Education</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {portfolioData.education.map((edu, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-900">{edu.institution}</h3>
              <p className="text-lg text-gray-700 mt-2">
                {edu.degree} in {edu.field}
              </p>
              <div className="mt-4 text-gray-600">
                <p>{edu.duration}</p>
                <p>{edu.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Projects Section */}
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioData.projects.map((project, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              {project.imageUrl && (
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-gray-600 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                {(project.liveUrl || project.githubUrl) && (
                  <div className="flex space-x-4">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors"
                      >
                        <Globe className="h-4 w-4 mr-1" />
                        Live Demo
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors"
                      >
                        <Github className="h-4 w-4 mr-1" />
                        View Code
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

  // The rest of the component remains the same, but you can add a button or link to call the deployPortfolio function




