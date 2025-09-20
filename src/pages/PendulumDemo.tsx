import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PendulumSimulation } from "@/components/simulation/PendulumSimulation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, BookOpen, Target, Zap, Ruler } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";

const PendulumDemo = () => {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <Link to="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              {t('pendulum.demo.back')}
            </Link>
            <div className="text-center">
              <Badge variant="outline" className="mb-4">{t('pendulum.demo.subtitle')}</Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                {t('pendulum.demo.title')}
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                {t('pendulum.demo.description')}
              </p>
            </div>
          </div>

          {/* Main Content */}
          <div className="space-y-6">
            {/* Simulation */}
            <div className="space-y-6">
              <PendulumSimulation />
              {/* What You'll Learn */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Target className="h-5 w-5" />
                    <span>{t('pendulum.demo.learn.title')}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start space-x-2">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                      <span className="text-sm text-muted-foreground">
                        {t('pendulum.demo.learn.motion')}
                      </span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                      <span className="text-sm text-muted-foreground">
                        {t('pendulum.demo.learn.energy')}
                      </span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                      <span className="text-sm text-muted-foreground">
                        {t('pendulum.demo.learn.period')}
                      </span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                      <span className="text-sm text-muted-foreground">
                        {t('pendulum.demo.learn.damping')}
                      </span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* How to Use */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Ruler className="h-5 w-5" />
                    <span>{t('pendulum.demo.usage.title')}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start space-x-2">
                      <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                      <span className="text-sm text-muted-foreground">
                        <strong>{t('pendulum.demo.usage.drag')}</strong>
                      </span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                      <span className="text-sm text-muted-foreground">
                        <strong>{t('pendulum.demo.usage.play')}</strong>
                      </span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                      <span className="text-sm text-muted-foreground">
                        <strong>{t('pendulum.demo.usage.adjust')}</strong>
                      </span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                      <span className="text-sm text-muted-foreground">
                        <strong>{t('pendulum.demo.usage.watch')}</strong>
                      </span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Physics Concepts */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BookOpen className="h-5 w-5" />
                    <span>{t('pendulum.demo.physics.title')}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm text-muted-foreground">
                    <p>
                      {t('pendulum.demo.physics.shm')}
                    </p>
                    <p>
                      {t('pendulum.demo.physics.energy')}
                    </p>
                    <p>
                      {t('pendulum.demo.physics.formula')}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Try More Simulations */}
              <Card className="gradient-card border-0">
                <CardContent className="p-6 text-center">
                  <h3 className="text-lg font-semibold mb-2 text-primary-foreground">
                    {t('pendulum.demo.more.title')}
                  </h3>
                  <p className="text-sm text-primary-foreground/80 mb-4">
                    {t('pendulum.demo.more.description')}
                  </p>
                  <Link to="/simulations">
                    <button className="bg-primary-foreground text-primary px-4 py-2 rounded-md hover:bg-primary-foreground/90 transition-colors">
                      {t('pendulum.demo.more.button')}
                    </button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PendulumDemo;
