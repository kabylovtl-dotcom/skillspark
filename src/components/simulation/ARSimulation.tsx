import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Smartphone, 
  Eye, 
  Download, 
  ExternalLink,
  Info,
  Play,
  BookOpen,
  QrCode,
  Globe,
  Zap
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const ARSimulation = () => {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      {/* AR Experience Header */}
      <Card className="border-0 shadow-lg overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Globe className="h-8 w-8" />
              <div>
                <CardTitle className="text-2xl">{t('ar.title')}</CardTitle>
                <p className="text-purple-100 text-sm">{t('ar.subtitle')}</p>
              </div>
            </div>
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
              {t('ar.badge')}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="text-center space-y-4">
            <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto">
              <Zap className="h-10 w-10 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
              {t('ar.header.title')}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {t('ar.header.description')}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* QR Code Section */}
      <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-blue-800 dark:text-blue-200">
            <QrCode className="h-5 w-5" />
            <span>{t('ar.qr.title')}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <div className="max-w-md mx-auto">
            <div className="bg-white p-6 rounded-2xl shadow-lg inline-block">
              {/* Простой и четкий QR код */}
              <div className="w-64 h-64 bg-white rounded-lg flex items-center justify-center relative overflow-hidden">
                <div className="w-64 h-64 bg-white relative">
                  {/* QR код созданный прямо в HTML для максимальной четкости */}
                  <div className="absolute inset-0 grid grid-cols-21 grid-rows-21">
                    {/* Верхний левый угловой маркер */}
                    <div className="col-span-7 row-span-7 bg-black"></div>
                    <div className="col-span-5 row-span-5 bg-white col-start-2 row-start-2"></div>
                    <div className="col-span-3 row-span-3 bg-black col-start-3 row-start-3"></div>
                    
                    {/* Верхний правый угловой маркер */}
                    <div className="col-span-7 row-span-7 bg-black col-start-14 row-start-1"></div>
                    <div className="col-span-5 row-span-5 bg-white col-start-15 row-start-2"></div>
                    <div className="col-span-3 row-span-3 bg-black col-start-16 row-start-3"></div>
                    
                    {/* Нижний левый угловой маркер */}
                    <div className="col-span-7 row-span-7 bg-black col-start-1 row-start-14"></div>
                    <div className="col-span-5 row-span-5 bg-white col-start-2 row-start-15"></div>
                    <div className="col-span-3 row-span-3 bg-black col-start-3 row-start-16"></div>
                    
                    {/* Синхронизационные линии */}
                    <div className="col-span-1 row-span-1 bg-black col-start-8 row-start-1"></div>
                    <div className="col-span-1 row-span-1 bg-black col-start-10 row-start-1"></div>
                    <div className="col-span-1 row-span-1 bg-black col-start-12 row-start-1"></div>
                    <div className="col-span-1 row-span-1 bg-black col-start-14 row-start-1"></div>
                    
                    <div className="col-span-1 row-span-1 bg-black col-start-1 row-start-8"></div>
                    <div className="col-span-1 row-span-1 bg-black col-start-1 row-start-10"></div>
                    <div className="col-span-1 row-span-1 bg-black col-start-1 row-start-12"></div>
                    <div className="col-span-1 row-span-1 bg-black col-start-1 row-start-14"></div>
                    
                    <div className="col-span-1 row-span-1 bg-black col-start-20 row-start-8"></div>
                    <div className="col-span-1 row-span-1 bg-black col-start-20 row-start-10"></div>
                    <div className="col-span-1 row-span-1 bg-black col-start-20 row-start-12"></div>
                    <div className="col-span-1 row-span-1 bg-black col-start-20 row-start-14"></div>
                    
                    <div className="col-span-1 row-span-1 bg-black col-start-8 row-start-20"></div>
                    <div className="col-span-1 row-span-1 bg-black col-start-10 row-start-20"></div>
                    <div className="col-span-1 row-span-1 bg-black col-start-12 row-start-20"></div>
                    <div className="col-span-1 row-span-1 bg-black col-start-14 row-start-20"></div>
                    
                    {/* Центральный логотип AR */}
                    <div className="col-span-3 row-span-3 bg-blue-500 col-start-9 row-start-9 rounded"></div>
                    <div className="col-span-3 row-span-3 bg-blue-500 col-start-9 row-start-9 flex items-center justify-center text-white font-bold text-xs">AR</div>
                    
                    {/* Простой паттерн данных */}
                    <div className="col-span-1 row-span-1 bg-black col-start-8 row-start-3"></div>
                    <div className="col-span-1 row-span-1 bg-black col-start-10 row-start-3"></div>
                    <div className="col-span-1 row-span-1 bg-black col-start-12 row-start-3"></div>
                    <div className="col-span-1 row-span-1 bg-black col-start-14 row-start-3"></div>
                    
                    <div className="col-span-1 row-span-1 bg-black col-start-8 row-start-4"></div>
                    <div className="col-span-1 row-span-1 bg-white col-start-9 row-start-4"></div>
                    <div className="col-span-1 row-span-1 bg-black col-start-10 row-start-4"></div>
                    <div className="col-span-1 row-span-1 bg-white col-start-11 row-start-4"></div>
                    <div className="col-span-1 row-span-1 bg-black col-start-12 row-start-4"></div>
                    <div className="col-span-1 row-span-1 bg-white col-start-13 row-start-4"></div>
                    <div className="col-span-1 row-span-1 bg-black col-start-14 row-start-4"></div>
                    
                    <div className="col-span-1 row-span-1 bg-black col-start-8 row-start-5"></div>
                    <div className="col-span-1 row-span-1 bg-white col-start-9 row-start-5"></div>
                    <div className="col-span-1 row-span-1 bg-black col-start-10 row-start-5"></div>
                    <div className="col-span-1 row-span-1 bg-white col-start-11 row-start-5"></div>
                    <div className="col-span-1 row-span-1 bg-black col-start-12 row-start-5"></div>
                    <div className="col-span-1 row-span-1 bg-white col-start-13 row-start-5"></div>
                    <div className="col-span-1 row-span-1 bg-black col-start-14 row-start-5"></div>
                    
                    {/* Левая область */}
                    <div className="col-span-1 row-span-1 bg-black col-start-3 row-start-8"></div>
                    <div className="col-span-1 row-span-1 bg-white col-start-4 row-start-8"></div>
                    <div className="col-span-1 row-span-1 bg-black col-start-5 row-start-8"></div>
                    <div className="col-span-1 row-span-1 bg-white col-start-6 row-start-8"></div>
                    <div className="col-span-1 row-span-1 bg-black col-start-7 row-start-8"></div>
                    
                    <div className="col-span-1 row-span-1 bg-white col-start-3 row-start-9"></div>
                    <div className="col-span-1 row-span-1 bg-black col-start-4 row-start-9"></div>
                    <div className="col-span-1 row-span-1 bg-white col-start-5 row-start-9"></div>
                    <div className="col-span-1 row-span-1 bg-black col-start-6 row-start-9"></div>
                    <div className="col-span-1 row-span-1 bg-white col-start-7 row-start-9"></div>
                    
                    <div className="col-span-1 row-span-1 bg-black col-start-3 row-start-10"></div>
                    <div className="col-span-1 row-span-1 bg-white col-start-4 row-start-10"></div>
                    <div className="col-span-1 row-span-1 bg-black col-start-5 row-start-10"></div>
                    <div className="col-span-1 row-span-1 bg-white col-start-6 row-start-10"></div>
                    <div className="col-span-1 row-span-1 bg-black col-start-7 row-start-10"></div>
                    
                    {/* Правая область */}
                    <div className="col-span-1 row-span-1 bg-black col-start-14 row-start-8"></div>
                    <div className="col-span-1 row-span-1 bg-white col-start-15 row-start-8"></div>
                    <div className="col-span-1 row-span-1 bg-black col-start-16 row-start-8"></div>
                    <div className="col-span-1 row-span-1 bg-white col-start-17 row-start-8"></div>
                    <div className="col-span-1 row-span-1 bg-black col-start-18 row-start-8"></div>
                    
                    <div className="col-span-1 row-span-1 bg-white col-start-14 row-start-9"></div>
                    <div className="col-span-1 row-span-1 bg-black col-start-15 row-start-9"></div>
                    <div className="col-span-1 row-span-1 bg-white col-start-16 row-start-9"></div>
                    <div className="col-span-1 row-span-1 bg-black col-start-17 row-start-9"></div>
                    <div className="col-span-1 row-span-1 bg-white col-start-18 row-start-9"></div>
                    
                    <div className="col-span-1 row-span-1 bg-black col-start-14 row-start-10"></div>
                    <div className="col-span-1 row-span-1 bg-white col-start-15 row-start-10"></div>
                    <div className="col-span-1 row-span-1 bg-black col-start-16 row-start-10"></div>
                    <div className="col-span-1 row-span-1 bg-white col-start-17 row-start-10"></div>
                    <div className="col-span-1 row-span-1 bg-black col-start-18 row-start-10"></div>
                    
                    {/* Нижняя область */}
                    <div className="col-span-1 row-span-1 bg-black col-start-3 row-start-14"></div>
                    <div className="col-span-1 row-span-1 bg-white col-start-4 row-start-14"></div>
                    <div className="col-span-1 row-span-1 bg-black col-start-5 row-start-14"></div>
                    <div className="col-span-1 row-span-1 bg-white col-start-6 row-start-14"></div>
                    <div className="col-span-1 row-span-1 bg-black col-start-7 row-start-14"></div>
                    <div className="col-span-1 row-span-1 bg-white col-start-8 row-start-14"></div>
                    <div className="col-span-1 row-span-1 bg-black col-start-9 row-start-14"></div>
                    <div className="col-span-1 row-span-1 bg-white col-start-10 row-start-14"></div>
                    <div className="col-span-1 row-span-1 bg-black col-start-11 row-start-14"></div>
                    <div className="col-span-1 row-span-1 bg-white col-start-12 row-start-14"></div>
                    <div className="col-span-1 row-span-1 bg-black col-start-13 row-start-14"></div>
                    <div className="col-span-1 row-span-1 bg-white col-start-14 row-start-14"></div>
                    <div className="col-span-1 row-span-1 bg-black col-start-15 row-start-14"></div>
                    <div className="col-span-1 row-span-1 bg-white col-start-16 row-start-14"></div>
                    <div className="col-span-1 row-span-1 bg-black col-start-17 row-start-14"></div>
                    <div className="col-span-1 row-span-1 bg-white col-start-18 row-start-14"></div>
                    
                    <div className="col-span-1 row-span-1 bg-black col-start-8 row-start-15"></div>
                    <div className="col-span-1 row-span-1 bg-white col-start-9 row-start-15"></div>
                    <div className="col-span-1 row-span-1 bg-black col-start-10 row-start-15"></div>
                    <div className="col-span-1 row-span-1 bg-white col-start-11 row-start-15"></div>
                    <div className="col-span-1 row-span-1 bg-black col-start-12 row-start-15"></div>
                    <div className="col-span-1 row-span-1 bg-white col-start-13 row-start-15"></div>
                    <div className="col-span-1 row-span-1 bg-black col-start-14 row-start-15"></div>
                    
                    <div className="col-span-1 row-span-1 bg-black col-start-8 row-start-16"></div>
                    <div className="col-span-1 row-span-1 bg-white col-start-9 row-start-16"></div>
                    <div className="col-span-1 row-span-1 bg-black col-start-10 row-start-16"></div>
                    <div className="col-span-1 row-span-1 bg-white col-start-11 row-start-16"></div>
                    <div className="col-span-1 row-span-1 bg-black col-start-12 row-start-16"></div>
                    <div className="col-span-1 row-span-1 bg-white col-start-13 row-start-16"></div>
                    <div className="col-span-1 row-span-1 bg-black col-start-14 row-start-16"></div>
                    
                    <div className="col-span-1 row-span-1 bg-black col-start-8 row-start-17"></div>
                    <div className="col-span-1 row-span-1 bg-white col-start-9 row-start-17"></div>
                    <div className="col-span-1 row-span-1 bg-black col-start-10 row-start-17"></div>
                    <div className="col-span-1 row-span-1 bg-white col-start-11 row-start-17"></div>
                    <div className="col-span-1 row-span-1 bg-black col-start-12 row-start-17"></div>
                    <div className="col-span-1 row-span-1 bg-white col-start-13 row-start-17"></div>
                    <div className="col-span-1 row-span-1 bg-black col-start-14 row-start-17"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <h4 className="text-lg font-semibold text-blue-700 dark:text-blue-300">
              {t('ar.qr.instructions.title')}
            </h4>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">1</div>
                <span className="text-blue-600 dark:text-blue-400">{t('ar.qr.step1')}</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">2</div>
                <span className="text-blue-600 dark:text-blue-400">{t('ar.qr.step2')}</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">3</div>
                <span className="text-blue-600 dark:text-blue-400">{t('ar.qr.step3')}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AR Features */}
      <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-green-800 dark:text-green-200">
            <Eye className="h-5 w-5" />
            <span>{t('ar.features.title')}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Smartphone className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-green-700 dark:text-green-300 mb-1">
                    {t('ar.features.3d.title')}
                  </h4>
                  <p className="text-green-600 dark:text-green-400 text-sm">
                    {t('ar.features.3d.desc')}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Globe className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-green-700 dark:text-green-300 mb-1">
                    {t('ar.features.interactive.title')}
                  </h4>
                  <p className="text-green-600 dark:text-green-400 text-sm">
                    {t('ar.features.interactive.desc')}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Zap className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-green-700 dark:text-green-300 mb-1">
                    {t('ar.features.visual.title')}
                  </h4>
                  <p className="text-green-600 dark:text-green-400 text-sm">
                    {t('ar.features.visual.desc')}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <BookOpen className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-green-700 dark:text-green-300 mb-1">
                    {t('ar.features.personalized.title')}
                  </h4>
                  <p className="text-green-600 dark:text-green-400 text-sm">
                    {t('ar.features.personalized.desc')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* How AR Works */}
      <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-orange-800 dark:text-orange-200">
            <Info className="h-5 w-5" />
            <span>{t('ar.how.title')}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <Smartphone className="h-8 w-8 text-white" />
              </div>
              <h4 className="font-semibold text-orange-700 dark:text-orange-300 mb-2">
                {t('ar.how.camera.title')}
              </h4>
              <p className="text-orange-600 dark:text-orange-400 text-sm">
                {t('ar.how.camera.desc')}
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <Globe className="h-8 w-8 text-white" />
              </div>
              <h4 className="font-semibold text-orange-700 dark:text-orange-300 mb-2">
                {t('ar.how.engine.title')}
              </h4>
              <p className="text-orange-600 dark:text-orange-400 text-sm">
                {t('ar.how.engine.desc')}
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <Eye className="h-8 w-8 text-white" />
              </div>
              <h4 className="font-semibold text-orange-700 dark:text-orange-300 mb-2">
                {t('ar.how.overlay.title')}
              </h4>
              <p className="text-orange-600 dark:text-orange-400 text-sm">
                {t('ar.how.overlay.desc')}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Try More AR Experiences */}
      <Card className="border-0 shadow-lg bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-950/20 dark:to-blue-950/20">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-cyan-800 dark:text-cyan-200">
            <Play className="h-5 w-5" />
            <span>{t('ar.more.title')}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <Button 
              variant="outline" 
              className="justify-start h-auto p-4 border-cyan-200 hover:border-cyan-300 hover:bg-cyan-50 dark:border-cyan-700 dark:hover:border-cyan-600 dark:hover:bg-cyan-950/20"
            >
              <div className="text-left">
                <div className="font-semibold text-cyan-700 dark:text-cyan-300">
                  {t('ar.more.molecules.title')}
                </div>
                <div className="text-sm text-cyan-600 dark:text-cyan-400">
                  {t('ar.more.molecules.desc')}
                </div>
              </div>
            </Button>
            <Button 
              variant="outline" 
              className="justify-start h-auto p-4 border-cyan-200 hover:border-cyan-300 hover:bg-cyan-50 dark:border-cyan-700 dark:hover:border-cyan-600 dark:hover:bg-cyan-950/20"
            >
              <div className="text-left">
                <div className="font-semibold text-cyan-700 dark:text-cyan-300">
                  {t('ar.more.solar.title')}
                </div>
                <div className="text-sm text-cyan-600 dark:text-cyan-400">
                  {t('ar.more.solar.desc')}
                </div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Download AR Apps */}
      <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-purple-800 dark:text-purple-200">
            <Download className="h-5 w-5" />
            <span>{t('ar.download.title')}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-purple-700 dark:text-purple-300">
            {t('ar.download.description')}
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <Button 
              variant="outline" 
              size="lg"
              className="border-purple-200 text-purple-700 hover:bg-purple-50 dark:border-purple-700 dark:text-purple-300 dark:hover:bg-purple-950/20"
            >
              <Download className="h-4 w-4 mr-2" />
              {t('ar.download.ios')}
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-purple-200 text-purple-700 hover:bg-purple-50 dark:border-purple-700 dark:text-purple-300 dark:hover:bg-purple-950/20"
            >
              <Download className="h-4 w-4 mr-2" />
              {t('ar.download.android')}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ARSimulation;
