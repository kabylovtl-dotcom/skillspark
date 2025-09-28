import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import FileUpload from '@/components/ui/file-upload';
import { useAuthStore } from '@/store/authStore';
import { useClassStore } from '@/store/classStore';
import { 
  Plus, 
  FileText, 
  Download, 
  ExternalLink, 
  Trash2, 
  Edit3,
  Search,
  Filter,
  BookOpen,
  Image,
  File,
  Video
} from 'lucide-react';

interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'file' | 'link' | 'video';
  url?: string;
  file?: {
    name: string;
    size: number;
    type: string;
  };
  category: string;
  uploadedBy: string;
  uploadedAt: Date;
  downloads?: number;
  tags: string[];
}

const ResourcesPage: React.FC = () => {
  const { user } = useAuthStore();
  const { currentClass } = useClassStore();
  const [resources, setResources] = useState<Resource[]>([]);
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [newResource, setNewResource] = useState({
    title: '',
    description: '',
    type: 'file' as Resource['type'],
    url: '',
    category: 'lesson',
    tags: ''
  });
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([]);

  const isTeacher = user?.role === 'teacher';

  // Mock resources data
  useEffect(() => {
    const mockResources: Resource[] = [
      {
        id: '1',
        title: 'Лекция по механике',
        description: 'Основы механики и законы Ньютона',
        type: 'file',
        file: {
          name: 'mechanics_lecture.pdf',
          size: 2.5 * 1024 * 1024,
          type: 'application/pdf'
        },
        category: 'lesson',
        uploadedBy: 'Анна Петровна',
        uploadedAt: new Date('2024-01-15'),
        downloads: 15,
        tags: ['механика', 'физика', 'лекция']
      },
      {
        id: '2',
        title: 'Интерактивная симуляция маятника',
        description: '3D симуляция движения маятника с различными параметрами',
        type: 'link',
        url: 'https://phet.colorado.edu/sims/html/pendulum-lab/latest/pendulum-lab_en.html',
        category: 'simulation',
        uploadedBy: 'Анна Петровна',
        uploadedAt: new Date('2024-01-20'),
        downloads: 8,
        tags: ['симуляция', 'маятник', 'интерактив']
      },
      {
        id: '3',
        title: 'Видео: Законы Ньютона',
        description: 'Объяснение трех законов Ньютона с примерами',
        type: 'video',
        url: 'https://youtube.com/watch?v=example',
        category: 'video',
        uploadedBy: 'Анна Петровна',
        uploadedAt: new Date('2024-01-25'),
        downloads: 12,
        tags: ['видео', 'ньютон', 'законы']
      }
    ];
    setResources(mockResources);
  }, []);

  const categories = [
    { id: 'all', name: 'Все', count: resources.length },
    { id: 'lesson', name: 'Уроки', count: resources.filter(r => r.category === 'lesson').length },
    { id: 'simulation', name: 'Симуляции', count: resources.filter(r => r.category === 'simulation').length },
    { id: 'video', name: 'Видео', count: resources.filter(r => r.category === 'video').length },
    { id: 'homework', name: 'Задания', count: resources.filter(r => r.category === 'homework').length }
  ];

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleFileSelect = (file: File) => {
    const fileId = Date.now().toString();
    setUploadedFiles(prev => [...prev, {
      id: fileId,
      file,
      status: 'uploading',
      progress: 0
    }]);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadedFiles(prev => prev.map(f => 
        f.id === fileId 
          ? { ...f, progress: Math.min((f.progress || 0) + 10, 100) }
          : f
      ));
    }, 200);

    setTimeout(() => {
      clearInterval(interval);
      setUploadedFiles(prev => prev.map(f => 
        f.id === fileId 
          ? { ...f, status: 'success', progress: 100 }
          : f
      ));
    }, 2000);
  };

  const handleFileRemove = (fileId: string) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== fileId));
  };

  const handleUpload = () => {
    if (!newResource.title.trim()) return;

    const resource: Resource = {
      id: Date.now().toString(),
      title: newResource.title,
      description: newResource.description,
      type: newResource.type,
      url: newResource.type !== 'file' ? newResource.url : undefined,
      file: uploadedFiles[0]?.file ? {
        name: uploadedFiles[0].file.name,
        size: uploadedFiles[0].file.size,
        type: uploadedFiles[0].file.type
      } : undefined,
      category: newResource.category,
      uploadedBy: user?.name || 'Неизвестно',
      uploadedAt: new Date(),
      downloads: 0,
      tags: newResource.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
    };

    setResources(prev => [resource, ...prev]);
    setNewResource({
      title: '',
      description: '',
      type: 'file',
      url: '',
      category: 'lesson',
      tags: ''
    });
    setUploadedFiles([]);
    setShowUploadDialog(false);
  };

  const handleDownload = (resource: Resource) => {
    if (resource.type === 'file') {
      // Simulate download
      console.log('Downloading file:', resource.file?.name);
    } else {
      window.open(resource.url, '_blank');
    }
  };

  const handleDelete = (resourceId: string) => {
    setResources(prev => prev.filter(r => r.id !== resourceId));
  };

  const getResourceIcon = (resource: Resource) => {
    switch (resource.type) {
      case 'file':
        if (resource.file?.type === 'application/pdf') return <FileText className="h-5 w-5" />;
        if (resource.file?.type.startsWith('image/')) return <Image className="h-5 w-5" />;
        if (resource.file?.type.startsWith('video/')) return <Video className="h-5 w-5" />;
        return <File className="h-5 w-5" />;
      case 'link':
        return <ExternalLink className="h-5 w-5" />;
      case 'video':
        return <Video className="h-5 w-5" />;
      default:
        return <BookOpen className="h-5 w-5" />;
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-200">
                Ресурсы
              </h1>
              <p className="text-slate-600 dark:text-slate-400 mt-2">
                {currentClass?.name || 'Выберите класс'}
              </p>
            </div>
            
            {isTeacher && (
              <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Добавить ресурс
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Добавить новый ресурс</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="title">Название</Label>
                        <Input
                          id="title"
                          value={newResource.title}
                          onChange={(e) => setNewResource(prev => ({ ...prev, title: e.target.value }))}
                          placeholder="Название ресурса"
                        />
                      </div>
                      <div>
                        <Label htmlFor="category">Категория</Label>
                        <select
                          id="category"
                          value={newResource.category}
                          onChange={(e) => setNewResource(prev => ({ ...prev, category: e.target.value }))}
                          className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200"
                        >
                          <option value="lesson">Урок</option>
                          <option value="simulation">Симуляция</option>
                          <option value="video">Видео</option>
                          <option value="homework">Задание</option>
                        </select>
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="description">Описание</Label>
                      <Textarea
                        id="description"
                        value={newResource.description}
                        onChange={(e) => setNewResource(prev => ({ ...prev, description: e.target.value }))}
                        placeholder="Описание ресурса"
                        rows={3}
                      />
                    </div>
                    
                    <div>
                      <Label>Тип ресурса</Label>
                      <div className="flex gap-4 mt-2">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            value="file"
                            checked={newResource.type === 'file'}
                            onChange={(e) => setNewResource(prev => ({ ...prev, type: e.target.value as Resource['type'] }))}
                            className="mr-2"
                          />
                          Файл
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            value="link"
                            checked={newResource.type === 'link'}
                            onChange={(e) => setNewResource(prev => ({ ...prev, type: e.target.value as Resource['type'] }))}
                            className="mr-2"
                          />
                          Ссылка
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            value="video"
                            checked={newResource.type === 'video'}
                            onChange={(e) => setNewResource(prev => ({ ...prev, type: e.target.value as Resource['type'] }))}
                            className="mr-2"
                          />
                          Видео
                        </label>
                      </div>
                    </div>
                    
                    {newResource.type === 'file' && (
                      <div>
                        <Label>Загрузить файл</Label>
                        <FileUpload
                          onFileSelect={handleFileSelect}
                          onFileRemove={handleFileRemove}
                          files={uploadedFiles}
                          maxFiles={1}
                          maxSize={50}
                        />
                      </div>
                    )}
                    
                    {(newResource.type === 'link' || newResource.type === 'video') && (
                      <div>
                        <Label htmlFor="url">URL</Label>
                        <Input
                          id="url"
                          value={newResource.url}
                          onChange={(e) => setNewResource(prev => ({ ...prev, url: e.target.value }))}
                          placeholder="https://example.com"
                        />
                      </div>
                    )}
                    
                    <div>
                      <Label htmlFor="tags">Теги (через запятую)</Label>
                      <Input
                        id="tags"
                        value={newResource.tags}
                        onChange={(e) => setNewResource(prev => ({ ...prev, tags: e.target.value }))}
                        placeholder="физика, механика, урок"
                      />
                    </div>
                    
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        onClick={() => setShowUploadDialog(false)}
                      >
                        Отмена
                      </Button>
                      <Button
                        onClick={handleUpload}
                        disabled={!newResource.title.trim() || (newResource.type === 'file' && uploadedFiles.length === 0)}
                      >
                        Загрузить
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>

          {/* Search and Filter */}
          <div className="flex gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Поиск ресурсов..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              {categories.map((category) => (
                <Button
                  variant={selectedCategory === category.id ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {category.name} ({category.count})
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Resources Grid */}
        <div
        >
          {filteredResources.length === 0 ? (
            <Card className="border-dashed border-2 border-slate-300 dark:border-slate-600">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <div className="w-16 h-16 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center mb-4">
                  <BookOpen className="h-8 w-8 text-slate-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-2">
                  Ресурсы не найдены
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-center mb-4">
                  {searchQuery ? 'Попробуйте изменить поисковый запрос' : 'Добавьте первый ресурс для класса'}
                </p>
                {isTeacher && (
                  <Button
                    onClick={() => setShowUploadDialog(true)}
                    className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Добавить ресурс
                  </Button>
                )}
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources.map((resource) => (
                <div
                  className="group"
                >
                  <Card className="h-full hover:shadow-lg transition-all duration-200">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                            {getResourceIcon(resource)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <CardTitle className="text-lg text-slate-800 dark:text-slate-200 truncate">
                              {resource.title}
                            </CardTitle>
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                              {resource.uploadedBy} • {resource.uploadedAt.toLocaleDateString('ru-RU')}
                            </p>
                          </div>
                        </div>
                        {isTeacher && (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDelete(resource.id)}
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        )}
                      </div>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
                        {resource.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-1">
                        {resource.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-500">
                          {resource.file && (
                            <span>{formatFileSize(resource.file.size)}</span>
                          )}
                          {resource.downloads !== undefined && (
                            <span>{resource.downloads} скачиваний</span>
                          )}
                        </div>
                        
                        <Button
                          size="sm"
                          onClick={() => handleDownload(resource)}
                          className="bg-purple-600 hover:bg-purple-700"
                        >
                          <Download className="h-4 w-4 mr-2" />
                          {resource.type === 'file' ? 'Скачать' : 'Открыть'}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResourcesPage;
