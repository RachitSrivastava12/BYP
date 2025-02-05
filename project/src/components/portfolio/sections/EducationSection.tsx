import React from 'react';
import { GraduationCap, Plus, Trash2 } from 'lucide-react';

interface Education {
  institution: string;
  degree: string;
  field: string;
  duration: string;
  location: string;
}

interface EducationSectionProps {
  education: Education[];
  onChange: (education: Education[]) => void;
}

export function EducationSection({ education, onChange }: EducationSectionProps) {
  const addEducation = () => {
    onChange([
      ...education,
      {
        institution: '',
        degree: '',
        field: '',
        duration: '',
        location: '',
      },
    ]);
  };

  const removeEducation = (index: number) => {
    onChange(education.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Education</h2>
        <button
          type="button"
          onClick={addEducation}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Education
        </button>
      </div>

      <div className="space-y-6">
        {education.map((edu, index) => (
          <div key={index} className="border rounded-lg p-4 relative">
            <button
              type="button"
              onClick={() => removeEducation(index)}
              className="absolute top-4 right-4 text-red-500 hover:text-red-700 transition-colors"
            >
              <Trash2 className="h-5 w-5" />
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <GraduationCap className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Institution"
                  className="input-field pl-10"
                  value={edu.institution}
                  onChange={(e) => {
                    const newEducation = [...education];
                    newEducation[index] = {
                      ...edu,
                      institution: e.target.value,
                    };
                    onChange(newEducation);
                  }}
                  required
                />
              </div>
              <input
                type="text"
                placeholder="Degree"
                className="input-field"
                value={edu.degree}
                onChange={(e) => {
                  const newEducation = [...education];
                  newEducation[index] = {
                    ...edu,
                    degree: e.target.value,
                  };
                  onChange(newEducation);
                }}
                required
              />
              <input
                type="text"
                placeholder="Field of Study"
                className="input-field"
                value={edu.field}
                onChange={(e) => {
                  const newEducation = [...education];
                  newEducation[index] = {
                    ...edu,
                    field: e.target.value,
                  };
                  onChange(newEducation);
                }}
                required
              />
              <input
                type="text"
                placeholder="Duration (e.g., 2018 - 2022)"
                className="input-field"
                value={edu.duration}
                onChange={(e) => {
                  const newEducation = [...education];
                  newEducation[index] = {
                    ...edu,
                    duration: e.target.value,
                  };
                  onChange(newEducation);
                }}
                required
              />
              <input
                type="text"
                placeholder="Location"
                className="input-field"
                value={edu.location}
                onChange={(e) => {
                  const newEducation = [...education];
                  newEducation[index] = {
                    ...edu,
                    location: e.target.value,
                  };
                  onChange(newEducation);
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}