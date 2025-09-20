import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Play, BarChart3, Ruler, Timer } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import simulationImage from "@/assets/simulation-demo.jpg";

export const SimulationsSection = () => {
  const { t } = useLanguage();
  const simulations = [
    {
      title: t('sims.lab.title'),
      description: t('sims.lab.description'),
      features: t('sims.lab.features'),
      difficulty: t('sims.lab.difficulty'),
      category: t('sims.lab.category')
    },
    {
      title: t('sims.molecule.title'),
      description: t('sims.molecule.description'),
      features: t('sims.molecule.features'),
      difficulty: t('sims.molecule.difficulty'),
      category: t('sims.molecule.category')
    },
    {
      title: t('sims.wave.title'),
      description: t('sims.wave.description'),
      features: t('sims.wave.features'),
      difficulty: t('sims.wave.difficulty'),
      category: t('sims.wave.category')
    },
    {
      title: t('sims.energy.title'),
      description: t('sims.energy.description'),
      features: t('sims.energy.features'),
      difficulty: t('sims.wave.difficulty'),
      category: t('sims.energy.category')
    }
  ];

  const tools = [
    { icon: Ruler, name: t('tools.measurement') },
    { icon: BarChart3, name: t('sims.tools.visualization') },
    { icon: Timer, name: t('sims.tools.timer') },
    { icon: Play, name: t('sims.tools.controls') }
  ];

  return (
    <section id="simulations" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
          {/* Content */}
          <div className="space-y-6">
            <div>
              <Badge variant="outline" className="mb-4">{t('sims.section.subtitle')}</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {t('sims.section.title')}
              </h2>
              <p className="text-xl text-muted-foreground">
                {t('sims.section.description')}
              </p>
            </div>

            {/* Measurement Tools */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">{t('sims.section.tools.title')}</h3>
              <div className="grid grid-cols-2 gap-3">
                {tools.map((tool, index) => {
                  const Icon = tool.icon;
                  return (
                    <div key={index} className="flex items-center space-x-2 text-sm">
                      <Icon className="h-4 w-4 text-primary" />
                      <span>{tool.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <Link to="/simulations">
              <Button variant="interactive" size="lg" className="group">
                {t('sims.section.button')}
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          {/* Demo Image */}
          <div className="relative">
            <Card className="overflow-hidden shadow-medium">
              <img 
                src={simulationImage} 
                alt="Physics simulation interface showing pendulum motion with measurement tools" 
                className="w-full h-auto object-cover"
              />
            </Card>
          </div>
        </div>


      </div>
    </section>
  );
};