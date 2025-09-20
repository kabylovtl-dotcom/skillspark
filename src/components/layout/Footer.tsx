import { Atom, Heart, Github, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const links = {
    platform: [
      { name: "Simulations", href: "#simulations" },
      { name: "Whiteboard", href: "#whiteboard" },
      { name: "About", href: "#about" },
      { name: "Contact", href: "#contact" }
    ],
    resources: [
      { name: "Help Center", href: "#help" },
      { name: "Tutorials", href: "#tutorials" },
      { name: "Documentation", href: "#docs" },
      { name: "Community", href: "#community" }
    ],
    legal: [
      { name: "Privacy Policy", href: "#privacy" },
      { name: "Terms of Service", href: "#terms" },
      { name: "Open Source", href: "#opensource" }
    ]
  };

  return (
    <footer className="bg-gradient-to-br from-secondary/30 to-background border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="gradient-primary p-2 rounded-lg shadow-soft">
                <Atom className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h3 className="text-lg font-bold bg-gradient-to-r from-primary to-success bg-clip-text text-transparent">
                  SkillSpark KG
                </h3>
                <p className="text-xs text-muted-foreground">STEM Education Platform</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Making STEM education accessible, effective, and engaging for students and teachers across Kyrgyzstan.
            </p>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Heart className="h-4 w-4 text-red-500" />
              <span>Made with love for education</span>
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className="font-semibold mb-4">Platform</h4>
            <ul className="space-y-2">
              {links.platform.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href} 
                    className="text-sm text-muted-foreground hover:text-foreground transition-smooth"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              {links.resources.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href} 
                    className="text-sm text-muted-foreground hover:text-foreground transition-smooth"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Legal */}
          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <div className="space-y-4">
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Github className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Mail className="h-4 w-4" />
                </Button>
              </div>
              <ul className="space-y-2">
                {links.legal.map((link, index) => (
                  <li key={index}>
                    <a 
                      href={link.href} 
                      className="text-sm text-muted-foreground hover:text-foreground transition-smooth"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t pt-8 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <p className="text-sm text-muted-foreground">
            © {currentYear} SkillSpark KG. Free and open for all students in Kyrgyzstan.
          </p>
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <span>🇰🇬 Proud to serve Kyrgyzstan</span>
            <span>•</span>
            <span>🌟 Always Free</span>
          </div>
        </div>
      </div>
    </footer>
  );
};