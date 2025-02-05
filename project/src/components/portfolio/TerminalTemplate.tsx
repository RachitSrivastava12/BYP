import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Globe } from 'lucide-react';
import { ArrowRight } from 'lucide-react';
import { Circle } from 'lucide-react';
import { PortfolioData } from '../../types/portfolio';
import Loader from './Loader';

const API = "http://localhost:3000";

type CommandOutput = React.ReactNode | void;
type Commands = {
  [key: string]: () => CommandOutput;
};

export function TerminalTemplate() {
  const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(null);
  const [commandHistory, setCommandHistory] = useState<Array<{ cmd: string; output: React.ReactNode }>>([]);
  const [currentCommand, setCurrentCommand] = useState('');
  const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    fetchPortfolio();
    // Cursor blink effect
    const interval = setInterval(() => {
      setCursorVisible(v => !v);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  const fetchPortfolio = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API}/api/portfolio`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      setPortfolioData(data);
      // Add initial welcome message
      setCommandHistory([{
        cmd: 'welcome',
        output: generateWelcomeMessage(data.basics.name)
      }]);
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

  const generateWelcomeMessage = (name: string) => (
    `Last login: ${new Date().toLocaleDateString()} on ttys000\n` +
    `Welcome to ${name}'s Portfolio Terminal\n` +
    'Type "help" for available commands'
  );

  const handleCommand = (cmd: string) => {
    const commands: Commands = {
      clear: () => {
        setCommandHistory([]);
        return undefined;
      },
      resume: ()=>{
        <p className="text-2xl mb-2">{portfolioData?.basics.name}</p>
      },
      help: () => (
        <div className="text-gray-300">
          Available commands:
          <br />• whoami - Display basic information
          <br />• contact - Show contact details
          <br />• skills - List technical skills
          <br />• projects - View project portfolio
          <br />• education - Show educational background
          <br />• clear - Clear terminal
          <br />• help - Show this help message
          <br />• resume - Shows resume
        </div>
      ),
      whoami: () => (
        <div>
          <p className="text-2xl mb-2">{portfolioData?.basics.name}</p>
          <p className="text-gray-400 mb-2">{portfolioData?.basics.role}</p>
          <p className="text-gray-300">{portfolioData?.basics.bio}</p>
        </div>
      ),
      contact: () => (
        <div className="text-gray-300">
          <p>Email: {portfolioData?.basics.email}</p>
          {portfolioData?.basics.location && <p>Location: {portfolioData.basics.location}</p>}
          <p>GitHub: {portfolioData?.basics.socialLinks.github || 'N/A'}</p>
          <p>LinkedIn: {portfolioData?.basics.socialLinks.linkedin || 'N/A'}</p>
          <p>Twitter: {portfolioData?.basics.socialLinks.twitter || 'N/A'}</p>
        </div>
      ),
      skills: () => (
        <div className="text-gray-300">
          {Object.entries(portfolioData?.skills || {}).map(([category, skills]) => (
            <div key={category} className="mb-4">
              <p className="text-blue-400 mb-1">{category}:</p>
              <div className="pl-4">
                {skills.map((skill, index) => (
                  <p key={index}>→ {skill}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      ),
      projects: () => (
        <div className="text-gray-300">
          {portfolioData?.projects.map((project, index) => (
            <div key={index} className="mb-4">
              <p className="text-blue-400">{project.title}</p>
              <p className="pl-2">{project.description}</p>
              <p className="pl-2 text-gray-400">Tech: {project.technologies.join(', ')}</p>
              {(project.liveUrl || project.githubUrl) && (
                <p className="pl-2">
                  {project.liveUrl && <span>Demo: {project.liveUrl} </span>}
                  {project.githubUrl && <span>Repo: {project.githubUrl}</span>}
                </p>
              )}
            </div>
          ))}
        </div>
      ),
      education: () => (
        <div className="text-gray-300">
          {portfolioData?.education.map((edu, index) => (
            <div key={index} className="mb-4">
              <p className="text-xl text-blue-400">{edu.institution}</p>
              <p>{edu.degree} in {edu.field}</p>
              <p>{edu.duration}</p>
              <p>{edu.location}</p>
            </div>
          ))}
        </div>
      )
    };

    const output = commands[cmd.toLowerCase()]?.() || 'Command not found. Type "help" for available commands.';
    setCommandHistory(prev => [...prev, { cmd, output }]);
    setCurrentCommand('');
  };

  if (!portfolioData) {
    return (
      <Loader />
    );
    
  }

  return (
    <div className="min-h-screen bg-gray-900 p-8 font-mono">
      <Link
        to="/dashboard"
        className="fixed top-6 left-6 flex items-center px-4 py-2 text-gray-300 hover:text-gray-100 transition-colors"
      >
        <ArrowLeft className="h-5 w-5 mr-2" />
        Back to Dashboard       
      </Link>
      <button
            onClick={deployPortfolio}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded mb-8 flex items-center justify-center"
          >
            <Globe className="h-5 w-5 mr-2" />
            Deploy Portfolio 🚀
          </button>
     

      <div className="max-w-4xl mx-auto mt-16">
        {/* Terminal Window */}
        <div className="bg-black rounded-lg overflow-hidden border border-gray-700">
          {/* Terminal Header */}
          <div className="bg-gray-800 px-4 py-2 flex items-center">
            <div className="flex space-x-2">
              <Circle className="h-3 w-3 text-red-500" />
              <Circle className="h-3 w-3 text-yellow-500" />
              <Circle className="h-3 w-3 text-green-500" />
            </div>
            <div className="flex-1 text-center text-gray-400 text-sm">
            {portfolioData?.basics.name}'s Portfolio
            </div>
          </div>

          {/* Terminal Content */}
          <div className="p-4 h-[600px] overflow-y-auto">
            {commandHistory.map((entry, index) => (
              <div key={index} className="mb-4">
                <p className="text-gray-300">
                  <span className="text-green-400">visitor@portfolio</span>
                  <span className="text-gray-500">:</span>
                  <span className="text-blue-400">~</span>
                  <span className="text-gray-500">$ </span>
                  {entry.cmd}
                </p>
                <div className="mt-2">{entry.output}</div>
              </div>
            ))}
            
            {/* Current Command Line */}
            <div className="flex">
              <span className="text-green-400">visitor@portfolio</span>
              <span className="text-gray-500">:</span>
              <span className="text-blue-400">~</span>
              <span className="text-gray-500">$ </span>
              <input
                type="text"
                value={currentCommand}
                onChange={(e) => setCurrentCommand(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && currentCommand.trim()) {
                    handleCommand(currentCommand.trim());
                  }
                }}
                className="flex-1 bg-transparent text-gray-300 outline-none ml-2"
                autoFocus
              />
              <span className={`text-gray-300 ${cursorVisible ? 'opacity-100' : 'opacity-0'}`}>
                ▊
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TerminalTemplate;