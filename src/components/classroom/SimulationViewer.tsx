import React, { useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SimulationParams } from '@/types';

interface SimulationViewerProps {
  params: SimulationParams | null;
  className?: string;
}

const SimulationViewer: React.FC<SimulationViewerProps> = ({ params, className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  // Default parameters for pendulum simulation
  const defaultParams: SimulationParams = {
    length: 2.0,
    mass: 1.0,
    initialAngle: 0.3,
    damping: 0.02
  };

  const currentParams = params || defaultParams;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Pendulum simulation variables
    let angle = currentParams.initialAngle || 0.3;
    let angularVelocity = 0;
    const gravity = 9.81;
    const damping = currentParams.damping || 0.02;
    const length = currentParams.length || 2.0;
    const mass = currentParams.mass || 1.0;

    // Animation loop
    const animate = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Get canvas dimensions
      const canvasWidth = canvas.width / window.devicePixelRatio;
      const canvasHeight = canvas.height / window.devicePixelRatio;
      const centerX = canvasWidth / 2;
      const centerY = canvasHeight / 2;

      // Calculate pendulum position
      const pendulumLength = Math.min(canvasWidth, canvasHeight) * 0.3 * length;
      const bobX = centerX + Math.sin(angle) * pendulumLength;
      const bobY = centerY + Math.cos(angle) * pendulumLength;

      // Draw pendulum string
      ctx.strokeStyle = '#6B7280';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(bobX, bobY);
      ctx.stroke();

      // Draw pendulum bob
      const bobRadius = 15 + mass * 5; // Size based on mass
      ctx.fillStyle = '#8B5CF6';
      ctx.beginPath();
      ctx.arc(bobX, bobY, bobRadius, 0, 2 * Math.PI);
      ctx.fill();

      // Draw bob outline
      ctx.strokeStyle = '#7C3AED';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw center point
      ctx.fillStyle = '#374151';
      ctx.beginPath();
      ctx.arc(centerX, centerY, 5, 0, 2 * Math.PI);
      ctx.fill();

      // Physics update
      const angularAcceleration = -(gravity / length) * Math.sin(angle) - damping * angularVelocity;
      angularVelocity += angularAcceleration * 0.016; // 60 FPS
      angle += angularVelocity * 0.016;

      // Apply damping
      angularVelocity *= 0.999;

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [currentParams]);

  return (
    <Card className={`h-full ${className}`}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
          Симуляция маятника
        </CardTitle>
      </CardHeader>
      <CardContent className="h-full p-0">
        <div className="relative h-full min-h-[400px] bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 rounded-lg overflow-hidden">
          <canvas
            ref={canvasRef}
            className="w-full h-full"
            style={{ background: 'transparent' }}
          />
          
          {/* Parameters Display */}
          <div className="absolute top-4 right-4 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
            <div className="space-y-1 text-sm">
              <div className="flex justify-between gap-4">
                <span className="text-slate-600 dark:text-slate-400">Длина:</span>
                <span className="font-mono text-slate-800 dark:text-slate-200">
                  {currentParams.length?.toFixed(2)} м
                </span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-slate-600 dark:text-slate-400">Масса:</span>
                <span className="font-mono text-slate-800 dark:text-slate-200">
                  {currentParams.mass?.toFixed(2)} кг
                </span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-slate-600 dark:text-slate-400">Угол:</span>
                <span className="font-mono text-slate-800 dark:text-slate-200">
                  {(currentParams.initialAngle ? currentParams.initialAngle * 180 / Math.PI : 0).toFixed(1)}°
                </span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-slate-600 dark:text-slate-400">Затухание:</span>
                <span className="font-mono text-slate-800 dark:text-slate-200">
                  {currentParams.damping?.toFixed(3)}
                </span>
              </div>
            </div>
          </div>

          {/* Simulation Status */}
          <div className="absolute bottom-4 left-4 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-lg p-2 shadow-lg">
            <div className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-slate-600 dark:text-slate-400">Симуляция активна</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SimulationViewer;
