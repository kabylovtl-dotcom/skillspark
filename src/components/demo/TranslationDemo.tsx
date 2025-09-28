import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Globe, 
  BookOpen, 
  Calculator, 
  Atom, 
  Code, 
  Users, 
  BarChart3, 
  Award,
  Calendar,
  FileText,
  Settings,
  HelpCircle
} from 'lucide-react';
import AnimatedText from '@/components/ui/AnimatedText';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';

export default function TranslationDemo() {
  const { t } = useTranslation();

  const features = [
    { key: 'features.interactiveSimulations', icon: Atom, color: 'bg-blue-500' },
    { key: 'features.liveClassrooms', icon: Users, color: 'bg-green-500' },
    { key: 'features.multilingualSupport', icon: Globe, color: 'bg-purple-500' },
    { key: 'features.adaptiveLearning', icon: BookOpen, color: 'bg-orange-500' },
    { key: 'features.progressTracking', icon: BarChart3, color: 'bg-red-500' },
    { key: 'features.collaborativeTools', icon: Code, color: 'bg-indigo-500' },
  ];

  const subjects = [
    { key: 'physics', icon: Atom },
    { key: 'mathematics', icon: Calculator },
    { key: 'chemistry', icon: BookOpen },
    { key: 'biology', icon: BookOpen },
    { key: 'computerScience', icon: Code },
    { key: 'engineering', icon: Settings },
  ];

  const navigationItems = [
    { key: 'navigation.home', icon: BookOpen },
    { key: 'navigation.dashboard', icon: BarChart3 },
    { key: 'navigation.classroom', icon: Users },
    { key: 'navigation.lessons', icon: BookOpen },
    { key: 'navigation.simulations', icon: Atom },
    { key: 'navigation.homework', icon: FileText },
    { key: 'navigation.statistics', icon: BarChart3 },
    { key: 'navigation.profile', icon: Users },
    { key: 'navigation.settings', icon: Settings },
    { key: 'navigation.help', icon: HelpCircle },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-violet-50 dark:from-slate-900 dark:via-purple-900 dark:to-indigo-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div
          className="text-center mb-12"
        >
          <div className="flex justify-center items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center">
              <span className="text-white font-bold text-2xl">Δ</span>
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              <AnimatedText translationKey="appName" />
            </h1>
          </div>
          
          <p className="text-xl text-slate-600 dark:text-slate-400 mb-6">
            <AnimatedText translationKey="welcomeMessage" delay={0.2} />
          </p>
          
          <div className="flex justify-center">
            <LanguageSwitcher />
          </div>
        </div>

        {/* Features Grid */}
        <div
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-center mb-8">
            <AnimatedText translationKey="features.title" />
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
              >
                <Card className="hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center mb-4`}>
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">
                      <AnimatedText translationKey={feature.key} />
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400">
                      <AnimatedText translationKey={`${feature.key}.description`} />
                    </p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Subjects */}
        <div
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-center mb-8">
            <AnimatedText translationKey="subjects" />
          </h2>
          
          <div className="flex flex-wrap justify-center gap-4">
            {subjects.map((subject, index) => (
              <div
              >
                <Badge variant="secondary" className="px-4 py-2 text-sm">
                  <subject.icon className="h-4 w-4 mr-2" />
                  <AnimatedText translationKey={subject.key} />
                </Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Demo */}
        <div
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-center mb-8">
            <AnimatedText translationKey="navigation.title" />
          </h2>
          
          <Card>
            <CardHeader>
              <CardTitle>
                <AnimatedText translationKey="navigation.title" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {navigationItems.map((item, index) => (
                  <div
                  >
                    <Button variant="outline" className="w-full h-auto p-4 flex flex-col items-center gap-2">
                      <item.icon className="h-5 w-5" />
                      <span className="text-xs">
                        <AnimatedText translationKey={item.key} />
                      </span>
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div
          className="text-center text-slate-600 dark:text-slate-400"
        >
          <p className="mb-2">
            <AnimatedText translationKey="copyright" />
          </p>
          <p>
            <AnimatedText translationKey="developedBy" />
          </p>
        </div>
      </div>
    </div>
  );
}
