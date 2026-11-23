'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function AdminPanel({ onClose }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [projects, setProjects] = useState([]);
  const [sha, setSha] = useState('');

  // Handle Authentication
  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/projects');
      if (!res.ok) throw new Error('Failed to fetch projects');
      
      const data = await res.json();
      setProjects(data.projects);
      setSha(data.sha);
      
      // We don't authenticate with the backend until we actually save,
      // but we use the PIN to let them in and keep it for the save request.
      setIsAuthenticated(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Saving Projects
  const handleSave = async () => {
    setIsLoading(true);
    setError('');

    try {
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin, projects, sha }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to save');
      }

      alert('Projects successfully updated! Vercel will now redeploy.');
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const addProject = () => {
    setProjects([
      {
        title: 'New Project',
        description: '',
        tags: [],
        github: '',
        demo: '',
        livePreview: '',
        image: '',
        featured: false,
      },
      ...projects,
    ]);
  };

  const updateProject = (index, field, value) => {
    const updated = [...projects];
    if (field === 'tags') {
      updated[index][field] = value.split(',').map(t => t.trim()).filter(Boolean);
    } else if (field === 'featured') {
      updated[index][field] = value;
    } else {
      updated[index][field] = value;
    }
    setProjects(updated);
  };

  const removeProject = (index) => {
    setProjects(projects.filter((_, i) => i !== index));
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-4xl max-h-[90vh] bg-dark-card border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
      >
        {!isAuthenticated ? (
          <div className="p-8 text-center m-auto max-w-sm w-full">
            <h2 className="text-2xl font-bold mb-6 text-white">Admin Access</h2>
            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="password"
                placeholder="Enter PIN"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                className="w-full px-4 py-3 bg-dark-bg border border-white/10 rounded-lg text-white focus:outline-none focus:border-neon-purple text-center tracking-[0.5em] font-mono text-xl"
                autoFocus
              />
              {error && <p className="text-red-400 text-sm">{error}</p>}
              <button 
                type="submit"
                disabled={isLoading || !pin}
                className="w-full py-3 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
              >
                {isLoading ? 'Loading...' : 'Enter'}
              </button>
            </form>
          </div>
        ) : (
          <>
            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-dark-bg sticky top-0 z-10">
              <h2 className="text-2xl font-bold text-white">Manage Projects</h2>
              <div className="flex gap-4">
                <button 
                  onClick={addProject}
                  className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
                >
                  + Add Project
                </button>
                <button 
                  onClick={handleSave}
                  disabled={isLoading}
                  className="px-4 py-2 bg-neon-purple text-white font-bold rounded-lg hover:bg-neon-purple/80 transition-colors disabled:opacity-50"
                >
                  {isLoading ? 'Saving...' : 'Save & Deploy'}
                </button>
              </div>
            </div>

            <div className="p-6 overflow-y-auto space-y-8 flex-1">
              {error && <div className="p-4 bg-red-500/20 text-red-300 rounded-lg">{error}</div>}
              
              {projects.map((project, i) => (
                <div key={i} className="p-6 border border-white/10 rounded-xl bg-white/5 space-y-4 relative group">
                  <button 
                    onClick={() => removeProject(i)}
                    className="absolute top-4 right-4 p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/40 opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Remove Project"
                  >
                    Remove
                  </button>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-gray-400 mb-1">Title</label>
                      <input 
                        value={project.title} 
                        onChange={(e) => updateProject(i, 'title', e.target.value)}
                        className="w-full px-3 py-2 bg-dark-bg border border-white/10 rounded text-white text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-400 mb-1">Tags (comma separated)</label>
                      <input 
                        value={project.tags.join(', ')} 
                        onChange={(e) => updateProject(i, 'tags', e.target.value)}
                        className="w-full px-3 py-2 bg-dark-bg border border-white/10 rounded text-white text-sm font-mono"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-xs text-gray-400 mb-1">Description</label>
                      <textarea 
                        value={project.description} 
                        onChange={(e) => updateProject(i, 'description', e.target.value)}
                        className="w-full px-3 py-2 bg-dark-bg border border-white/10 rounded text-white text-sm h-24"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-400 mb-1">Live Preview URL (iframe)</label>
                      <input 
                        value={project.livePreview || ''} 
                        onChange={(e) => updateProject(i, 'livePreview', e.target.value)}
                        className="w-full px-3 py-2 bg-dark-bg border border-white/10 rounded text-white text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-400 mb-1">Image URL (fallback)</label>
                      <input 
                        value={project.image || ''} 
                        onChange={(e) => updateProject(i, 'image', e.target.value)}
                        className="w-full px-3 py-2 bg-dark-bg border border-white/10 rounded text-white text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-400 mb-1">Demo URL (button link)</label>
                      <input 
                        value={project.demo || ''} 
                        onChange={(e) => updateProject(i, 'demo', e.target.value)}
                        className="w-full px-3 py-2 bg-dark-bg border border-white/10 rounded text-white text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-400 mb-1">GitHub URL</label>
                      <input 
                        value={project.github || ''} 
                        onChange={(e) => updateProject(i, 'github', e.target.value)}
                        className="w-full px-3 py-2 bg-dark-bg border border-white/10 rounded text-white text-sm"
                      />
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <input 
                        type="checkbox"
                        checked={project.featured}
                        onChange={(e) => updateProject(i, 'featured', e.target.checked)}
                        id={`featured-${i}`}
                      />
                      <label htmlFor={`featured-${i}`} className="text-sm text-white">Featured Project</label>
                    </div>
                  </div>
                </div>
              ))}
              {projects.length === 0 && <p className="text-gray-500 text-center py-8">No projects found. Add one above.</p>}
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
}
