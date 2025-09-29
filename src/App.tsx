import { useState, useEffect, useRef } from 'react';
import { 
  ChevronDown, 
  Mail, 
  MapPin, 
  Github, 
  Linkedin, 
  ExternalLink,
  Code2,
  Palette,
  Database,
  Globe,
  Send,
  User,
  Briefcase,
  FolderOpen,
  Phone
} from 'lucide-react';

// Hook for intersection observer
const useIntersectionObserver = (threshold = 0.1) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold]);

  return [ref, isVisible] as const;
};

// Smooth scroll function
const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

function App() {
  const [heroRef, heroVisible] = useIntersectionObserver(0.3);
  const [aboutRef, aboutVisible] = useIntersectionObserver(0.3);
  const [skillsRef, skillsVisible] = useIntersectionObserver(0.3);
  const [projectsRef, projectsVisible] = useIntersectionObserver(0.3);
  const [contactRef, contactVisible] = useIntersectionObserver(0.3);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({ name: '', email: '', message: '' });
  };

  const skills = [
    { category: 'Frontend', icon: <Code2 className="w-6 h-6" />, items: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js'], progress: 90 },
    { category: 'Backend', icon: <Database className="w-6 h-6" />, items: ['Node.js', 'Python', 'PostgreSQL', 'MongoDB'], progress: 85 },
    { category: 'Design', icon: <Palette className="w-6 h-6" />, items: ['Figma', 'Adobe Creative Suite', 'UI/UX Design'], progress: 80 },
    { category: 'Tools', icon: <Globe className="w-6 h-6" />, items: ['Git', 'Docker', 'AWS', 'Vercel'], progress: 88 }
  ];

  const projects = [
    {
      title: 'E-Commerce Platform',
      description: 'A full-stack e-commerce solution built with React, Node.js, and PostgreSQL. Features include user authentication, payment processing, and admin dashboard.',
      tech: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
      github: '#',
      live: '#',
      image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      title: 'Task Management App',
      description: 'A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.',
      tech: ['React', 'Firebase', 'Material-UI', 'WebSocket'],
      github: '#',
      live: '#',
      image: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      title: 'Weather Analytics Dashboard',
      description: 'A comprehensive weather analytics platform with interactive charts, historical data analysis, and location-based forecasting.',
      tech: ['Next.js', 'Chart.js', 'OpenWeather API', 'Tailwind'],
      github: '#',
      live: '#',
      image: 'https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=800'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-white/20">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-xl font-bold text-indigo-600">Portfolio</div>
            <div className="hidden md:flex space-x-8">
              {['hero', 'about', 'skills', 'projects', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className="text-gray-600 hover:text-indigo-600 transition-colors duration-300 capitalize"
                >
                  {section}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section 
        ref={heroRef}
        id="hero" 
        className="min-h-screen flex items-center justify-center px-6 pt-20"
      >
        <div className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${
          heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="mb-8">
            <img 
              src="https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop" 
              alt="Profile" 
              className="w-32 h-32 rounded-full mx-auto mb-6 object-cover ring-4 ring-indigo-200"
            />
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-4">
              Alex Johnson
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8">
              Full-Stack Developer & UI/UX Designer
            </p>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-12 leading-relaxed">
              I create beautiful, functional web applications that solve real-world problems. 
              Passionate about clean code, intuitive design, and exceptional user experiences.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button 
              onClick={() => scrollToSection('projects')}
              className="px-8 py-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-300 hover:transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              View My Work
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="px-8 py-4 border-2 border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-600 hover:text-white transition-all duration-300 hover:transform hover:scale-105"
            >
              Get In Touch
            </button>
          </div>

          <button 
            onClick={() => scrollToSection('about')}
            className="animate-bounce text-indigo-600 hover:text-indigo-700 transition-colors"
          >
            <ChevronDown className="w-8 h-8" />
          </button>
        </div>
      </section>

      {/* About Section */}
      <section 
        ref={aboutRef}
        id="about" 
        className="py-20 px-6"
      >
        <div className={`max-w-4xl mx-auto transition-all duration-1000 ${
          aboutVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 text-indigo-600 mb-4">
              <User className="w-5 h-5" />
              <span className="text-sm font-semibold tracking-wide uppercase">About Me</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Building Digital Experiences
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-lg text-gray-600 leading-relaxed">
                With over 5 years of experience in web development, I specialize in creating 
                scalable applications using modern technologies. My journey began with a 
                fascination for how code could bring ideas to life, and it has evolved into 
                a passion for crafting exceptional digital experiences.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                I believe in writing clean, maintainable code and designing intuitive interfaces 
                that users love. When I'm not coding, you'll find me exploring new technologies, 
                contributing to open-source projects, or hiking in nature.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>San Francisco, CA</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Briefcase className="w-4 h-4" />
                  <span>Available for freelance</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-3xl font-bold text-indigo-600 mb-2">50+</div>
                <div className="text-gray-600">Projects Completed</div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-3xl font-bold text-emerald-600 mb-2">5+</div>
                <div className="text-gray-600">Years Experience</div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-3xl font-bold text-orange-600 mb-2">30+</div>
                <div className="text-gray-600">Happy Clients</div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-3xl font-bold text-purple-600 mb-2">24/7</div>
                <div className="text-gray-600">Support</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section 
        ref={skillsRef}
        id="skills" 
        className="py-20 px-6 bg-white"
      >
        <div className={`max-w-4xl mx-auto transition-all duration-1000 ${
          skillsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 text-indigo-600 mb-4">
              <Code2 className="w-5 h-5" />
              <span className="text-sm font-semibold tracking-wide uppercase">Skills</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Technical Expertise
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A comprehensive toolkit for building modern web applications
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {skills.map((skill, index) => (
              <div 
                key={skill.category}
                className={`bg-gray-50 p-8 rounded-xl transition-all duration-700 delay-${index * 100} ${
                  skillsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-indigo-100 rounded-lg text-indigo-600">
                    {skill.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{skill.category}</h3>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {skill.items.map((item) => (
                        <span key={item} className="px-3 py-1 bg-white rounded-full text-sm text-gray-600">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Proficiency</span>
                    <span className="text-sm font-semibold text-gray-900">{skill.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-indigo-600 h-2 rounded-full transition-all duration-1000 ease-out"
                      style={{ 
                        width: skillsVisible ? `${skill.progress}%` : '0%' 
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section 
        ref={projectsRef}
        id="projects" 
        className="py-20 px-6"
      >
        <div className={`max-w-4xl mx-auto transition-all duration-1000 ${
          projectsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 text-indigo-600 mb-4">
              <FolderOpen className="w-5 h-5" />
              <span className="text-sm font-semibold tracking-wide uppercase">Portfolio</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Featured Projects
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A selection of projects that showcase my skills and passion for development
            </p>
          </div>

          <div className="space-y-12">
            {projects.map((project, index) => (
              <div 
                key={project.title}
                className={`bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-700 delay-${index * 100} overflow-hidden ${
                  projectsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                <div className="md:flex">
                  <div className="md:w-2/5">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-64 md:h-full object-cover"
                    />
                  </div>
                  <div className="md:w-3/5 p-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{project.title}</h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">{project.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tech.map((tech) => (
                        <span key={tech} className="px-3 py-1 bg-indigo-100 text-indigo-600 rounded-full text-sm">
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-4">
                      <a 
                        href={project.github}
                        className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <Github className="w-4 h-4" />
                        <span>Code</span>
                      </a>
                      <a 
                        href={project.live}
                        className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>Live Demo</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section 
        ref={contactRef}
        id="contact" 
        className="py-20 px-6 bg-white"
      >
        <div className={`max-w-4xl mx-auto transition-all duration-1000 ${
          contactVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 text-indigo-600 mb-4">
              <Phone className="w-5 h-5" />
              <span className="text-sm font-semibold tracking-wide uppercase">Contact</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Let's Work Together
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Have a project in mind? I'd love to hear about it. Send me a message and let's discuss how we can bring your ideas to life.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-indigo-100 rounded-lg text-indigo-600">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Email</h3>
                  <p className="text-gray-600">alex.johnson@example.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-indigo-100 rounded-lg text-indigo-600">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Location</h3>
                  <p className="text-gray-600">San Francisco, CA</p>
                </div>
              </div>

              <div className="pt-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Follow Me</h3>
                <div className="flex gap-4">
                  <a 
                    href="#"
                    className="p-3 bg-gray-100 rounded-lg text-gray-600 hover:bg-indigo-100 hover:text-indigo-600 transition-colors"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                  <a 
                    href="#"
                    className="p-3 bg-gray-100 rounded-lg text-gray-600 hover:bg-indigo-100 hover:text-indigo-600 transition-colors"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-900 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-gray-900 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              <button
                type="submit"
                className="w-full px-8 py-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-300 hover:transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-400">
            © 2025 Alex Johnson. Built with React and Tailwind CSS.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;