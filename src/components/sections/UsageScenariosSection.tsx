import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { School, Home, BookOpen, Users, Clock, Wifi } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export const UsageScenariosSection = () => {
  const { t } = useLanguage();
  const scenarios = [
    {
      icon: School,
      title: t('usage.classroom.title'),
      subtitle: t('usage.classroom.subtitle'),
      description: t('usage.classroom.description'),
      features: ["Interactive demonstrations", "Real-time collaboration", "Lesson planning tools", "Student progress tracking"],
      badge: "Teachers"
    },
    {
      icon: Home,
      title: t('usage.home.title'),
      subtitle: t('usage.home.subtitle'),
      description: t('usage.home.description'),
      features: ["Self-paced learning", "Offline access", "Practice exercises", "Progress saving"],
      badge: "Students"
    },
    {
      icon: BookOpen,
      title: t('usage.selfstudy.title'),
      subtitle: t('usage.selfstudy.subtitle'),
      description: t('usage.selfstudy.description'),
      features: ["Flexible timing", "Personalized pace", "Concept mastery", "Exam preparation"],
      badge: "Self-Study"
    }
  ];

  const features = [
    {
      icon: Wifi,
      title: "Lightweight & Fast",
      description: "Optimized for slower internet connections common in Kyrgyzstan"
    },
    {
      icon: Users,
      title: "Always Free",
      description: "Complete access to all features without any cost or subscription"
    },
    {
      icon: Clock,
      title: "Available 24/7",
      description: "Learn anytime, anywhere, with full offline capabilities"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold">{t('usage.title')}</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('usage.description')}
          </p>
        </div>

        {/* Usage Scenarios */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {scenarios.map((scenario, index) => {
            const Icon = scenario.icon;
            return (
              <Card key={index} className="gradient-card border-0 hover:shadow-medium transition-smooth group h-full">
                <CardHeader className="text-center pb-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 gradient-primary rounded-xl mx-auto mb-4 group-hover:scale-110 transition-bounce">
                    <Icon className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <Badge variant="secondary" className="w-fit mx-auto mb-2">{scenario.badge}</Badge>
                  <CardTitle className="text-xl">{scenario.title}</CardTitle>
                  <p className="text-sm text-primary font-medium">{scenario.subtitle}</p>
                </CardHeader>
                <CardContent className="space-y-4 pt-0">
                  <p className="text-muted-foreground leading-relaxed">{scenario.description}</p>
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold">Key Features:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {scenario.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Key Features */}
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="text-center space-y-3 p-6 rounded-xl bg-gradient-to-br from-secondary/50 to-background hover:shadow-soft transition-smooth">
                <Icon className="h-8 w-8 text-primary mx-auto" />
                <h3 className="text-lg font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};