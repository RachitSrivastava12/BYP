import React from 'react';
import { Code, Database, Layout, Wrench } from 'lucide-react';

interface SkillsSectionProps {
  skills: {
    languages: string[];
    databases: string[];
    frameworks: string[];
    tools: string[];
  };
  onChange: (skills: {
    languages: string[];
    databases: string[];
    frameworks: string[];
    tools: string[];
  }) => void;
}

export function SkillsSection({ skills, onChange }: SkillsSectionProps) {
  const handleSkillChange = (
    category: 'languages' | 'databases' | 'frameworks' | 'tools',
    value: string
  ) => {
    onChange({
      ...skills,
      [category]: value.split(',').map((skill) => skill.trim()),
    });
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6">Skills</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="relative">
            <Code className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Programming Languages (comma-separated)"
              className="input-field pl-10"
              value={skills.languages.join(', ')}
              onChange={(e) => handleSkillChange('languages', e.target.value)}
            />
          </div>
          <div className="relative">
            <Database className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Databases (comma-separated)"
              className="input-field pl-10"
              value={skills.databases.join(', ')}
              onChange={(e) => handleSkillChange('databases', e.target.value)}
            />
          </div>
        </div>
        <div className="space-y-4">
          <div className="relative">
            <Layout className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Frameworks (comma-separated)"
              className="input-field pl-10"
              value={skills.frameworks.join(', ')}
              onChange={(e) => handleSkillChange('frameworks', e.target.value)}
            />
          </div>
          <div className="relative">
            <Wrench className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Tools & Technologies (comma-separated)"
              className="input-field pl-10"
              value={skills.tools.join(', ')}
              onChange={(e) => handleSkillChange('tools', e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
