import React, { useState, useEffect, useRef } from 'react';
import { Zap, Sparkles, Stars, MessageCircle } from 'lucide-react';

function App() {
  const [isFlashing, setIsFlashing] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [sparkles, setSparkles] = useState<Array<{ id: number; x: number; y: number; size: number; duration: number }>>([]);
  const [lightningFlash, setLightningFlash] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Handle mouse movement for magical cursor effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // Occasionally create sparkles when mouse moves (reduced frequency for performance)
      if (Math.random() > 0.92) {
        const newSparkle = {
          id: Date.now(),
          x: e.clientX,
          y: e.clientY,
          size: Math.random() * 8 + 4,
          duration: Math.random() * 1 + 0.5,
        };
        
        setSparkles(prev => [...prev, newSparkle]);
        
        // Remove sparkle after animation
        setTimeout(() => {
          setSparkles(prev => prev.filter(sparkle => sparkle.id !== newSparkle.id));
        }, newSparkle.duration * 1000);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Button flashing effect
  useEffect(() => {
    const flashInterval = setInterval(() => {
      setIsFlashing(true);
      setTimeout(() => setIsFlashing(false), 700);
    }, 3500);

    return () => clearInterval(flashInterval);
  }, []);

  // Random lightning flash effect
  useEffect(() => {
    const lightningInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        setLightningFlash(true);
        setTimeout(() => setLightningFlash(false), 200);
      }
    }, 5000);

    return () => clearInterval(lightningInterval);
  }, []);

  // Generate random background particles
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Create random particles at intervals
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
        
        setSparkles(prev => [...prev.slice(-30), newSparkle]); // Limit to 30 particles for performance
        
        setTimeout(() => {
          setSparkles(prev => prev.filter(sparkle => sparkle.id !== newSparkle.id));
        }, newSparkle.duration * 1000);
      }
    }, 300);

    return () => clearInterval(particleInterval);
  }, []);

  // Handle video loading
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.addEventListener('loadeddata', () => {
        setVideoLoaded(true);
      });
    }
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative min-h-screen overflow-hidden flex flex-col items-center justify-center"
    >
      {/* Background Video */}
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
        
        {/* Fallback gradient background while video loads */}
        <div className={`absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-black transition-opacity duration-1000 ${videoLoaded ? 'opacity-0' : 'opacity-100'}`}></div>
        
        {/* Overlay to darken video and add gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-indigo-900/40 to-black/70"></div>
        
        {/* Lightning effect overlay */}
        {lightningFlash && (
          <div className="absolute inset-0 bg-gradient-to-br from-blue-300 to-transparent opacity-10 z-10"></div>
        )}
      </div>

      {/* Text Bubble */}
      <div className="absolute top-6 sm:top-8 left-1/2 transform -translate-x-1/2 z-20 max-w-xs sm:max-w-md">
        <div className="relative bg-white/10 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-purple-300/20">
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 text-white">
            <MessageCircle size={24} className="fill-white/10" />
          </div>
          <p className="text-blue-100 text-sm sm:text-base font-medium text-center">
            Why Team AI? Because you need to be open 24/7 to your customers without having employees at work.
          </p>
          <div className="absolute -left-1 -right-1 -bottom-1 -top-1 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl -z-10 blur-sm"></div>
        </div>
      </div>
      
      {/* Background magical elements */}
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

      {/* Mouse and random sparkles */}
      {sparkles.map(sparkle => (
        <div
          key={sparkle.id}
          className="absolute pointer-events-none text-yellow-300 z-20"
          style={{
            left: sparkle.x,
            top: sparkle.y,
            transform: 'translate(-50%, -50%)',
            opacity: 0,
            animation: `sparkleAnimation ${sparkle.duration}s forwards`,
          }}
        >
          <Sparkles size={sparkle.size} />
        </div>
      ))}

      {/* Main content */}
      <div className="relative z-20 text-center px-4 max-w-4xl mx-auto mt-16 sm:mt-20">
        <div className="flex flex-wrap items-center justify-center mb-6 sm:mb-8">
          <div className="relative">
            <Zap 
              className={`text-yellow-300 animate-pulse mr-2 sm:mr-4 ${lightningFlash ? 'opacity-100 scale-110' : 'opacity-80'}`} 
              size={36} 
              strokeWidth={2.5} 
            />
            {lightningFlash && (
              <div className="absolute inset-0 bg-yellow-300 blur-md opacity-40 rounded-full"></div>
            )}
          </div>
          
          <h1 className="text-5xl sm:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-300 to-pink-400 tracking-tight">
            Team AI
          </h1>
          
          <div className="relative">
            <Zap 
              className={`text-yellow-300 animate-pulse ml-2 sm:ml-4 ${lightningFlash ? 'opacity-100 scale-110' : 'opacity-80'}`} 
              size={36} 
              strokeWidth={2.5} 
            />
            {lightningFlash && (
              <div className="absolute inset-0 bg-yellow-300 blur-md opacity-40 rounded-full"></div>
            )}
          </div>
        </div>
        
        <div className="relative mb-8 sm:mb-12">
          <p className="text-lg sm:text-xl text-blue-100 max-w-md mx-auto leading-relaxed">
            Transforming the future with innovative AI solutions tailored for your business needs
          </p>
          <Stars className="absolute -top-6 -right-12 text-yellow-200 animate-spin-slow hidden sm:block" size={24} />
          <Stars className="absolute -bottom-6 -left-12 text-yellow-200 animate-spin-slow hidden sm:block" size={24} />
        </div>

        <button 
          className={`
            relative overflow-hidden px-6 sm:px-8 py-3 sm:py-4 rounded-full 
            bg-gradient-to-r from-purple-600 to-blue-600 
            text-white font-bold text-base sm:text-lg shadow-lg 
            transform hover:scale-105 transition-all duration-300
            focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-50
            ${isFlashing ? 'animate-flash' : ''}
          `}
          aria-label="Contact us to start your AI journey"
        >
          <span className="relative z-10">Speak with us to start your AI journey</span>
          <span className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 opacity-0 hover:opacity-100 transition-opacity duration-300"></span>
          
          {/* Button sparkles */}
          <Sparkles className="absolute top-1 right-2 text-yellow-200" size={16} />
          <Sparkles className="absolute bottom-1 left-2 text-yellow-200" size={16} />
        </button>
        
        {/* Accessibility note for users with reduced motion preferences */}
        <div className="sr-only">
          This page contains subtle animations. If you prefer reduced motion, you can enable reduced motion in your browser settings.
        </div>
      </div>

      {/* Floating magical elements - reduced for performance */}
      <div className="absolute bottom-10 left-10 text-blue-300 animate-float hidden sm:block z-20">
        <Sparkles size={24} />
      </div>
      <div className="absolute top-10 right-10 text-purple-300 animate-float-reverse hidden sm:block z-20">
        <Sparkles size={24} />
      </div>
      <div className="absolute top-1/4 left-1/4 text-pink-300 animate-float-slow hidden sm:block z-20">
        <Stars size={20} />
      </div>
      <div className="absolute bottom-1/4 right-1/4 text-yellow-300 animate-float-slower hidden sm:block z-20">
        <Stars size={20} />
      </div>
      
      {/* Footer with subtle branding */}
      <div className="absolute bottom-4 text-center w-full text-blue-200 opacity-70 text-sm z-20">
        <p>© 2025 Team AI • Innovative Solutions</p>
      </div>
    </div>
  );
}

export default App;