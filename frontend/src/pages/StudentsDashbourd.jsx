import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FolderGit2, Users, PlusCircle, Search, 
  ExternalLink, Edit3, Clock, Globe, 
  Camera, Image as ImageIcon, X, ChevronRight,
  Code
} from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Navbar from '../components/Navbar';

// Mock Data
const INITIAL_MY_PROJECTS = [
  {
    id: 1,
    title: 'Nexus - Social Platform',
    description: 'A modern social networking platform built with React and Node.js. Features real-time chat and AI content moderation.',
    technologies: ['React', 'Node.js', 'Socket.io', 'MongoDB'],
    demoLink: 'https://nexus-demo.app',
    coverImage: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop',
    screenshots: [],
    status: 'Public'
  },
  {
    id: 2,
    title: 'Aura - Health Tracker',
    description: 'Personal health tracking application that integrates with wearable devices.',
    technologies: ['React Native', 'Firebase', 'HealthKit'],
    demoLink: 'https://aura-health.app',
    coverImage: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1000&auto=format&fit=crop',
    screenshots: [],
    status: 'Private / Pending Admin Approval'
  }
];

const INITIAL_PEER_PROJECTS = [
  {
    id: 3,
    title: 'Lumina Dashboard',
    description: 'Analytics dashboard for SaaS companies to track user engagement and retention metrics.',
    technologies: ['Vue.js', 'D3.js', 'PostgreSQL'],
    demoLink: 'https://lumina-dash.io',
    coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop',
    studentName: 'Alex Chen',
    status: 'Public'
  },
  {
    id: 4,
    title: 'Nova E-Commerce',
    description: 'Headless e-commerce storefront with blazing fast performance and SEO optimization.',
    technologies: ['Next.js', 'Tailwind CSS', 'Stripe'],
    demoLink: 'https://nova-store.dev',
    coverImage: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1000&auto=format&fit=crop',
    studentName: 'Sarah Jenkins',
    status: 'Public'
  }
];

const StudentsDashbourd = () => {
  const [activeTab, setActiveTab] = useState('portfolio'); // 'portfolio', 'showcase'
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  
  const [myProjects, setMyProjects] = useState([]);
  const [peerProjects, setPeerProjects] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    setIsLoading(true);
    axios.get(import.meta.env.VITE_BACKEND_URL + "/api/projects", {
      headers: { Authorization: `Bearer ${token}` }

    }).then((res) => {
      const fetchedProjects = res.data.projects || [];
      const userId = user._id || user.id;

      const myProjs = [];
      const peerProjs = [];

      fetchedProjects.forEach(project => {
        const mappedProject = {
          ...project,
          id: project._id || project.id,
          technologies: project.technologiesUsed || [],
          demoLink: project.demoUrl || '',
          screenshots: project.additionalImages || [],
          status: project.isPublic ? 'Public' : 'Private / Pending Admin Approval',
          studentName: project.studentId?.name || 'Unknown Student'
        };

        const projectStudentId = project.studentId?._id || project.studentId?.id || project.studentId;
        
        if (projectStudentId === userId) {
          myProjs.push(mappedProject);
        } else if (project.isPublic) {
          peerProjs.push(mappedProject);
        }
      });
      
      setMyProjects(myProjs.length > 0 ? myProjs : INITIAL_MY_PROJECTS);
      setPeerProjects(peerProjs.length > 0 ? peerProjs : INITIAL_PEER_PROJECTS);
    }).catch((err) => {
      console.error("Error fetching projects", err);
      // Fallback to mock data on error
      setMyProjects(INITIAL_MY_PROJECTS);
      setPeerProjects(INITIAL_PEER_PROJECTS);
    }).finally(() => {
      setIsLoading(false);
    });
  }, [token]);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    technologies: '',
    demoLink: '',
    coverImage: '',
    screenshots: ['', '', '', '', '']
  });

  const filteredPeerProjects = peerProjects.filter(project => 
    project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.technologies.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleOpenForm = (project = null) => {
    if (project) {
      setFormData({
        ...project,
        technologies: project.technologies.join(', '),
        screenshots: [...project.screenshots, ...Array(5 - project.screenshots.length).fill('')]
      });
      setEditingProject(project.id);
    } else {
      setFormData({
        title: '',
        description: '',
        technologies: '',
        demoLink: '',
        coverImage: '',
        screenshots: ['', '', '', '', '']
      });
      setEditingProject(null);
    }
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingProject(null);
  };

  const handleSaveProject = (e) => {
    e.preventDefault();
    
    // Process form data
    const newProject = {
      ...formData,
      id: editingProject || Date.now(),
      technologies: formData.technologies.split(',').map(t => t.trim()).filter(Boolean),
      screenshots: formData.screenshots.filter(Boolean),
      status: 'Private / Pending Admin Approval' // CRITICAL LOGIC: Always resets to pending
    };

    if (editingProject) {
      setMyProjects(prev => prev.map(p => p.id === editingProject ? newProject : p));
    } else {
      setMyProjects(prev => [newProject, ...prev]);
    }

    handleCloseForm();
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#09090b] text-zinc-100 pt-24 pb-12 px-6 md:px-12 relative overflow-hidden">
        {/* Background decoration */}
        <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-600/10 blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-600/10 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400 mb-4"
            >
              Student Hub
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-zinc-400 text-lg max-w-xl"
            >
              Manage your project portfolio and discover inspiring work from your peers.
            </motion.p>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="flex p-1 bg-zinc-900/50 backdrop-blur-md rounded-full border border-zinc-800 w-fit"
          >
            <button
              onClick={() => setActiveTab('portfolio')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeTab === 'portfolio' 
                  ? 'bg-indigo-600 text-white shadow-[0_0_15px_rgba(79,70,229,0.3)]' 
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
              }`}
            >
              <FolderGit2 size={16} />
              My Portfolio
            </button>
            <button
              onClick={() => setActiveTab('showcase')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeTab === 'showcase' 
                  ? 'bg-indigo-600 text-white shadow-[0_0_15px_rgba(79,70,229,0.3)]' 
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
              }`}
            >
              <Users size={16} />
              Peer Showcase
            </button>
          </motion.div>
        </header>

        <AnimatePresence mode="wait">
          {activeTab === 'portfolio' && !isFormOpen && (
            <motion.div
              key="portfolio"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-semibold flex items-center gap-2">
                  <span className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                    <FolderGit2 size={20} />
                  </span>
                  My Projects
                </h2>
                <Button onClick={() => handleOpenForm()}>
                  <PlusCircle size={18} />
                  New Project
                </Button>
              </div>

              {myProjects.length === 0 ? (
                <div className="text-center py-20 border border-dashed border-zinc-800 rounded-3xl bg-zinc-900/20 backdrop-blur-sm">
                  <div className="w-16 h-16 rounded-full bg-zinc-800/50 flex items-center justify-center mx-auto mb-4 text-zinc-500">
                    <FolderGit2 size={28} />
                  </div>
                  <h3 className="text-xl font-medium mb-2">No projects yet</h3>
                  <p className="text-zinc-400 mb-6 max-w-md mx-auto">
                    Start building your portfolio by adding your first project. Showcase your skills to the world.
                  </p>
                  <Button onClick={() => handleOpenForm()}>Create First Project</Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {myProjects.map(project => (
                    <Card key={project.id} className="group p-0 hover:border-indigo-500/30 transition-all duration-300">
                      <div className="h-48 relative overflow-hidden bg-zinc-900 rounded-t-3xl">
                        {project.coverImage ? (
                          <img 
                            src={project.coverImage} 
                            alt={project.title} 
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-zinc-700">
                            <ImageIcon size={48} />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-900/40 to-transparent" />
                        
                        {/* Status Badge */}
                        <div className="absolute top-4 right-4">
                          <div className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 backdrop-blur-md border ${
                            project.status === 'Public' 
                              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                              : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                          }`}>
                            {project.status === 'Public' ? <Globe size={12} /> : <Clock size={12} />}
                            {project.status}
                          </div>
                        </div>
                      </div>

                      <div className="p-6">
                        <h3 className="text-xl font-bold mb-2 group-hover:text-indigo-400 transition-colors">{project.title}</h3>
                        <p className="text-zinc-400 text-sm mb-4 line-clamp-2">{project.description}</p>
                        
                        <div className="flex flex-wrap gap-2 mb-6">
                          {project.technologies.slice(0, 3).map((tech, i) => (
                            <span key={i} className="px-2 py-1 rounded-md bg-zinc-800 text-xs text-zinc-300 border border-zinc-700/50">
                              {tech}
                            </span>
                          ))}
                          {project.technologies.length > 3 && (
                            <span className="px-2 py-1 rounded-md bg-zinc-800 text-xs text-zinc-500 border border-zinc-700/50">
                              +{project.technologies.length - 3}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-zinc-800/50">
                          <button 
                            onClick={() => window.open(project.demoLink, '_blank')}
                            className="text-zinc-400 hover:text-white flex items-center gap-1.5 text-sm transition-colors"
                          >
                            <ExternalLink size={14} /> View Demo
                          </button>
                          <div className="flex items-center gap-2">
                            <button 
                              onClick={() => handleOpenForm(project)}
                              className="p-2 rounded-full hover:bg-zinc-800 text-zinc-400 hover:text-indigo-400 transition-colors"
                            >
                              <Edit3 size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'showcase' && !isFormOpen && (
            <motion.div
              key="showcase"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <h2 className="text-2xl font-semibold flex items-center gap-2">
                  <span className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400">
                    <Users size={20} />
                  </span>
                  Peer Showcase
                </h2>
                
                <div className="relative w-full md:w-72">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search size={16} className="text-zinc-500" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search projects or skills..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 outline-none transition-all text-sm"
                  />
                </div>
              </div>

              {filteredPeerProjects.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-zinc-500">No public projects found matching your search.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredPeerProjects.map(project => (
                    <Card key={project.id} className="group p-0 hover:border-purple-500/30 transition-all duration-300">
                      <div className="h-48 relative overflow-hidden bg-zinc-900 rounded-t-3xl">
                        {project.coverImage ? (
                          <img 
                            src={project.coverImage} 
                            alt={project.title} 
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-zinc-700">
                            <ImageIcon size={48} />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-900/40 to-transparent" />
                        
                        <div className="absolute top-4 left-4">
                          <div className="px-3 py-1 rounded-full text-xs font-medium bg-black/40 backdrop-blur-md border border-white/10 text-white flex items-center gap-2">
                            <div className="w-4 h-4 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500" />
                            {project.studentName}
                          </div>
                        </div>
                      </div>

                      <div className="p-6">
                        <h3 className="text-xl font-bold mb-2 group-hover:text-purple-400 transition-colors">{project.title}</h3>
                        <p className="text-zinc-400 text-sm mb-4 line-clamp-2">{project.description}</p>
                        
                        <div className="flex flex-wrap gap-2 mb-6">
                          {project.technologies.slice(0, 3).map((tech, i) => (
                            <span key={i} className="px-2 py-1 rounded-md bg-zinc-800 text-xs text-zinc-300 border border-zinc-700/50">
                              {tech}
                            </span>
                          ))}
                        </div>

                        <div className="pt-4 border-t border-zinc-800/50">
                          <a 
                            href={project.demoLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-sm text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
                          >
                            View Live Project <ChevronRight size={14} />
                          </a>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {isFormOpen && (
            <motion.div
              key="form"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="max-w-3xl mx-auto"
            >
              <button 
                onClick={handleCloseForm}
                className="flex items-center gap-2 text-zinc-400 hover:text-white mb-6 transition-colors"
              >
                <X size={16} /> Cancel & Return
              </button>

              <Card className="p-8 md:p-10">
                <div className="mb-8 border-b border-zinc-800 pb-6">
                  <h2 className="text-3xl font-bold text-white mb-2">
                    {editingProject ? 'Edit Project' : 'Create New Project'}
                  </h2>
                  <p className="text-zinc-400">
                    Fill in the details below. <span className="text-amber-400 font-medium">Note: Saving will set this project's status to Private / Pending Admin Approval.</span>
                  </p>
                </div>

                <form onSubmit={handleSaveProject} className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-zinc-300 mb-1.5">Project Title *</label>
                      <input 
                        required
                        type="text" 
                        value={formData.title}
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                        className="w-full px-4 py-3 bg-zinc-900/50 border border-zinc-800 rounded-xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 outline-none transition-all"
                        placeholder="e.g. Nexus Social Platform"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-zinc-300 mb-1.5">Description *</label>
                      <textarea 
                        required
                        rows={4}
                        value={formData.description}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                        className="w-full px-4 py-3 bg-zinc-900/50 border border-zinc-800 rounded-xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 outline-none transition-all resize-none"
                        placeholder="Describe what your project does, the problem it solves, and its key features..."
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-zinc-300 mb-1.5 flex items-center gap-2">
                          <Code size={14} /> Technologies Used *
                        </label>
                        <input 
                          required
                          type="text" 
                          value={formData.technologies}
                          onChange={(e) => setFormData({...formData, technologies: e.target.value})}
                          className="w-full px-4 py-3 bg-zinc-900/50 border border-zinc-800 rounded-xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 outline-none transition-all"
                          placeholder="e.g. React, Node.js, Tailwind (comma separated)"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-zinc-300 mb-1.5 flex items-center gap-2">
                          <ExternalLink size={14} /> Demo Link
                        </label>
                        <input 
                          type="url" 
                          value={formData.demoLink}
                          onChange={(e) => setFormData({...formData, demoLink: e.target.value})}
                          className="w-full px-4 py-3 bg-zinc-900/50 border border-zinc-800 rounded-xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 outline-none transition-all"
                          placeholder="https://your-demo-url.com"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-zinc-800">
                    <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
                      <Camera size={18} /> Media & Screenshots
                    </h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-zinc-300 mb-1.5">Cover Image URL *</label>
                        <input 
                          required
                          type="url" 
                          value={formData.coverImage}
                          onChange={(e) => setFormData({...formData, coverImage: e.target.value})}
                          className="w-full px-4 py-3 bg-zinc-900/50 border border-zinc-800 rounded-xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 outline-none transition-all"
                          placeholder="https://example.com/cover-image.jpg"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-zinc-300 mb-3">Additional Screenshots (Up to 5)</label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {formData.screenshots.map((url, index) => (
                            <input 
                              key={index}
                              type="url" 
                              value={url}
                              onChange={(e) => {
                                const newScreenshots = [...formData.screenshots];
                                newScreenshots[index] = e.target.value;
                                setFormData({...formData, screenshots: newScreenshots});
                              }}
                              className="w-full px-4 py-2.5 bg-zinc-900/30 border border-zinc-800/80 rounded-lg focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 outline-none transition-all text-sm"
                              placeholder={`Screenshot URL ${index + 1}`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-8 flex justify-end gap-3">
                    <Button type="button" variant="secondary" onClick={handleCloseForm}>
                      Cancel
                    </Button>
                    <Button type="submit">
                      {editingProject ? 'Save Changes' : 'Create Project'}
                    </Button>
                  </div>
                </form>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
    </>
  );
};

export default StudentsDashbourd;
