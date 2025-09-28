import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { SimulationParams } from '@/types';
import { Play, Square, RotateCcw, Settings } from 'lucide-react';

interface SimulationControlPanelProps {
  onParamsChange: (params: SimulationParams) => void;
  className?: string;
}

const SimulationControlPanel: React.FC<SimulationControlPanelProps> = ({ 
  onParamsChange, 
  className = '' 
}) => {
  const [params, setParams] = useState<SimulationParams>({
    length: 2.0,
    mass: 1.0,
    initialAngle: 0.3,
    damping: 0.02
  });

  const [isPresenting, setIsPresenting] = useState(false);

  const updateParam = (key: keyof SimulationParams, value: number) => {
    const newParams = { ...params, [key]: value };
    setParams(newParams);
    onParamsChange(newParams);
  };

  const resetToDefaults = () => {
    const defaults: SimulationParams = {
      length: 2.0,
      mass: 1.0,
      initialAngle: 0.3,
      damping: 0.02
    };
    setParams(defaults);
    onParamsChange(defaults);
  };

  const togglePresentation = () => {
    setIsPresenting(!isPresenting);
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5 text-purple-600" />
          Управление симуляцией
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Length Control */}
        <div className="space-y-3">
          <Label htmlFor="length" className="text-sm font-medium">
            Длина маятника: {params.length?.toFixed(2)} м
          </Label>
          <Slider
            id="length"
            min={0.5}
            max={5.0}
            step={0.1}
            value={[params.length || 2.0]}
            onValueChange={([value]) => updateParam('length', value)}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-slate-500">
            <span>0.5 м</span>
            <span>5.0 м</span>
          </div>
        </div>

        {/* Mass Control */}
        <div className="space-y-3">
          <Label htmlFor="mass" className="text-sm font-medium">
            Масса груза: {params.mass?.toFixed(2)} кг
          </Label>
          <Slider
            id="mass"
            min={0.1}
            max={3.0}
            step={0.1}
            value={[params.mass || 1.0]}
            onValueChange={([value]) => updateParam('mass', value)}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-slate-500">
            <span>0.1 кг</span>
            <span>3.0 кг</span>
          </div>
        </div>

        {/* Initial Angle Control */}
        <div className="space-y-3">
          <Label htmlFor="angle" className="text-sm font-medium">
            Начальный угол: {(params.initialAngle ? params.initialAngle * 180 / Math.PI : 0).toFixed(1)}°
          </Label>
          <Slider
            id="angle"
            min={0}
            max={Math.PI / 2}
            step={0.01}
            value={[params.initialAngle || 0.3]}
            onValueChange={([value]) => updateParam('initialAngle', value)}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-slate-500">
            <span>0°</span>
            <span>90°</span>
          </div>
        </div>

        {/* Damping Control */}
        <div className="space-y-3">
          <Label htmlFor="damping" className="text-sm font-medium">
            Затухание: {params.damping?.toFixed(3)}
          </Label>
          <Slider
            id="damping"
            min={0}
            max={0.1}
            step={0.001}
            value={[params.damping || 0.02]}
            onValueChange={([value]) => updateParam('damping', value)}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-slate-500">
            <span>0.000</span>
            <span>0.100</span>
          </div>
        </div>

        {/* Manual Inputs */}
        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-200 dark:border-slate-700">
          <div>
            <Label htmlFor="length-input" className="text-xs text-slate-600 dark:text-slate-400">
              Длина (м)
            </Label>
            <Input
              id="length-input"
              type="number"
              min="0.5"
              max="5.0"
              step="0.1"
              value={params.length || 2.0}
              onChange={(e) => updateParam('length', parseFloat(e.target.value) || 2.0)}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="mass-input" className="text-xs text-slate-600 dark:text-slate-400">
              Масса (кг)
            </Label>
            <Input
              id="mass-input"
              type="number"
              min="0.1"
              max="3.0"
              step="0.1"
              value={params.mass || 1.0}
              onChange={(e) => updateParam('mass', parseFloat(e.target.value) || 1.0)}
              className="mt-1"
            />
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex gap-2 pt-4 border-t border-slate-200 dark:border-slate-700">
          <Button
            onClick={togglePresentation}
            className={`flex-1 ${
              isPresenting 
                ? 'bg-red-600 hover:bg-red-700' 
                : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700'
            }`}
          >
            {isPresenting ? (
              <>
                <Square className="h-4 w-4 mr-2" />
                Остановить
              </>
            ) : (
              <>
                <Play className="h-4 w-4 mr-2" />
                Транслировать
              </>
            )}
          </Button>
          
          <Button
            onClick={resetToDefaults}
            variant="outline"
            size="icon"
            title="Сбросить к значениям по умолчанию"
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>

        {/* Status */}
        <div className="text-center">
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${
            isPresenting 
              ? 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300'
              : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
          }`}>
            <div className={`w-2 h-2 rounded-full ${
              isPresenting ? 'bg-green-500 animate-pulse' : 'bg-slate-400'
            }`} />
            {isPresenting ? 'Трансляция активна' : 'Ожидание'}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SimulationControlPanel;
