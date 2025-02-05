

interface LoaderProps {
    /**
     * Optional custom class name for container styling
     */
    className?: string;
  }
  
  
  
  
  import { FC } from 'react';
  
  /**
   * An animated loading indicator component that provides visual feedback during data fetching.
   * 
   * @component
   * @example
   * ```tsx
   * // Basic usage
   * <Loader />
   * 
   * // With custom container class
   * <Loader className="my-custom-class" />
   * ```
   */
  const Loader: FC<LoaderProps> = ({ className = '' }) => {
    return (
      <div className={`flex items-center justify-center min-h-screen bg-gray-900 ${className}`}>
        <div className="flex items-center gap-4">
          {/* Animated dots */}
          <div className="flex gap-2">
            {[0, 1, 2].map((dot) => (
              <div
                key={dot}
                className="w-3 h-3 rounded-full bg-white animate-bounce"
                style={{
                  animationDelay: `${dot * 0.2}s`,
                  animationDuration: '1s',
                }}
              />
            ))}
          </div>
          
          {/* Loading text */}
          <span className="text-gray-300 font-mono tracking-wider">
            Loading...
          </span>
        </div>
  
        <style >{`
          @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-8px); }
          }
  
          .animate-bounce {
            animation: bounce 1s infinite ease-in-out;
          }
        `}</style>
      </div>
    );
  };
  
  export default Loader;
  
  