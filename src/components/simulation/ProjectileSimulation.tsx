import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";

const ProjectileSimulation = () => {
  const { t, language } = useLanguage();

  // Выбираем язык для PhET симуляции
  const getPhETLanguage = () => {
    switch (language) {
      case 'ru':
        return 'ru';
      case 'ky':
        return 'ru'; // PhET не поддерживает кыргызский, используем русский
      default:
        return 'en';
    }
  };

  const phETLanguage = getPhETLanguage();
  const iframeSrc = `https://phet.colorado.edu/sims/html/projectile-motion/latest/projectile-motion_${phETLanguage}.html`;

  return (
    <div className="space-y-6">
      {/* PhET Simulation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <span>🎯 {t('simulation.projectile')}</span>
            <Badge variant="outline" className="ml-2">
              PhET Colorado
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              {t('sim.detail.projectile.desc')}
            </p>
            
            {/* PhET iframe */}
            <div className="relative w-full bg-gray-100 rounded-lg overflow-hidden">
              <iframe 
                src={iframeSrc}
                width="100%" 
                height="600" 
                allowFullScreen
                className="border-0"
                title="PhET Projectile Motion Simulation"
              />
            </div>
            
            {/* PhET Information */}
            <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 dark:text-blue-400 text-sm">ℹ️</span>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-blue-900 dark:text-blue-100">
                    {t('phet.info.title')}
                  </h4>
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    {t('phet.info.description')}
                  </p>
                  <a 
                    href="https://phet.colorado.edu" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1 text-sm text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    <span>{t('phet.info.visit')}</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProjectileSimulation;
