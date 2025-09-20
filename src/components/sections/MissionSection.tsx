import { Card, CardContent } from "@/components/ui/card";
import { Target, Heart, Lightbulb, Globe } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export const MissionSection = () => {
  const { t } = useLanguage();
  
  const missions = [
    {
      icon: Target,
      title: t('mission.accessible.title'),
      description: t('mission.accessible.description')
    },
    {
      icon: Heart,
      title: t('mission.effective.title'),
      description: t('mission.effective.description')
    },
    {
      icon: Lightbulb,
      title: t('mission.engaging.title'),
      description: t('mission.engaging.description')
    },
    {
      icon: Globe,
      title: t('mission.local.title'),
      description: t('mission.local.description')
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-secondary/50 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold">{t('mission.title')}</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('mission.description')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {missions.map((mission, index) => {
            const Icon = mission.icon;
            return (
              <Card key={index} className="gradient-card border-0 hover:shadow-medium transition-smooth group">
                <CardContent className="p-6 space-y-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 gradient-primary rounded-lg group-hover:scale-110 transition-bounce">
                    <Icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold">{mission.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{mission.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};