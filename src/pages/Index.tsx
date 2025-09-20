import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import AIAssistant from "@/components/ui/ai-assistant";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { UsageScenariosSection } from "@/components/sections/UsageScenariosSection";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Play, 
  BookOpen, 
  Atom, 
  PenTool, 
  Users, 
  TrendingUp, 
  Star,
  ArrowRight,
  Sparkles,
  Rocket,
  Target,
  Zap,
  Brain,
  Globe,
  Microscope,
  Calculator,
  Telescope,
  Leaf,
  CheckCircle,
  Award,
  Layers
} from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import "./Index.css";

const Index = () => {
  const { t } = useLanguage();

  // Единая цветовая палитра - градиенты синего цвета
  const quickActions = [
    {
      icon: Play,
      title: t('quick.actions.simulations'),
      description: t('quick.actions.simulations.desc'),
      href: "/simulations"
    },
    {
      icon: BookOpen,
      title: t('quick.actions.lessons'),
      description: t('quick.actions.lessons.desc'),
      href: "/online-lessons"
    },
    {
      icon: PenTool,
      title: t('quick.actions.whiteboard'),
      description: t('quick.actions.whiteboard.desc'),
      href: "/about"
    }
  ];

  const stats = [
    { number: "50+", label: t('stats.simulations.count'), icon: Atom },
    { number: "1000+", label: t('stats.students.count'), icon: Users },
    { number: "95%", label: t('stats.teachers.count'), icon: Star },
    { number: "24/7", label: t('stats.lessons.count'), icon: Zap }
  ];

  const features = [
    {
      title: t('features.visual.title'),
      description: t('features.visual.desc'),
      icon: Target
    },
    {
      title: t('features.interactive.title'),
      description: t('features.interactive.desc'),
      icon: TrendingUp
    },
    {
      title: t('features.personalized.title'),
      description: t('features.personalized.desc'),
      icon: Sparkles
    }
  ];

  const technologies = [
    {
      icon: Brain,
      title: t('technologies.ai.title'),
      description: t('technologies.ai.desc')
    },
    {
      icon: Globe,
      title: t('technologies.ar.title'),
      description: t('technologies.ar.desc')
    },
    {
      icon: Microscope,
      title: t('technologies.vr.title'),
      description: t('technologies.vr.desc')
    },
    {
      icon: Calculator,
      title: t('technologies.cloud.title'),
      description: t('technologies.cloud.desc')
    }
  ];

  const achievements = [
    {
      number: "5000+",
      title: t('achievements.students.title'),
      description: t('achievements.students.desc'),
      icon: Users
    },
    {
      number: "200+",
      title: t('achievements.teachers.title'),
      description: t('achievements.teachers.desc'),
      icon: Star
    },
    {
      number: "50+",
      title: t('achievements.schools.title'),
      description: t('achievements.schools.desc'),
      icon: Award
    },
    {
      number: "1000+",
      title: t('achievements.lessons.title'),
      description: t('achievements.lessons.desc'),
      icon: BookOpen
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        {/* Unified Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-indigo-600/5 to-purple-600/5">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-float-delayed"></div>
          <div className="absolute bottom-1/4 left-3/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float-slow"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-6xl mx-auto">
            <Badge variant="outline" className="mb-8 px-6 py-3 text-lg bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300">
              {t('hero.badge')}
            </Badge>

            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-8 animate-slide-up">
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                {t('hero.title.skillspark')}
              </span>
              <br />
              <span className="text-slate-800 dark:text-slate-100">{t('hero.title.kg')}</span>
            </h1>

            <p className="text-2xl md:text-3xl text-slate-600 dark:text-slate-300 max-w-4xl mx-auto mb-12 leading-relaxed animate-slide-up-delayed">
              {t('hero.subtitle')}
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16 animate-fade-in-delayed">
              <Link to="/simulations">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all group text-lg px-8 py-6">
                  <Play className="h-6 w-6 mr-3" />
                  {t('hero.button.explore')}
                  <ArrowRight className="h-6 w-6 ml-3 group-hover:translate-x-2 transition-transform" />
                </Button>
              </Link>
              <Link to="/online-lessons">
                <Button variant="outline" size="lg" className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950 transition-all text-lg px-8 py-6">
                  <BookOpen className="h-6 w-6 mr-3" />
                  {t('hero.button.lessons')}
                </Button>
              </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto animate-fade-in-slow">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <Link key={index} to={action.href}>
                    <Card className="group hover:shadow-xl transition-all border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:scale-105 cursor-pointer h-full">
                      <CardContent className="p-6 text-center">
                        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg">
                          <Icon className="h-8 w-8 text-white" />
                        </div>
                        <h3 className="text-lg font-semibold mb-2 text-slate-800 dark:text-slate-100">
                          {action.title}
                        </h3>
                        <p className="text-sm text-slate-600 dark:text-slate-300">
                          {action.description}
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-slate-100 mb-6">
              {t('stats.title')}
            </h2>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg">
                    <Icon className="h-10 w-10 text-white" />
                  </div>
                  <div className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-slate-100 mb-3">
                    {stat.number}
                  </div>
                  <div className="text-lg text-slate-600 dark:text-slate-300">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-slate-100 mb-6">
              {t('features.title')}
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="border-0 shadow-lg bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:shadow-xl transition-all group">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg">
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-4 text-slate-800 dark:text-slate-100">
                      {feature.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="py-20 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-slate-100 mb-6">
              {t('technologies.title')}
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {technologies.map((tech, index) => {
              const Icon = tech.icon;
              return (
                <Card key={index} className="border-0 shadow-lg bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:shadow-xl transition-all group">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg">
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold mb-3 text-slate-800 dark:text-slate-100">
                      {tech.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                      {tech.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-slate-100 mb-6">
              {t('mission.title')}
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-4xl mx-auto">
              {t('mission.description')}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Target className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-slate-800 dark:text-slate-100">
                {t('mission.accessible.title')}
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                {t('mission.accessible.description')}
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-slate-800 dark:text-slate-100">
                {t('mission.effective.title')}
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                {t('mission.effective.description')}
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-slate-800 dark:text-slate-100">
                {t('mission.engaging.title')}
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                {t('mission.engaging.description')}
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Globe className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-slate-800 dark:text-slate-100">
                {t('mission.local.title')}
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                {t('mission.local.description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-20 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-slate-100 mb-6">
              {t('achievements.title')}
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-4xl font-bold text-slate-800 dark:text-slate-100 mb-3">
                    {achievement.number}
                  </div>
                  <h3 className="text-lg font-semibold mb-3 text-slate-800 dark:text-slate-100">
                    {achievement.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300">
                    {achievement.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-slate-100 mb-6">
              {t('final.cta.title')}
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 mb-8">
              {t('final.cta.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/simulations">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all text-lg px-8 py-6">
                  {t('final.cta.button')}
                </Button>
              </Link>
              <Link to="/online-lessons">
                <Button variant="outline" size="lg" className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950 transition-all text-lg px-8 py-6">
                  {t('final.cta.button.secondary')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <AIAssistant />
    </div>
  );
};

export default Index;
