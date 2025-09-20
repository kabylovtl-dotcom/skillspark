import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, PenTool, Eraser, Palette, Download } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import whiteboardImage from "@/assets/whiteboard-demo.jpg";

export const WhiteboardSection = () => {
  const { t } = useLanguage();


  const tools = [
    { icon: PenTool, name: t('whiteboard.pen.name'), desc: t('whiteboard.pen.desc') },
    { icon: Palette, name: t('whiteboard.color.name'), desc: t('whiteboard.color.desc') },
    { icon: Eraser, name: t('whiteboard.eraser.name'), desc: t('whiteboard.eraser.desc') },
    { icon: Download, name: t('whiteboard.export.name'), desc: t('whiteboard.export.desc') }
  ];

  return (
    <section id="whiteboard" className="py-20 bg-gradient-to-br from-primary/5 to-success/5">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
          {/* Demo Image */}
          <div className="relative lg:order-1">
            <Card className="overflow-hidden shadow-medium">
              <img 
                src={whiteboardImage} 
                alt="Digital whiteboard with physics diagrams and explanations" 
                className="w-full h-auto object-cover"
              />
            </Card>
          </div>

          {/* Content */}
          <div className="space-y-6 lg:order-2">
            <div>
              <Badge variant="outline" className="mb-4">{t('whiteboard.subtitle')}</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {t('whiteboard.title')}
              </h2>
              <p className="text-xl text-muted-foreground">
                {t('whiteboard.description')}
              </p>
            </div>

            {/* Drawing Tools */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">{t('whiteboard.tools.title')}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {tools.map((tool, index) => {
                  const Icon = tool.icon;
                  return (
                    <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-background/50">
                      <Icon className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <div className="font-medium text-sm">{tool.name}</div>
                        <div className="text-xs text-muted-foreground">{tool.desc}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <Button variant="success" size="lg" className="group">
              {t('whiteboard.start')}
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>


      </div>
    </section>
  );
};