import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { BrainCircuit as Circuit, Brain, Cpu, Network, MessageCircle, X, Send, User, Mail, Building2, MessageSquare } from 'lucide-react';
import AIToolsAssessment from './pages/AIToolsAssessment';

function HomePage() {
  const [isFlashing, setIsFlashing] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [sparkles, setSparkles] = useState<Array<{ id: number; x: number; y: number; size: number; duration: number }>>([]);
  const [circuitPulse, setCircuitPulse] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const messages = [
    {
      text: "Want to understand which AI tools could transform your business? Take our comprehensive AI Tools Assessment to receive a personalized analysis of the most relevant AI solutions for your specific needs.",
      link: "/what-we-do/ai-tools-assessment",
      linkText: "Begin your AI Tools Assessment"
    },
    {
      text: "Deliver exceptional 24/7 customer service without staffing constraints. Let AI power your business around the clock.",
      link: null,
      linkText: null
    },
    {
      text: "Stay ahead of the AI revolution. When your customers' AI assistants reach out, ensure they're greeted by your intelligent automated response system.",
      link: null,
      linkText: null
    },
    {
      text: "Transform your workforce efficiency with AI-powered automation. Empower your team to achieve more by working smarter, not harder.",
      link: null,
      linkText: null
    },
    {
      text: "Gain the competitive advantage. Harness AI automation to streamline operations, boost productivity, and maximize your profit potential.",
      link: null,
      linkText: null
    }
  ];

  useEffect(() => {
    const messageInterval = setInterval(() => {
      setCurrentMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 10000);

    return () => clearInterval(messageInterval);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      if (Math.random() > 0.92) {
        const newSparkle = {
          id: Date.now(),
          x: e.clientX,
          y: e.clientY,
          size: Math.random() * 8 + 4,
          duration: Math.random() * 1 + 0.5,
        };
        
        setSparkles(prev => [...prev, newSparkle]);
        
        setTimeout(() => {
          setSparkles(prev => prev.filter(sparkle => sparkle.id !== newSparkle.id));
        }, newSparkle.duration * 1000);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const flashInterval = setInterval(() => {
      setIsFlashing(true);
      setTimeout(() => setIsFlashing(false), 700);
    }, 3500);

    return () => clearInterval(flashInterval);
  }, []);

  useEffect(() => {
    const circuitInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        setCircuitPulse(true);
        setTimeout(() => setCircuitPulse(false), 200);
      }
    }, 5000);

    return () => clearInterval(circuitInterval);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const particleInterval = setInterval(() => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = Math.random() * rect.width;
        const y = Math.random() * rect.height;
        
        const newSparkle = {
          id: Date.now() + Math.random(),
          x,
          y,
          size: Math.random() * 6 + 2,
          duration: Math.random() * 3 + 2,
        };
        
        setSparkles(prev => [...prev.slice(-30), newSparkle]);
        
        setTimeout(() => {
          setSparkles(prev => prev.filter(sparkle => sparkle.id !== newSparkle.id));
        }, newSparkle.duration * 1000);
      }
    }, 300);

    return () => clearInterval(particleInterval);
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.addEventListener('loadeddata', () => {
        setVideoLoaded(true);
      });
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setIsModalOpen(false);
      }
    };

    if (isModalOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isModalOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsModalOpen(false);
  };

  return (
    <div 
      ref={containerRef}
      className="relative min-h-screen overflow-hidden flex flex-col items-center justify-center"
    >
      <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-4 backdrop-blur-md bg-black/20">
        <div className="max-w-7xl mx-auto flex justify-center items-center space-x-8">
          <div 
            className="relative group"
            onMouseEnter={() => setActiveMenu('what-we-do')}
            onMouseLeave={() => setActiveMenu(null)}
          >
            <button className="text-white/90 hover:text-white text-lg font-medium transition-colors duration-300">
              What we do
            </button>
            {activeMenu === 'what-we-do' && (
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-64 p-4 rounded-xl bg-gradient-to-br from-indigo-900/90 via-purple-900/90 to-black/90 backdrop-blur-lg border border-purple-500/20 shadow-2xl">
                <div className="space-y-2">
                  <p className="text-blue-200 font-medium">AI Solutions</p>
                  <p className="text-blue-200 font-medium">24/7 Customer Service</p>
                  <p className="text-blue-200 font-medium">Process Automation</p>
                  <p className="text-blue-200 font-medium">Data Analytics</p>
                </div>
                <Network className="absolute top-2 right-2 text-blue-300/30" size={16} />
                <div className="absolute -inset-px bg-gradient-to-r from-purple-500/20 via-transparent to-blue-500/20 rounded-xl -z-10"></div>
              </div>
            )}
          </div>
          
          <div 
            className="relative group"
            onMouseEnter={() => setActiveMenu('about-us')}
            onMouseLeave={() => setActiveMenu(null)}
          >
            <button className="text-white/90 hover:text-white text-lg font-medium transition-colors duration-300">
              About us
            </button>
            {activeMenu === 'about-us' && (
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-64 p-4 rounded-xl bg-gradient-to-br from-indigo-900/90 via-purple-900/90 to-black/90 backdrop-blur-lg border border-purple-500/20 shadow-2xl">
                <div className="space-y-2">
                  <p className="text-blue-200 font-medium">Our Mission</p>
                  <p className="text-blue-200 font-medium">The Team</p>
                  <p className="text-blue-200 font-medium">Success Stories</p>
                  <p className="text-blue-200 font-medium">Partners</p>
                </div>
                <Brain className="absolute top-2 right-2 text-purple-300/30" size={16} />
                <div className="absolute -inset-px bg-gradient-to-r from-purple-500/20 via-transparent to-blue-500/20 rounded-xl -z-10"></div>
              </div>
            )}
          </div>
        </div>
      </nav>

      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <video 
          ref={videoRef}
          autoPlay 
          loop 
          muted 
          playsInline
          className={`absolute min-w-full min-h-full object-cover transition-opacity duration-1000 ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}
          style={{ filter: 'brightness(0.4)' }}
        >
          <source src="https://player.vimeo.com/external/530435584.hd.mp4?s=c351b3ea8b4cfa0da9953bfd0e123a1f3b7f3b0a&profile_id=175&oauth2_token_id=57447761" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        <div className={`absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-black transition-opacity duration-1000 ${videoLoaded ? 'opacity-0' : 'opacity-100'}`}></div>
        
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-indigo-900/40 to-black/70"></div>
        
        {circuitPulse && (
          <div className="absolute inset-0 bg-gradient-to-br from-blue-300 to-transparent opacity-10 z-10"></div>
        )}
      </div>

      <div className="absolute top-6 sm:top-8 left-1/2 transform -translate-x-1/2 z-20 max-w-xs sm:max-w-md mt-12">
        <div className="relative bg-white/10 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-purple-300/20">
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 text-white">
            <MessageCircle size={24} className="fill-white/10" />
          </div>
          <div className="space-y-3">
            <p className="text-blue-100 text-sm sm:text-base font-medium text-center min-h-[4rem] transition-opacity duration-500">
              {messages[currentMessageIndex].text}
            </p>
            {messages[currentMessageIndex].link && (
              <div className="text-center">
                <a
                  href={messages[currentMessageIndex].link}
                  className="inline-block px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-200 rounded-lg transition-colors duration-300"
                >
                  {messages[currentMessageIndex].linkText}
                </a>
              </div>
            )}
          </div>
          <div className="absolute -left-1 -right-1 -bottom-1 -top-1 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl -z-10 blur-sm"></div>
          
          <div className="flex justify-center items-center space-x-3 mt-4">
            {messages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentMessageIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentMessageIndex
                    ? 'bg-white scale-125'
                    : 'bg-white/50 hover:bg-white/70'
                }`}
                aria-label={`View message ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
      
      <div className="absolute inset-0 overflow-hidden z-10">
        {Array.from({ length: 10 }).map((_, i) => (
          <div 
            key={i}
            className="absolute bg-blue-500 opacity-10 rounded-full blur-xl"
            style={{
              width: `${Math.random() * 300 + 50}px`,
              height: `${Math.random() * 300 + 50}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              transform: `scale(${Math.random() * 0.5 + 0.5})`,
              animation: `float ${Math.random() * 10 + 15}s infinite ease-in-out`,
            }}
          />
        ))}
      </div>

      {sparkles.map(sparkle => (
        <div
          key={sparkle.id}
          className="absolute pointer-events-none text-blue-300 z-20"
          style={{
            left: sparkle.x,
            top: sparkle.y,
            transform: 'translate(-50%, -50%)',
            opacity: 0,
            animation: `sparkleAnimation ${sparkle.duration}s forwards`,
          }}
        >
          <Cpu size={sparkle.size} />
        </div>
      ))}

      <div className="relative z-20 text-center px-4 max-w-4xl mx-auto mt-16 sm:mt-20">
        <div className="flex flex-wrap items-center justify-center mb-6 sm:mb-8">
          <div className="relative">
            <Circuit 
              className={`text-blue-300 animate-pulse mr-2 sm:mr-4 ${circuitPulse ? 'opacity-100 scale-110' : 'opacity-80'}`} 
              size={36} 
              strokeWidth={2.5} 
            />
            {circuitPulse && (
              <div className="absolute inset-0 bg-blue-300 blur-md opacity-40 rounded-full"></div>
            )}
          </div>
          
          <h1 className="text-5xl sm:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-300 to-pink-400 tracking-tight">
            ThousandAIs
          </h1>
          
          <div className="relative">
            <Circuit 
              className={`text-blue-300 animate-pulse ml-2 sm:ml-4 ${circuitPulse ? 'opacity-100 scale-110' : 'opacity-80'}`} 
              size={36} 
              strokeWidth={2.5} 
            />
            {circuitPulse && (
              <div className="absolute inset-0 bg-blue-300 blur-md opacity-40 rounded-full"></div>
            )}
          </div>
        </div>
        
        <div className="relative mb-8 sm:mb-12">
          <p className="text-lg sm:text-xl text-blue-100 max-w-md mx-auto leading-relaxed">
            Transforming the future with innovative AI solutions tailored for your business needs
          </p>
          <Brain className="absolute -top-6 -right-12 text-purple-200 animate-spin-slow hidden sm:block" size={24} />
          <Brain className="absolute -bottom-6 -left-12 text-purple-200 animate-spin-slow hidden sm:block" size={24} />
        </div>

        <button 
          onClick={() => setIsModalOpen(true)}
          className={`
            relative overflow-hidden px-6 sm:px-8 py-3 sm:py-4 rounded-full 
            bg-gradient-to-r from-purple-600 to-blue-600 
            text-white font-bold text-base sm:text-lg shadow-lg 
            transform hover:scale-105 transition-all duration-300
            focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-50
            ${isFlashing ? 'animate-flash' : ''}
          `}
        >
          <span className="relative z-10">Speak with us to start your AI journey</span>
          <span className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 opacity-0 hover:opacity-100 transition-opacity duration-300"></span>
        </button>

        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50 px-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
            <div 
              ref={modalRef}
              className="relative bg-gradient-to-br from-indigo-900/90 via-purple-900/90 to-black/90 rounded-2xl p-6 sm:p-8 w-full max-w-lg backdrop-blur-lg border border-purple-500/20 shadow-2xl transform transition-all"
            >
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
                aria-label="Close modal"
              >
                <X size={24} />
              </button>

              <h2 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-300 to-pink-400 mb-6">
                Start Your AI Journey
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-300" size={18} />
                  <input
                    type="text"
                    placeholder="Your Name"
                    required
                    className="w-full bg-white/10 border border-purple-500/20 rounded-lg py-2 pl-10 pr-4 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500/40 transition-all"
                  />
                </div>

                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-300" size={18} />
                  <input
                    type="email"
                    placeholder="Your Email"
                    required
                    className="w-full bg-white/10 border border-purple-500/20 rounded-lg py-2 pl-10 pr-4 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500/40 transition-all"
                  />
                </div>

                <div className="relative">
                  <Building2 className="absolute left-3 top-3 text-purple-300" size={18} />
                  <input
                    type="text"
                    placeholder="Company Name"
                    required
                    className="w-full bg-white/10 border border-purple-500/20 rounded-lg py-2 pl-10 pr-4 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500/40 transition-all"
                  />
                </div>

                <div className="relative">
                  <MessageSquare className="absolute left-3 top-3 text-purple-300" size={18} />
                  <textarea
                    placeholder="Tell us about your AI needs..."
                    required
                    rows={4}
                    className="w-full bg-white/10 border border-purple-500/20 rounded-lg py-2 pl-10 pr-4 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500/40 transition-all resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold py-3 rounded-lg flex items-center justify-center space-x-2 hover:from-purple-500 hover:to-blue-500 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500/40"
                >
                  <span>Send Message</span>
                  <Send size={18} className="inline-block ml-2" />
                </button>
              </form>

              <div className="absolute -top-4 -left-4 w-20 h-20 bg-purple-500/20 rounded-full blur-xl"></div>
              <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-blue-500/20 rounded-full blur-xl"></div>
              <Network className="absolute top-4 left-4 text-blue-300/30" size={20} />
              <Network className="absolute bottom-4 right-4 text-blue-300/30" size={20} />
            </div>
          </div>
        )}
        
        <div className="sr-only">
          This page contains subtle animations. If you prefer reduced motion, you can enable reduced motion in your browser settings.
        </div>
      </div>

      <div className="absolute bottom-10 left-10 text-blue-300 animate-float hidden sm:block z-20">
        <Brain size={24} />
      </div>
      <div className="absolute top-10 right-10 text-purple-300 animate-float-reverse hidden sm:block z-20">
        <Brain size={24} />
      </div>
      <div className="absolute top-1/4 left-1/4 text-pink-300 animate-float-slow hidden sm:block z-20">
        <Cpu size={20} />
      </div>
      <div className="absolute bottom-1/4 right-1/4 text-yellow-300 animate-float-slower hidden sm:block z-20">
        <Cpu size={20} />
      </div>
      
      <div className="absolute bottom-4 text-center w-full text-blue-200 opacity-70 text-sm z-20">
        <p>© 2025 ThousandAIs • Innovative Solutions</p>
      </div>
    </div>
  );
}

function App() {
  const location = useLocation();
  
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/what-we-do/ai-tools-assessment" element={<AIToolsAssessment />} />
    </Routes>
  );
}

export default App;