import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageToggle } from "@/components/ui/language-toggle";
import { AuthButton } from "@/components/auth/AuthButton";
import { Menu, X, Atom, Info, BookOpen, PenTool } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useLanguage();

  const navigation = [
    { name: t('nav.home'), href: "/", icon: BookOpen },
    { name: t('nav.simulations'), href: "/simulations", icon: Atom },
    { name: t('nav.lessons'), href: "/online-lessons", icon: BookOpen },
    { name: t('nav.whiteboard'), href: "/about", icon: PenTool },
  ];

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="gradient-primary p-2 rounded-lg shadow-soft">
              <Atom className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-success bg-clip-text text-transparent">
                SkillSpark KG
              </h1>
              <p className="text-xs text-muted-foreground">{t('nav.subtitle')}</p>
            </div>
          </div>

          {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className="flex items-center space-x-2 text-sm font-medium text-foreground/80 hover:text-foreground transition-smooth"
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Side */}
          <div className="flex items-center space-x-2">
            <LanguageToggle />
            <ThemeToggle />
            <AuthButton />
            <Link to="/simulations">
              <Button variant="hero" size="sm" className="hidden md:flex">
                {t('nav.get.started')}
              </Button>
            </Link>
            
            {/* Mobile Menu Button */}
            <Button
              variant="outline"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-4">
            <nav className="flex flex-col space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-secondary/50 rounded-md transition-smooth"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
              <div className="px-4 pt-2">
                <Link to="/simulations">
                  <Button variant="hero" className="w-full">
                    {t('nav.get.started')}
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};