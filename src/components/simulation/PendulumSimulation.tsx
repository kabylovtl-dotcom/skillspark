import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Target, ExternalLink, Info } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface PendulumSimulationProps {
  className?: string;
}

export const PendulumSimulation = ({ className }: PendulumSimulationProps) => {
  const { t } = useLanguage();
  
  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              {t('pendulum.sim.title')}
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              {t('pendulum.sim.description')}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="flex items-center gap-1">
              <Info className="h-3 w-3" />
              Official PhET
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* PhET Simulation */}
        <div className="relative border rounded-lg overflow-hidden bg-background">
          <iframe 
            src="https://phet.colorado.edu/sims/html/pendulum-lab/latest/pendulum-lab_ru.html"
            width="100%"
            height="600"
            allowFullScreen
            className="w-full"
            title="Лаборатория маятника - Симуляция"
          />
        </div>

        {/* Features Info */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{t('pendulum.sim.features.title')}</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                <span>Тууралоочу параметрлер менен бир нече маятниктер</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                <span>Реалдуу убакыттагы энергия графиктери (кинетикалык, потенциалдык, толук)</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                <span>Мезгилди өлчөө жана салыштыруу куралдары</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                <span>Үйкөлүшүү жана сөнүү көзөмөлү</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                <span>Ар түрдүү көрүү режимдери жана өлчөө куралдары</span>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Үйрөнүү максаттары</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                <span>Жөнөкөй гармоникалык кыймылдын принциптерин түшүнүү</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                <span>Маятник системаларында энергиянын сакталышын талдоо</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                <span>Мезгилдин узундукка жана тартылуу күчүнө көз каранды болушун изилдөө</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                <span>Бир нече маятникти бир убакта салыштыруу</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                <span>Сөнүүнүн тербелүүгө тийгизген таасирин үйрөнүү</span>
              </li>
            </ul>
          </div>
        </div>

        {/* PhET Attribution */}
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <ExternalLink className="h-4 w-4 text-blue-600" />
            </div>
            <div>
              <h4 className="font-medium text-blue-900">PhET симуляциялары жөнүндө</h4>
              <p className="text-sm text-blue-700 mt-1">
                Бул симуляция Боулдердеги Колорадо университетинин PhET Interactive Simulations тарабынан 
                камсыз кылынган. PhET математика жана жаратылыш илимдери боюнча акысыз интерактивдүү 
                симуляцияларды түзөт, алар студенттерди изилдөө жана ачылыш аркылуу интуитивдүү, 
                оюндуу окуу чөйрөсү аркылуу тартат.
              </p>
              <a 
                href="https://phet.colorado.edu" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm mt-2 font-medium"
              >
                PhET сайтын көрүү
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
