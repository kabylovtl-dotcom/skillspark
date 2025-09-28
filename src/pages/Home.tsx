import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowRight, 
  Play, 
  Users, 
  BookOpen, 
  Award,
  Globe,
  Zap,
  Shield,
  Heart
} from 'lucide-react';
import AnimatedText from '@/components/ui/AnimatedText';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';

export default function Home() {
  const { t } = useTranslation();

  const features = [
    {
      icon: Play,
      title: 'features.interactiveSimulations',
      description: 'features.interactiveSimulations',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Users,
      title: 'features.liveClassrooms',
      description: 'features.liveClassrooms',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Globe,
      title: 'features.multilingualSupport',
      description: 'features.multilingualSupport',
      color: 'from-purple-500 to-violet-500'
    },
    {
      icon: BookOpen,
      title: 'features.adaptiveLearning',
      description: 'features.adaptiveLearning',
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: Award,
      title: 'features.progressTracking',
      description: 'features.progressTracking',
      color: 'from-pink-500 to-rose-500'
    },
    {
      icon: Zap,
      title: 'features.collaborativeTools',
      description: 'features.collaborativeTools',
      color: 'from-indigo-500 to-blue-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            {/* Language Switcher */}
            <div
              className="flex justify-center mb-8"
            >
              <LanguageSwitcher />
            </div>

            {/* Logo and Title */}
            <div
              className="mb-8"
            >
              <div className="flex justify-center items-center gap-4 mb-6">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-3xl flex items-center justify-center shadow-2xl">
                  <span className="text-white font-bold text-3xl">Δ</span>
                </div>
                <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent">
                  <AnimatedText translationKey="appName" />
                </h1>
              </div>
              
              <p className="text-2xl text-slate-600 dark:text-slate-400 mb-4">
                <AnimatedText translationKey="welcomeMessage" />
              </p>
              
              <p className="text-lg text-slate-500 dark:text-slate-500 max-w-3xl mx-auto">
                <AnimatedText translationKey="appDescription" />
              </p>
            </div>

            {/* CTA Buttons */}
            <div
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-lg px-8 py-4">
                <Play className="mr-2 h-5 w-5" />
                <AnimatedText translationKey="startLesson" />
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              
              <Button size="lg" variant="outline" className="text-lg px-8 py-4">
                <Users className="mr-2 h-5 w-5" />
                <AnimatedText translationKey="joinClass" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              <AnimatedText translationKey="features.title" />
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400">
              <AnimatedText translationKey="features.subtitle" />
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-8">
                    <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}>
                      <feature.icon className="h-8 w-8 text-white" />
                    </div>
                    
                    <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                      <AnimatedText translationKey={feature.title} />
                    </h3>
                    
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                      <AnimatedText translationKey={feature.description} />
                    </p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-4 gap-8"
          >
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">10K+</div>
              <div className="text-slate-600 dark:text-slate-400">
                <AnimatedText translationKey="students" />
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-indigo-600 mb-2">500+</div>
              <div className="text-slate-600 dark:text-slate-400">
                <AnimatedText translationKey="teachers" />
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">100+</div>
              <div className="text-slate-600 dark:text-slate-400">
                <AnimatedText translationKey="simulations" />
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">3</div>
              <div className="text-slate-600 dark:text-slate-400">
                <AnimatedText translationKey="languages" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="flex justify-center items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">Δ</span>
              </div>
              <h3 className="text-2xl font-bold">
                <AnimatedText translationKey="appName" />
              </h3>
            </div>
            
            <p className="text-slate-400 mb-6">
              <AnimatedText translationKey="copyright" />
            </p>
            
            <p className="text-slate-500 flex items-center justify-center gap-2">
              <Heart className="h-4 w-4 text-red-500" />
              <AnimatedText translationKey="developedBy" />
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
