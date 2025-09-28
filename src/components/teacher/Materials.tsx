import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { FileText, Upload, Download, Search, Plus, File, Trash2, Play, Settings } from 'lucide-react';
import PendulumSimulation from '@/components/simulation/PendulumSimulation';

interface Material {
  id: string;
  name: string;
  type: 'pdf' | 'doc' | 'ppt' | 'video' | 'simulation';
  size: string;
  uploadedAt: string;
  description: string;
}

interface Simulation {
  id: string;
  name: string;
  description: string;
  subject: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

const Materials: React.FC = () => {
  const [materials, setMaterials] = useState<Material[]>([
    {
      id: '1',
      name: 'Методическое пособие по физике',
      type: 'pdf',
      size: '2.4 MB',
      uploadedAt: '2024-01-10',
      description: 'Основы механики и термодинамики'
    },
    {
      id: '2',
      name: 'Презентация по математике',
      type: 'ppt',
      size: '5.1 MB',
      uploadedAt: '2024-01-12',
      description: 'Квадратные уравнения и графики'
    },
    {
      id: '3',
      name: 'Лабораторная работа №1',
      type: 'doc',
      size: '1.8 MB',
      uploadedAt: '2024-01-14',
      description: 'Эксперименты с электрическими цепями'
    },
    {
      id: '4',
      name: 'Симуляция маятника',
      type: 'simulation',
      size: 'Интерактивная',
      uploadedAt: '2024-01-15',
      description: 'Интерактивная симуляция гармонических колебаний'
    }
  ]);

  const [simulations] = useState<Simulation[]>([
    {
      id: '1',
      name: 'Лаборатория маятника',
      description: 'Интерактивная симуляция для изучения гармонических колебаний',
      subject: 'Физика',
      difficulty: 'beginner'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [selectedSimulation, setSelectedSimulation] = useState<string | null>(null);
  const [newMaterial, setNewMaterial] = useState({
    name: '',
    description: '',
    type: 'pdf' as 'pdf' | 'doc' | 'ppt' | 'video' | 'simulation'
  });

  const filteredMaterials = materials.filter(material =>
    material.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    material.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleUpload = () => {
    if (newMaterial.name && newMaterial.description) {
      const material: Material = {
        id: Date.now().toString(),
        name: newMaterial.name,
        type: newMaterial.type,
        size: '0 MB', // В реальном приложении размер файла
        uploadedAt: new Date().toISOString().split('T')[0],
        description: newMaterial.description
      };
      setMaterials(prev => [material, ...prev]);
      setNewMaterial({ name: '', description: '', type: 'pdf' });
      setIsUploadDialogOpen(false);
    }
  };

  const handleDelete = (id: string) => {
    if (confirm('Вы уверены, что хотите удалить этот материал?')) {
      setMaterials(prev => prev.filter(m => m.id !== id));
    }
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return <FileText className="h-5 w-5 text-red-500" />;
      case 'doc':
        return <File className="h-5 w-5 text-blue-500" />;
      case 'ppt':
        return <File className="h-5 w-5 text-orange-500" />;
      case 'video':
        return <File className="h-5 w-5 text-purple-500" />;
      case 'simulation':
        return <Play className="h-5 w-5 text-green-500" />;
      default:
        return <File className="h-5 w-5 text-slate-500" />;
    }
  };

  const getFileTypeLabel = (type: string) => {
    switch (type) {
      case 'pdf':
        return 'PDF';
      case 'doc':
        return 'Word';
      case 'ppt':
        return 'PowerPoint';
      case 'video':
        return 'Видео';
      case 'simulation':
        return 'Симуляция';
      default:
        return type.toUpperCase();
    }
  };

  const handleSimulationClick = (materialId: string) => {
    if (materialId === '4') { // Pendulum simulation
      setSelectedSimulation('1');
    }
  };

  return (
    <div className="space-y-6">
      <div
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-200">
              Методички
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mt-1">
              Управление учебными материалами и документами
            </p>
          </div>
          
          <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700">
                <Plus className="h-4 w-4 mr-2" />
                Загрузить материал
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Загрузить новый материал</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="material-name">Название</Label>
                  <Input
                    id="material-name"
                    value={newMaterial.name}
                    onChange={(e) => setNewMaterial(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Введите название материала"
                  />
                </div>
                <div>
                  <Label htmlFor="material-description">Описание</Label>
                  <Input
                    id="material-description"
                    value={newMaterial.description}
                    onChange={(e) => setNewMaterial(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Краткое описание материала"
                  />
                </div>
                <div>
                  <Label htmlFor="material-type">Тип файла</Label>
                  <select
                    id="material-type"
                    value={newMaterial.type}
                    onChange={(e) => setNewMaterial(prev => ({ ...prev, type: e.target.value as any }))}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-800"
                  >
                    <option value="pdf">PDF</option>
                    <option value="doc">Word</option>
                    <option value="ppt">PowerPoint</option>
                    <option value="video">Видео</option>
                  </select>
                </div>
                <div className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 text-slate-400 mx-auto mb-2" />
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Перетащите файл сюда или нажмите для выбора
                  </p>
                </div>
                <Button onClick={handleUpload} className="w-full">
                  Загрузить материал
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Поиск */}
      <div
      >
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Поиск материалов..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Список материалов */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMaterials.map((material, index) => (
          <div
          >
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    {getFileIcon(material.type)}
                    <div>
                      <h3 className="font-semibold text-slate-800 dark:text-slate-200 line-clamp-1">
                        {material.name}
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {getFileTypeLabel(material.type)} • {material.size}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(material.id)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-2">
                  {material.description}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    {material.uploadedAt}
                  </span>
                  <div className="flex gap-2">
                    {material.type === 'simulation' ? (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleSimulationClick(material.id)}
                      >
                        <Play className="h-4 w-4 mr-1" />
                        Запустить
                      </Button>
                    ) : (
                      <>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-1" />
                          Скачать
                        </Button>
                        <Button variant="outline" size="sm">
                          <FileText className="h-4 w-4 mr-1" />
                          Просмотр
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>

      {filteredMaterials.length === 0 && (
        <div
          className="text-center py-12"
        >
          <div className="w-24 h-24 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="h-12 w-12 text-slate-400" />
          </div>
          <h3 className="text-lg font-medium text-slate-800 dark:text-slate-200 mb-2">
            {searchTerm ? 'Материалы не найдены' : 'Нет материалов'}
          </h3>
          <p className="text-slate-600 dark:text-slate-400">
            {searchTerm 
              ? 'Попробуйте изменить поисковый запрос'
              : 'Загрузите первый учебный материал'
            }
          </p>
        </div>
      )}

      {/* Simulation Dialog */}
      <Dialog open={!!selectedSimulation} onOpenChange={() => setSelectedSimulation(null)}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {selectedSimulation && simulations.find(s => s.id === selectedSimulation)?.name}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {selectedSimulation && (
              <PendulumSimulation 
                isTeacherMode={true}
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Materials;
