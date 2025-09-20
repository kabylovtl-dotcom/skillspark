import { useRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Settings, 
  Maximize2,
  Minimize2,
  Box,
  Layers3 
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

interface SimulationCanvasProps {
  simulationId: string;
  className?: string;
}

export const SimulationCanvas = ({ simulationId, className }: SimulationCanvasProps) => {
  const { t } = useLanguage();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [viewMode, setViewMode] = useState<'2d' | '3d'>('2d');
  const [animationFrame, setAnimationFrame] = useState<number | null>(null);

  // Simulation state
  const [time, setTime] = useState(0);
  const [parameters, setParameters] = useState({
    pendulum: { angle: 30, length: 200, gravity: 9.81 },
    projectile: { velocity: 50, angle: 45, height: 0 },
    ohms: { voltage: 5, resistance: 10 },
    newtons: { force: 10, mass: 2, friction: 0.1 }
  });

  // Initialize canvas and simulation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const container = canvas.parentElement;
    if (container) {
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
    }

    // Initial render
    renderSimulation(ctx, 0);
  }, [simulationId, viewMode]);

  // Animation loop
  useEffect(() => {
    if (isPlaying) {
      const animate = () => {
        setTime(prevTime => prevTime + 0.016); // ~60fps
        const frame = requestAnimationFrame(animate);
        setAnimationFrame(frame);
      };
      animate();
    } else {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
        setAnimationFrame(null);
      }
    }

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isPlaying]);

  // Render simulation frame
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    renderSimulation(ctx, time);
  }, [time, simulationId, viewMode]);

  const renderSimulation = (ctx: CanvasRenderingContext2D, currentTime: number) => {
    const { width, height } = ctx.canvas;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Set background
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(0, 0, width, height);
    
    // Add grid
    drawGrid(ctx, width, height);
    
    // Render specific simulation
    switch (simulationId) {
      case 'pendulum':
        renderPendulum(ctx, width, height, currentTime);
        break;
      case 'projectile':
        renderProjectile(ctx, width, height, currentTime);
        break;
      case 'ohms-law':
        renderOhmsLaw(ctx, width, height, currentTime);
        break;
      case 'newtons-laws':
        renderNewtonsLaws(ctx, width, height, currentTime);
        break;
      default:
        renderDefault(ctx, width, height);
    }
  };

  const drawGrid = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 1;
    
    const gridSize = 20;
    
    for (let x = 0; x <= width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    
    for (let y = 0; y <= height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
  };

  const renderPendulum = (ctx: CanvasRenderingContext2D, width: number, height: number, currentTime: number) => {
    const centerX = width / 2;
    const centerY = 50;
    const { angle: maxAngle, length } = parameters.pendulum;
    
    // Calculate pendulum position
    const currentAngle = (maxAngle * Math.PI / 180) * Math.cos(currentTime * 2);
    const bobX = centerX + length * Math.sin(currentAngle);
    const bobY = centerY + length * Math.cos(currentAngle);
    
    // Draw pivot
    ctx.fillStyle = '#374151';
    ctx.fillRect(centerX - 5, centerY - 5, 10, 10);
    
    // Draw string
    ctx.strokeStyle = '#374151';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(bobX, bobY);
    ctx.stroke();
    
    // Draw bob
    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.arc(bobX, bobY, 15, 0, 2 * Math.PI);
    ctx.fill();
    
    // Draw measurement indicators
    if (viewMode === '2d') {
      // Angle arc
      ctx.strokeStyle = '#3b82f6';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 30, Math.PI / 2, Math.PI / 2 + currentAngle, currentAngle > 0);
      ctx.stroke();
      
      // Angle text
      ctx.fillStyle = '#3b82f6';
      ctx.font = '14px sans-serif';
      ctx.fillText(`${Math.abs(currentAngle * 180 / Math.PI).toFixed(1)}°`, centerX + 35, centerY + 20);
    }
  };

  const renderProjectile = (ctx: CanvasRenderingContext2D, width: number, height: number, currentTime: number) => {
    const startX = 50;
    const startY = height - 50;
    const { velocity, angle } = parameters.projectile;
    
    const vx = velocity * Math.cos(angle * Math.PI / 180);
    const vy = velocity * Math.sin(angle * Math.PI / 180);
    const g = 9.81;
    
    const x = startX + vx * currentTime * 10;
    const y = startY - (vy * currentTime * 10 - 0.5 * g * currentTime * currentTime * 100);
    
    // Draw ground
    ctx.strokeStyle = '#22c55e';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(0, height - 20);
    ctx.lineTo(width, height - 20);
    ctx.stroke();
    
    // Draw projectile
    ctx.fillStyle = '#f59e0b';
    ctx.beginPath();
    ctx.arc(x, y, 8, 0, 2 * Math.PI);
    ctx.fill();
    
    // Draw velocity vector
    ctx.strokeStyle = '#8b5cf6';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + vx * 2, y - vy * 2);
    ctx.stroke();
    
    // Draw trajectory trail
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 1;
    ctx.globalAlpha = 0.3;
    ctx.beginPath();
    for (let t = 0; t <= currentTime; t += 0.1) {
      const trailX = startX + vx * t * 10;
      const trailY = startY - (vy * t * 10 - 0.5 * g * t * t * 100);
      if (t === 0) {
        ctx.moveTo(trailX, trailY);
      } else {
        ctx.lineTo(trailX, trailY);
      }
    }
    ctx.stroke();
    ctx.globalAlpha = 1;
  };

  const renderOhmsLaw = (ctx: CanvasRenderingContext2D, width: number, height: number, currentTime: number) => {
    const { voltage, resistance } = parameters.ohms;
    const current = voltage / resistance;
    
    // Draw circuit
    const centerX = width / 2;
    const centerY = height / 2;
    const circuitWidth = 200;
    const circuitHeight = 150;
    
    // Circuit outline
    ctx.strokeStyle = '#374151';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.rect(centerX - circuitWidth/2, centerY - circuitHeight/2, circuitWidth, circuitHeight);
    ctx.stroke();
    
    // Battery
    ctx.fillStyle = '#22c55e';
    ctx.fillRect(centerX - circuitWidth/2 - 20, centerY - 20, 40, 40);
    ctx.fillStyle = '#fff';
    ctx.font = '12px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`${voltage}V`, centerX - circuitWidth/2, centerY + 5);
    
    // Resistor
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(centerX + circuitWidth/2 - 40, centerY - 20);
    ctx.lineTo(centerX + circuitWidth/2 - 20, centerY - 20);
    ctx.lineTo(centerX + circuitWidth/2 - 10, centerY + 20);
    ctx.lineTo(centerX + circuitWidth/2 + 10, centerY - 20);
    ctx.lineTo(centerX + circuitWidth/2 + 20, centerY + 20);
    ctx.lineTo(centerX + circuitWidth/2 + 40, centerY);
    ctx.stroke();
    
    // Current flow animation
    const flowOffset = (currentTime * 50) % 20;
    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 2;
    for (let i = 0; i < 10; i++) {
      const x = centerX - circuitWidth/2 + (i * 20) + flowOffset;
      const y = centerY - circuitHeight/2 - 10;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + 10, y);
      ctx.stroke();
    }
    
    // Display values
    ctx.fillStyle = '#1f2937';
    ctx.font = '16px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(`Voltage: ${voltage}V`, 20, 30);
    ctx.fillText(`Resistance: ${resistance}Ω`, 20, 50);
    ctx.fillText(`Current: ${current.toFixed(2)}A`, 20, 70);
  };

  const renderNewtonsLaws = (ctx: CanvasRenderingContext2D, width: number, height: number, currentTime: number) => {
    const { force, mass, friction } = parameters.newtons;
    const acceleration = (force - friction) / mass;
    
    const blockX = 100 + acceleration * currentTime * currentTime * 50;
    const blockY = height / 2;
    
    // Draw ground
    ctx.strokeStyle = '#6b7280';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, blockY + 25);
    ctx.lineTo(width, blockY + 25);
    ctx.stroke();
    
    // Draw block
    ctx.fillStyle = '#8b5cf6';
    ctx.fillRect(blockX - 25, blockY - 25, 50, 50);
    
    // Draw applied force vector
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(blockX + 25, blockY);
    ctx.lineTo(blockX + 25 + force * 5, blockY);
    ctx.stroke();
    
    // Force arrow
    ctx.beginPath();
    ctx.moveTo(blockX + 25 + force * 5, blockY);
    ctx.lineTo(blockX + 25 + force * 5 - 10, blockY - 5);
    ctx.moveTo(blockX + 25 + force * 5, blockY);
    ctx.lineTo(blockX + 25 + force * 5 - 10, blockY + 5);
    ctx.stroke();
    
    // Draw friction vector
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(blockX - 25, blockY);
    ctx.lineTo(blockX - 25 - friction * 10, blockY);
    ctx.stroke();
    
    // Display values
    ctx.fillStyle = '#1f2937';
    ctx.font = '14px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(`Force: ${force}N`, 20, 30);
    ctx.fillText(`Mass: ${mass}kg`, 20, 50);
    ctx.fillText(`Friction: ${friction}N`, 20, 70);
    ctx.fillText(`Acceleration: ${acceleration.toFixed(2)}m/s²`, 20, 90);
  };

  const renderDefault = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.fillStyle = '#6b7280';
    ctx.font = '20px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Simulation Loading...', width / 2, height / 2);
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setTime(0);
  };

  const toggleViewMode = () => {
    setViewMode(viewMode === '2d' ? '3d' : '2d');
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <Card className={cn("simulation-canvas", className)}>
      <CardContent className="p-0">
        {/* Controls Header */}
        <div className="flex items-center justify-between p-4 border-b bg-accent/30">
          <div className="flex items-center space-x-2">
            <Badge variant="outline">
              {t(`mode.${viewMode}`)}
            </Badge>
            <span className="text-sm text-muted-foreground">
              Time: {time.toFixed(2)}s
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={toggleViewMode}
              className="gap-2"
            >
              {viewMode === '2d' ? <Layers3 className="h-4 w-4" /> : <Box className="h-4 w-4" />}
              {t(`mode.${viewMode === '2d' ? '3d' : '2d'}`)}
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={handleReset}
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
            
            <Button
              variant={isPlaying ? "destructive" : "default"}
              size="sm"
              onClick={handlePlayPause}
              className="gap-2"
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              {isPlaying ? t('common.pause') : t('common.play')}
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={toggleFullscreen}
            >
              {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            </Button>
          </div>
        </div>
        
        {/* Canvas */}
        <div className={cn(
          "relative bg-background",
          isFullscreen ? "fixed inset-0 z-50" : "h-96"
        )}>
          <canvas
            ref={canvasRef}
            className="w-full h-full border-0 rounded-b-lg"
            style={{ imageRendering: 'crisp-edges' }}
          />
        </div>
      </CardContent>
    </Card>
  );
};