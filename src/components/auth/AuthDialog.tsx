import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';
import { SocialAuthButtons } from './SocialAuthButtons';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/contexts/AuthContext';

interface AuthDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultTab?: 'login' | 'register';
}

export const AuthDialog: React.FC<AuthDialogProps> = ({ 
  open, 
  onOpenChange, 
  defaultTab = 'login' 
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab);
  const { user } = useAuth();

  // Close dialog if user is authenticated
  React.useEffect(() => {
    if (user) {
      onOpenChange(false);
    }
  }, [user, onOpenChange]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">
            {activeTab === 'login' ? 'Вход в аккаунт' : 'Создание аккаунта'}
          </DialogTitle>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'login' | 'register')}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Вход</TabsTrigger>
            <TabsTrigger value="register">Регистрация</TabsTrigger>
          </TabsList>
          
          <div className="space-y-4">
            <SocialAuthButtons />
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  или
                </span>
              </div>
            </div>
            
            <TabsContent value="login" className="space-y-4">
              <LoginForm onSuccess={() => onOpenChange(false)} />
            </TabsContent>
            
            <TabsContent value="register" className="space-y-4">
              <RegisterForm onSuccess={() => onOpenChange(false)} />
            </TabsContent>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
