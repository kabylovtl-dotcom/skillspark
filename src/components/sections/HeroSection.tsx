import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Users, Globe, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import heroImage from "@/assets/hero-education.jpg";

export const HeroSection = () => {
  const { t } = useLanguage();
  
  const stats = [
    { icon: Users, value: "10,000+", label: t('stats.students') },
    { icon: Globe, value: t('stats.free'), label: t('stats.free') },
    { icon: Zap, value: t('stats.interactive'), label: t('stats.interactive') },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                🇰🇬 {t('hero.made.for')}
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                {t('hero.title.part1')}{" "}
                <span className="bg-gradient-to-r from-primary to-success bg-clip-text text-transparent">
                  {t('hero.title.part2')}
                </span>{" "}
                {t('hero.title.part3')}
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl">
                {t('hero.description')}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/simulations">
                <Button variant="hero" size="lg" className="group">
                  {t('hero.start.learning')}
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/simulations">
                <Button variant="outline" size="lg">
                  {t('hero.view.simulations')}
                </Button>
              </Link>
              <Link to="/pendulum-demo">
                <Button variant="outline" size="lg" className="group">
                  {t('hero.try.pendulum')}
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-8">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="text-center space-y-2">
                    <Icon className="h-6 w-6 mx-auto text-primary" />
                    <div className="text-2xl font-bold text-primary">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <Card className="overflow-hidden shadow-strong animate-float">
              <img 
                src={heroImage} 
                alt="Students learning STEM subjects together" 
                className="w-full h-auto object-cover"
              />
            </Card>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 gradient-primary rounded-full animate-glow opacity-30"></div>
            <div className="absolute -top-4 -left-4 w-16 h-16 gradient-success rounded-full animate-pulse opacity-20"></div>
          </div>
        </div>
      </div>
    </section>
  );
};