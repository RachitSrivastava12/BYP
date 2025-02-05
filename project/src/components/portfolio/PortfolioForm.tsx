import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePortfolioStore } from '../../store/portfolioStore';
import { PortfolioData } from '../../types/portfolio';
import { Save, Plus, Trash2, Link, Image, Github, Linkedin, Twitter } from 'lucide-react';
import { SkillsSection } from './sections/SkillsSection';
import { EducationSection } from './sections/EducationSection';
import { TemplateSelector } from './TemplateSelector';

const API = "https://byp-1.onrender.com";


export function PortfolioForm() {
  const navigate = useNavigate();
  const setPortfolioData = usePortfolioStore((state) => state.setPortfolioData);
  const [formData, setFormData] = useState<PortfolioData>({
    // ... the rest of the state remains the same
    basics: {
      name: '',
      role: '',
      bio: '',
      email: '',
      location: '',
      avatar: '',
      resumeUrl: '',
      socialLinks: {},
    },
    skills: {
      languages: [],
      databases: [],
      frameworks: [],
      tools: [],
    },
    projects: [],
    experience: [],
    education: [],
    selectedTemplate: 'modern',
  });
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await savePortfolio();
    navigate(`/preview?template=${formData.selectedTemplate}`);
  };  

  
// const savePortfolio = async () => {
//   try {
//     const token = localStorage.getItem('token');
//     console.log(token);
//     const userId = localStorage.getItem('userId');
//     console
//     const response = await fetch(`${API}/api/portfolio`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${token}`,
//       },
//       body: JSON.stringify({ data: formData }),
//     });
//     const data = await response.json();
//     if (response.ok) {
//       setPortfolioData(formData);
//       console.log(data.message);
//     } else {
//       console.error('Error saving portfolio:', data.message);
//     }
//   } catch (error) {
//     console.error('Error saving portfolio:', error);
//   }
// };


const savePortfolio = async () => {
  try {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    console.log('Saving portfolio for userId:', userId); // Debug log

    const response = await fetch(`${API}/api/portfolio`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ 
        data: formData,
        userId: userId // Make sure userId is included if needed by your backend
      }),
    });

    const data = await response.json();
    
    if (response.ok) {
      setPortfolioData(formData);
      console.log('Portfolio saved successfully:', data.message);
    } else {
      console.error('Error saving portfolio:', data.message);
    }
  } catch (error) {
    console.error('Error saving portfolio:', error);
  }
};



  const addProject = () => {
    setFormData({
      ...formData,
      projects: [
        ...formData.projects,
        {
          title: '',
          description: '',
          technologies: [],
          imageUrl: '',
          liveUrl: '',
          githubUrl: '',
        },
      ],
    });
  };

  const removeProject = (index: number) => {
    const newProjects = formData.projects.filter((_, i) => i !== index);
    setFormData({ ...formData, projects: newProjects });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6 space-y-8">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-6">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              placeholder="Full Name"
              className="input-field"
              value={formData.basics.name}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  basics: { ...formData.basics, name: e.target.value },
                })
              }
              required
            />
            <input
              type="text"
              placeholder="Professional Role"
              className="input-field"
              value={formData.basics.role}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  basics: { ...formData.basics, role: e.target.value },
                })
              }
              required
            />
            <input
              type="email"
              placeholder="Email"
              className="input-field"
              value={formData.basics.email}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  basics: { ...formData.basics, email: e.target.value },
                })
              }
              required
            />
            <input
              type="text"
              placeholder="Location"
              className="input-field"
              value={formData.basics.location}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  basics: { ...formData.basics, location: e.target.value },
                })
              }
            />
            <input
              type="url"
              placeholder="Avatar URL"
              className="input-field"
              value={formData.basics.avatar}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  basics: { ...formData.basics, avatar: e.target.value },
                })
              }
            />
            <input
              type="url"
              placeholder="Resume URL"
              className="input-field"
              value={formData.basics.resumeUrl}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  basics: { ...formData.basics, resumeUrl: e.target.value },
                })
              }
            />
            <textarea
              placeholder="Bio"
              className="input-field col-span-2"
              value={formData.basics.bio}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  basics: { ...formData.basics, bio: e.target.value },
                })
              }
              required
            />
          </div>

          <div className="mt-6 space-y-4">
            <h3 className="text-lg font-semibold">Social Links</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Github className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="url"
                  placeholder="GitHub URL"
                  className="input-field pl-10"
                  value={formData.basics.socialLinks.github || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      basics: {
                        ...formData.basics,
                        socialLinks: {
                          ...formData.basics.socialLinks,
                          github: e.target.value,
                        },
                      },
                    })
                  }
                />
              </div>
              <div className="relative">
                <Linkedin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="url"
                  placeholder="LinkedIn URL"
                  className="input-field pl-10"
                  value={formData.basics.socialLinks.linkedin || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      basics: {
                        ...formData.basics,
                        socialLinks: {
                          ...formData.basics.socialLinks,
                          linkedin: e.target.value,
                        },
                      },
                    })
                  }
                />
              </div>
              <div className="relative">
                <Twitter className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="url"
                  placeholder="Twitter URL"
                  className="input-field pl-10"
                  value={formData.basics.socialLinks.twitter || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      basics: {
                        ...formData.basics,
                        socialLinks: {
                          ...formData.basics.socialLinks,
                          twitter: e.target.value,
                        },
                      },
                    })
                  }
                />
              </div>
            </div>
          </div>
        </div>

        <SkillsSection
          skills={formData.skills}
          onChange={(skills) => setFormData({ ...formData, skills })}
        />

        <EducationSection
          education={formData.education}
          onChange={(education) => setFormData({ ...formData, education })}
        />

        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Projects</h2>
            <button
              type="button"
              onClick={addProject}
              className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add Project
            </button>
          </div>
          
          <div className="space-y-6">
            {formData.projects.map((project, index) => (
              <div key={index} className="border rounded-lg p-4 relative">
                <button
                  type="button"
                  onClick={() => removeProject(index)}
                  className="absolute top-4 right-4 text-red-500 hover:text-red-700 transition-colors"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Project Title"
                    className="input-field"
                    value={project.title}
                    onChange={(e) => {
                      const newProjects = [...formData.projects];
                      newProjects[index] = {
                        ...project,
                        title: e.target.value,
                      };
                      setFormData({ ...formData, projects: newProjects });
                    }}
                    required
                  />
                  <input
                    type="text"
                    placeholder="Technologies (comma-separated)"
                    className="input-field"
                    value={project.technologies.join(', ')}
                    onChange={(e) => {
                      const newProjects = [...formData.projects];
                      newProjects[index] = {
                        ...project,
                        technologies: e.target.value.split(',').map((t) => t.trim()),
                      };
                      setFormData({ ...formData, projects: newProjects });
                    }}
                    required
                  />
                  <div className="relative">
                    <Image className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="url"
                      placeholder="Project Image URL"
                      className="input-field pl-10"
                      value={project.imageUrl}
                      onChange={(e) => {
                        const newProjects = [...formData.projects];
                        newProjects[index] = {
                          ...project,
                          imageUrl: e.target.value,
                        };
                        setFormData({ ...formData, projects: newProjects });
                      }}
                    />
                  </div>
                  <div className="relative">
                    <Link className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="url"
                      placeholder="Live Demo URL"
                      className="input-field pl-10"
                      value={project.liveUrl}
                      onChange={(e) => {
                        const newProjects = [...formData.projects];
                        newProjects[index] = {
                          ...project,
                          liveUrl: e.target.value,
                        };
                        setFormData({ ...formData, projects: newProjects });
                      }}
                    />
                  </div>
                  <div className="relative col-span-2">
                    <Github className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="url"
                      placeholder="GitHub Repository URL"
                      className="input-field pl-10"
                      value={project.githubUrl}
                      onChange={(e) => {
                        const newProjects = [...formData.projects];
                        newProjects[index] = {
                          ...project,
                          githubUrl: e.target.value,
                        };
                        setFormData({ ...formData, projects: newProjects });
                      }}
                    />
                  </div>
                  <textarea
                    placeholder="Project Description"
                    className="input-field col-span-2"
                    value={project.description}
                    onChange={(e) => {
                      const newProjects = [...formData.projects];
                      newProjects[index] = {
                        ...project,
                        description: e.target.value,
                      };
                      setFormData({ ...formData, projects: newProjects });
                    }}
                    required
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <TemplateSelector
          selectedTemplate={formData.selectedTemplate}
          onChange={(template) => setFormData({ ...formData, selectedTemplate: template })}
        />

        <button
          type="submit"
          className="fixed bottom-6 right-6 flex items-center px-6 py-3 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 transition-colors"
        >
          <Save className="h-5 w-5 mr-2" />
          Generate Portfolio
        </button>
      </form>
    </div>
  );
}






























