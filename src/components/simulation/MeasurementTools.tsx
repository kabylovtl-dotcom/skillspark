import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Ruler, 
  Timer, 
  Gauge, 
  Move3D, 
  RotateCcw, 
  Zap,
  Activity,
  Eye,
  EyeOff 
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

interface MeasurementToolsProps {
  className?: string;
  onToolSelect?: (tool: string) => void;
}

export const MeasurementTools = ({ className, onToolSelect }: MeasurementToolsProps) => {
  const { t } = useLanguage();
  const [activeTool, setActiveTool] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(true);

  const tools = [
    {
      id: 'ruler',
      name: t('tools.ruler'),
      icon: Ruler,
      description: 'Measure distances and lengths',
      unit: 'cm/m',
      color: 'text-blue-500'
    },
    {
      id: 'protractor',
      name: t('tools.protractor'),
      icon: RotateCcw,
      description: 'Measure angles and rotations',
      unit: 'degrees',
      color: 'text-green-500'
    },
    {
      id: 'stopwatch',
      name: t('tools.stopwatch'),
      icon: Timer,
      description: 'Measure time intervals',
      unit: 'seconds',
      color: 'text-orange-500'
    },
    {
      id: 'velocimeter',
      name: 'Velocimeter',
      icon: Activity,
      description: 'Measure velocity and speed',
      unit: 'm/s',
      color: 'text-purple-500'
    },
    {
      id: 'voltmeter',
      name: t('tools.voltmeter'),
      icon: Zap,
      description: 'Measure electrical voltage',
      unit: 'volts',
      color: 'text-yellow-500'
    },
    {
      id: 'gauge',
      name: 'Force Gauge',
      icon: Gauge,
      description: 'Measure forces and pressures',
      unit: 'N/Pa',
      color: 'text-red-500'
    },
  ];

  const handleToolClick = (toolId: string) => {
    const newTool = activeTool === toolId ? null : toolId;
    setActiveTool(newTool);
    onToolSelect?.(newTool || '');
  };

  return (
    <Card className={cn("measurement-tools", className)}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center space-x-2">
            <Move3D className="h-5 w-5 text-primary" />
            <span>{t('tools.measurement')}</span>
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsVisible(!isVisible)}
            className="h-8 w-8 p-0"
          >
            {isVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </Button>
        </div>
      </CardHeader>
      
      {isVisible && (
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-2">
            {tools.map((tool) => {
              const Icon = tool.icon;
              const isActive = activeTool === tool.id;
              
              return (
                <Button
                  key={tool.id}
                  variant={isActive ? "default" : "outline"}
                  size="sm"
                  className={cn(
                    "h-auto p-3 flex flex-col items-center space-y-1 transition-smooth",
                    isActive && "shadow-medium scale-105"
                  )}
                  onClick={() => handleToolClick(tool.id)}
                >
                  <Icon className={cn("h-5 w-5", isActive ? "text-primary-foreground" : tool.color)} />
                  <span className="text-xs font-medium text-center leading-tight">
                    {tool.name}
                  </span>
                  <Badge 
                    variant={isActive ? "secondary" : "outline"} 
                    className="text-xs px-1"
                  >
                    {tool.unit}
                  </Badge>
                </Button>
              );
            })}
          </div>
          
          {activeTool && (
            <div className="mt-4 p-3 bg-accent/50 rounded-lg border">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
                <span className="text-sm font-medium">
                  {tools.find(t => t.id === activeTool)?.name}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                {tools.find(t => t.id === activeTool)?.description}
              </p>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Status:</span>
                <Badge variant="default" className="text-xs">
                  Active
                </Badge>
              </div>
            </div>
          )}
          
          <div className="pt-2 border-t">
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full"
              onClick={() => setActiveTool(null)}
            >
              Clear All Tools
            </Button>
          </div>
        </CardContent>
      )}
    </Card>
  );
};