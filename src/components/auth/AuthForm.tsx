import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuthStore, UserRole } from '@/store/authStore';
import { GraduationCap, User, Mail, Lock, UserPlus } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import AnimatedText from '@/components/ui/AnimatedText';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';
import ThemeToggle from '@/components/ui/ThemeToggle';

const AuthForm: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    role: 'student' as UserRole,
    classCode: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { login } = useAuthStore();
  const { t } = useTranslation();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email) {
      newErrors.email = t('email') + ' ' + t('common.required');
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.password) {
      newErrors.password = t('password') + ' ' + t('common.required');
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!isLogin && !formData.name) {
      newErrors.name = t('name') + ' ' + t('common.required');
    }

    if (!isLogin && formData.role === 'student' && !formData.classCode) {
      newErrors.classCode = t('classCode') + ' ' + t('common.required');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    const success = login(
      formData.email,
      formData.password,
      formData.role,
      formData.name || formData.email.split('@')[0],
      formData.classCode || undefined
    );

    if (!success) {
      setErrors({ general: 'Login error. Please check your data.' });
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-violet-50 dark:from-slate-900 dark:via-purple-900 dark:to-indigo-900 flex items-center justify-center p-3 sm:p-4">
      <div className="w-full max-w-4xl mx-auto">
        {/* Language Switcher and Theme Toggle */}
        <div className="flex justify-end gap-1 sm:gap-2 mb-4 sm:mb-6">
          <LanguageSwitcher />
          <ThemeToggle />
        </div>

        {/* Welcome Message */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-3 sm:mb-4">
            <AnimatedText translationKey="appName" />
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-slate-600 dark:text-slate-400 px-2">
            <AnimatedText translationKey="welcomeMessage" delay={0.2} />
          </p>
        </div>

        <div className="w-full max-w-md mx-auto">
          <Card className="shadow-2xl border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
            <CardHeader className="text-center pb-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center">
                  <GraduationCap className="h-8 w-8 text-white" />
                </div>
              </div>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                <AnimatedText translationKey="appName" />
              </CardTitle>
            </CardHeader>

            <CardContent>
              <Tabs value={isLogin ? 'login' : 'register'} onValueChange={(value) => setIsLogin(value === 'login')}>
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="login">
                    <AnimatedText translationKey="login" />
                  </TabsTrigger>
                  <TabsTrigger value="register">
                    <AnimatedText translationKey="register" />
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="login">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="login-email">
                        <AnimatedText translationKey="email" />
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="login-email"
                          type="email"
                          placeholder="your@email.com"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className="pl-10"
                        />
                      </div>
                      {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="login-password">
                        <AnimatedText translationKey="password" />
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="login-password"
                          type="password"
                          placeholder="••••••••"
                          value={formData.password}
                          onChange={(e) => handleInputChange('password', e.target.value)}
                          className="pl-10"
                        />
                      </div>
                      {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="login-role">
                        <AnimatedText translationKey="role" />
                      </Label>
                      <Select value={formData.role} onValueChange={(value) => handleInputChange('role', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder={t('selectLanguage')} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="student">
                            <div className="flex items-center gap-2">
                              <User className="h-4 w-4" />
                              <AnimatedText translationKey="student" />
                            </div>
                          </SelectItem>
                          <SelectItem value="teacher">
                            <div className="flex items-center gap-2">
                              <GraduationCap className="h-4 w-4" />
                              <AnimatedText translationKey="teacher" />
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {errors.general && (
                      <p className="text-sm text-red-500 text-center">{errors.general}</p>
                    )}

                    <Button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700">
                      <AnimatedText translationKey="login" />
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="register">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="register-name">
                        <AnimatedText translationKey="name" />
                      </Label>
                      <div className="relative">
                        <UserPlus className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="register-name"
                          type="text"
                          placeholder="Your name"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          className="pl-10"
                        />
                      </div>
                      {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="register-email">
                        <AnimatedText translationKey="email" />
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="register-email"
                          type="email"
                          placeholder="your@email.com"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className="pl-10"
                        />
                      </div>
                      {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="register-password">
                        <AnimatedText translationKey="password" />
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="register-password"
                          type="password"
                          placeholder="••••••••"
                          value={formData.password}
                          onChange={(e) => handleInputChange('password', e.target.value)}
                          className="pl-10"
                        />
                      </div>
                      {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="register-role">
                        <AnimatedText translationKey="role" />
                      </Label>
                      <Select value={formData.role} onValueChange={(value) => handleInputChange('role', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder={t('selectLanguage')} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="student">
                            <div className="flex items-center gap-2">
                              <User className="h-4 w-4" />
                              <AnimatedText translationKey="student" />
                            </div>
                          </SelectItem>
                          <SelectItem value="teacher">
                            <div className="flex items-center gap-2">
                              <GraduationCap className="h-4 w-4" />
                              <AnimatedText translationKey="teacher" />
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {formData.role === 'student' && (
                      <div className="space-y-2">
                        <Label htmlFor="register-classCode">
                          <AnimatedText translationKey="classCode" />
                        </Label>
                        <Input
                          id="register-classCode"
                          type="text"
                          placeholder="Enter class code"
                          value={formData.classCode}
                          onChange={(e) => handleInputChange('classCode', e.target.value)}
                        />
                        {errors.classCode && <p className="text-sm text-red-500">{errors.classCode}</p>}
                      </div>
                    )}

                    {errors.general && (
                      <p className="text-sm text-red-500 text-center">{errors.general}</p>
                    )}

                    <Button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700">
                      <AnimatedText translationKey="register" />
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;