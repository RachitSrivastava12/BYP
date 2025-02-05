import React from 'react';
import { Layout } from 'lucide-react';
import clsx from 'clsx';

interface TemplateSelectorProps {
  selectedTemplate: 'modern' | 'minimal' | 'creative';
  onChange: (template: 'modern' | 'minimal' | 'creative') => void;
}

export function TemplateSelector({ selectedTemplate, onChange }: TemplateSelectorProps) {
  const templates = [
    {
      id: 'modern',
      name: 'Basic-clear',
      description: 'Clean and professional design with a focus on visual hierarchy',
    },
    {
      id: 'minimal',
      name: 'Side-navbar',
      description: 'Simple and elegant design that puts content first',
    },
    {
      id: 'creative',
      name: 'Terminal-Theme',
      description: 'Bold and unique design for creative professionals',
    },
  ] as const;

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <div className="flex items-center mb-6">
        <Layout className="h-6 w-6 mr-2 text-indigo-600" />
        <h2 className="text-2xl font-bold">Choose Template</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {templates.map((template) => (
          <button
            key={template.id}
            onClick={() => onChange(template.id)}
            className={clsx(
              'p-4 rounded-lg border-2 text-left transition-all',
              selectedTemplate === template.id
                ? 'border-indigo-600 bg-indigo-50'
                : 'border-gray-200 hover:border-indigo-300'
            )}
          >
            <h3 className="font-semibold text-lg mb-2">{template.name}</h3>
            <p className="text-sm text-gray-600">{template.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
}