// // SidebarTemplate.tsx
// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { Github, Linkedin, Twitter, Globe, Mail, MapPin, ArrowLeft, FileText } from 'lucide-react';
// import { PortfolioData } from '../../types/portfolio';



// const API = "http://localhost:3000";
// export function SidebarTemplate() {
//   const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(null);

//   useEffect(() => {
//     fetchPortfolio();
//   }, []);

//   // const fetchPortfolio = async () => {
//   //   try {
//   //     const token = localStorage.getItem('token');
//   //     const response = await fetch('/api/portfolio/123456', {
//   //       headers: {
//   //         'Authorization': `Bearer ${token}`,
//   //       },
//   //     });
//   //     const data = await response.json();
//   //     setPortfolioData(data);
//   //   } catch (error) {
//   //     console.error('Error fetching portfolio:', error);
//   //   }
//   // };

//   const fetchPortfolio = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const userId = localStorage.getItem('userId'); // Get userId from localStorage
      
//       const response = await fetch(`${API}/api/portfolio`, {  // Remove the :id
//         headers: {
//           'Authorization': `Bearer ${token}`,
//         },
//       });
  
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
      
//       const data = await response.json();
//       setPortfolioData(data);
//       console.log('Fetched portfolio:', data); // Add this for debugging
//     } catch (error) {
//       console.error('Error fetching portfolio:', error);
//     }
//   };

//   if (!portfolioData) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <p className="text-gray-500">Loading portfolio data...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       {/* Fixed Sidebar */}
//       <div className="fixed w-64 h-screen bg-gray-900 text-white overflow-y-auto">
//         <div className="p-6">
//           <Link
//             to="/dashboard"
//             className="flex items-center text-gray-300 hover:text-white mb-8"
//           >
//             <ArrowLeft className="h-5 w-5 mr-2" />
//             Back
//           </Link>

//           {portfolioData.basics.avatar && (
//             <img
//               src={portfolioData.basics.avatar}
//               alt={portfolioData.basics.name}
//               className="w-32 h-32 rounded-full mx-auto mb-4 border-2 border-gray-700"
//             />
//           )}
          
//           <h1 className="text-2xl font-bold text-center mb-2">{portfolioData.basics.name}</h1>
//           <p className="text-gray-400 text-center mb-4">{portfolioData.basics.role}</p>
          
//           <div className="space-y-6">
//             <div className="flex items-center text-gray-300">
//               <Mail className="h-4 w-4 mr-2" />
//               <span className="text-sm">{portfolioData.basics.email}</span>
//             </div>
//             {portfolioData.basics.location && (
//               <div className="flex items-center text-gray-300">
//                 <MapPin className="h-4 w-4 mr-2" />
//                 <span className="text-sm">{portfolioData.basics.location}</span>
//               </div>
//             )}
//           </div>

//           <div className="mt-8 flex justify-center space-x-4">
//             {portfolioData.basics.socialLinks.github && (
//               <a
//                 href={portfolioData.basics.socialLinks.github}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-gray-400 hover:text-white"
//               >
//                 <Github className="h-5 w-5" />
//               </a>
//             )}
//             {portfolioData.basics.socialLinks.linkedin && (
//               <a
//                 href={portfolioData.basics.socialLinks.linkedin}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-gray-400 hover:text-white"
//               >
//                 <Linkedin className="h-5 w-5" />
//               </a>
//             )}
//             {portfolioData.basics.socialLinks.twitter && (
//               <a
//                 href={portfolioData.basics.socialLinks.twitter}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-gray-400 hover:text-white"
//               >
//                 <Twitter className="h-5 w-5" />
//               </a>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="ml-64 flex-1 p-8">
//         <div className="max-w-4xl">
//           {/* About Section */}
//           <section className="mb-12">
//             <h2 className="text-3xl font-bold mb-6">About Me</h2>
//             <p className="text-gray-600 leading-relaxed">{portfolioData.basics.bio}</p>
//           </section>

//           {/* Skills Section */}
//           <section className="mb-12">
//             <h2 className="text-3xl font-bold mb-6">Skills</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {Object.entries(portfolioData.skills).map(([category, skills]) => (
//                 <div key={category} className="bg-white rounded-lg p-6 shadow-sm">
//                   <h3 className="text-xl font-semibold mb-4 capitalize">{category}</h3>
//                   <div className="flex flex-wrap gap-2">
//                     {skills.map((skill, index) => (
//                       <span
//                         key={index}
//                         className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700"
//                       >
//                         {skill}
//                       </span>
//                     ))}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </section>

//           {/* Projects Section */}
//           <section className="mb-12">
//             <h2 className="text-3xl font-bold mb-6">Projects</h2>
//             <div className="grid grid-cols-1 gap-6">
//               {portfolioData.projects.map((project, index) => (
//                 <div key={index} className="bg-white rounded-lg shadow-sm p-6">
//                   <div className="flex justify-between items-start">
//                     <div>
//                       <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
//                       <p className="text-gray-600 mb-4">{project.description}</p>
//                     </div>
//                     {project.imageUrl && (
//                       <img
//                         src={project.imageUrl}
//                         alt={project.title}
//                         className="w-32 h-32 object-cover rounded-lg"
//                       />
//                     )}
//                   </div>
//                   <div className="flex flex-wrap gap-2 mb-4">
//                     {project.technologies.map((tech, techIndex) => (
//                       <span
//                         key={techIndex}
//                         className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700"
//                       >
//                         {tech}
//                       </span>
//                     ))}
//                   </div>
//                   <div className="flex space-x-4">
//                     {project.liveUrl && (
//                       <a
//                         href={project.liveUrl}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="flex items-center text-indigo-600 hover:text-indigo-800"
//                       >
//                         <Globe className="h-4 w-4 mr-1" />
//                         Live Demo
//                       </a>
//                     )}
//                     {project.githubUrl && (
//                       <a
//                         href={project.githubUrl}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="flex items-center text-indigo-600 hover:text-indigo-800"
//                       >
//                         <Github className="h-4 w-4 mr-1" />
//                         View Code
//                       </a>
//                     )}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </section>

//           {/* Education Section */}
//           <section className="mb-12">
//             <h2 className="text-3xl font-bold mb-6">Education</h2>
//             <div className="grid grid-cols-1 gap-6">
//               {portfolioData.education.map((edu, index) => (
//                 <div key={index} className="bg-white rounded-lg shadow-sm p-6">
//                   <h3 className="text-xl font-semibold mb-2">{edu.institution}</h3>
//                   <p className="text-lg text-gray-700 mb-2">
//                     {edu.degree} in {edu.field}
//                   </p>
//                   <div className="text-gray-600">
//                     <p>{edu.duration}</p>
//                     <p>{edu.location}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </section>
//         </div>
//       </div>
//     </div>
//   );
// }


import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Twitter, Globe, Mail, MapPin, ArrowLeft, FileText } from 'lucide-react';
import { PortfolioData } from '../../types/portfolio';
const { createDeployment } = require('@vercel/client');

const API = "https://byp-1.onrender.com";

export function SidebarTemplate() {
  const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(null);

  useEffect(() => {
    fetchPortfolio();
  }, []);

  const fetchPortfolio = async () => {
    try {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');
      
      const response = await fetch(`${API}/api/portfolio`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setPortfolioData(data);
      console.log('Fetched portfolio:', data);
    } catch (error) {
      console.error('Error fetching portfolio:', error);
    }
  };

  const deployPortfolio = async () => {
    try {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');
      
      // Show initial status to user
      alert('Starting portfolio deployment...');
      
      const response = await fetch(`${API}/api/portfolio/${userId}/deploy`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      
      // Show success message with the URL
      const deployMessage = `Portfolio deployed successfully!\n\nVisit your portfolio at: ${data.url}`;
      alert(deployMessage);
      
      // Optionally open the portfolio in a new tab
      if (confirm('Would you like to open your portfolio in a new tab?')) {
        window.open(data.url, '_blank');
      }
  
    } catch (error) {
      console.error('Error deploying portfolio:', error);
      alert('Failed to deploy portfolio. Please try again.');
    }
  };

  if (!portfolioData) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">Loading portfolio data...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Fixed Sidebar */}
      <div className="fixed w-64 h-screen bg-gray-900 text-white overflow-y-auto">
        <div className="p-6">
          <Link
            to="/dashboard"
            className="flex items-center text-gray-300 hover:text-white mb-4"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back
          </Link>

          <button
            onClick={deployPortfolio}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded mb-8 flex items-center justify-center"
          >
            <Globe className="h-5 w-5 mr-2" />
            Deploy Portfolio 🚀
          </button>

          {portfolioData.basics.avatar && (
            <img
              src={portfolioData.basics.avatar}
              alt={portfolioData.basics.name}
              className="w-32 h-32 rounded-full mx-auto mb-4 border-2 border-gray-700"
            />
          )}
          
          <h1 className="text-2xl font-bold text-center mb-2">{portfolioData.basics.name}</h1>
          <p className="text-gray-400 text-center mb-4">{portfolioData.basics.role}</p>
          
          <div className="space-y-6">
            <div className="flex items-center text-gray-300">
              <Mail className="h-4 w-4 mr-2" />
              <span className="text-sm">{portfolioData.basics.email}</span>
            </div>
            {portfolioData.basics.location && (
              <div className="flex items-center text-gray-300">
                <MapPin className="h-4 w-4 mr-2" />
                <span className="text-sm">{portfolioData.basics.location}</span>
              </div>
            )}
          </div>

          <div className="mt-8 flex justify-center space-x-4">
            {portfolioData.basics.socialLinks.github && (
              <a
                href={portfolioData.basics.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                <Github className="h-5 w-5" />
              </a>
            )}
            {portfolioData.basics.socialLinks.linkedin && (
              <a
                href={portfolioData.basics.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            )}
            {portfolioData.basics.socialLinks.twitter && (
              <a
                href={portfolioData.basics.socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                <Twitter className="h-5 w-5" />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64 flex-1 p-8">
        <div className="max-w-4xl">
          {/* About Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">About Me</h2>
            <p className="text-gray-600 leading-relaxed">{portfolioData.basics.bio}</p>
          </section>

          {/* Skills Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Skills</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(portfolioData.skills).map(([category, skills]) => (
                <div key={category} className="bg-white rounded-lg p-6 shadow-sm">
                  <h3 className="text-xl font-semibold mb-4 capitalize">{category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Projects Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Projects</h2>
            <div className="grid grid-cols-1 gap-6">
              {portfolioData.projects.map((project, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                      <p className="text-gray-600 mb-4">{project.description}</p>
                    </div>
                    {project.imageUrl && (
                      <img
                        src={project.imageUrl}
                        alt={project.title}
                        className="w-32 h-32 object-cover rounded-lg"
                      />
                    )}
                  </div>
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
                  <div className="flex space-x-4">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-indigo-600 hover:text-indigo-800"
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
                        className="flex items-center text-indigo-600 hover:text-indigo-800"
                      >
                        <Github className="h-4 w-4 mr-1" />
                        View Code
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Education Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Education</h2>
            <div className="grid grid-cols-1 gap-6">
              {portfolioData.education.map((edu, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-xl font-semibold mb-2">{edu.institution}</h3>
                  <p className="text-lg text-gray-700 mb-2">
                    {edu.degree} in {edu.field}
                  </p>
                  <div className="text-gray-600">
                    <p>{edu.duration}</p>
                    <p>{edu.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}