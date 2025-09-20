import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { updateProfile } from 'firebase/auth';
import { toast } from 'sonner';
import { Loader2, User, Mail, Calendar, Shield, Edit3 } from 'lucide-react';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';

const profileSchema = z.object({
  displayName: z.string().min(2, 'Имя должно содержать минимум 2 символа'),
});

type ProfileFormData = z.infer<typeof profileSchema>;

const ProfileContent: React.FC = () => {
  const { user, signOut } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      displayName: user?.displayName || '',
    },
  });

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  const getProviderName = (providerId: string) => {
    switch (providerId) {
      case 'google.com':
        return 'Google';
      case 'apple.com':
        return 'Apple';
      case 'password':
        return 'Email/Пароль';
      default:
        return providerId;
    }
  };

  const onSubmit = async (data: ProfileFormData) => {
    if (!user) return;

    try {
      setIsLoading(true);
      await updateProfile(user, {
        displayName: data.displayName,
      });
      toast.success('Профиль обновлен!');
      setIsEditing(false);
    } catch (error) {
      toast.error('Ошибка при обновлении профиля');
      console.error('Profile update error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    reset();
    setIsEditing(false);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success('Вы вышли из аккаунта');
    } catch (error) {
      toast.error('Ошибка при выходе');
    }
  };

  if (!user) return null;

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Профиль пользователя</h1>
          <p className="text-muted-foreground">
            Управляйте информацией о своем аккаунте
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Profile Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span>Личная информация</span>
              </CardTitle>
              <CardDescription>
                Основная информация о вашем аккаунте
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col items-center space-y-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={user.photoURL || undefined} alt={user.displayName || ''} />
                  <AvatarFallback className="text-2xl">
                    {user.displayName ? getInitials(user.displayName) : 'U'}
                  </AvatarFallback>
                </Avatar>
                
                {isEditing ? (
                  <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="displayName">Имя</Label>
                      <Input
                        id="displayName"
                        {...register('displayName')}
                        className={errors.displayName ? 'border-red-500' : ''}
                      />
                      {errors.displayName && (
                        <p className="text-sm text-red-500">{errors.displayName.message}</p>
                      )}
                    </div>
                    <div className="flex space-x-2">
                      <Button type="submit" disabled={isLoading} size="sm">
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Сохранение...
                          </>
                        ) : (
                          'Сохранить'
                        )}
                      </Button>
                      <Button type="button" variant="outline" onClick={handleCancel} size="sm">
                        Отмена
                      </Button>
                    </div>
                  </form>
                ) : (
                  <div className="text-center space-y-2">
                    <h3 className="text-xl font-semibold">
                      {user.displayName || 'Пользователь'}
                    </h3>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsEditing(true)}
                    >
                      <Edit3 className="mr-2 h-4 w-4" />
                      Редактировать
                    </Button>
                  </div>
                )}
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Дата регистрации</p>
                    <p className="text-sm text-muted-foreground">
                      {formatDate(new Date(user.metadata.creationTime || ''))}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Shield className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Способ входа</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {user.providerData.map((provider, index) => (
                        <Badge key={index} variant="secondary">
                          {getProviderName(provider.providerId)}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Account Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Действия с аккаунтом</CardTitle>
              <CardDescription>
                Управление настройками безопасности
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full justify-start">
                Изменить пароль
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Настройки уведомлений
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Экспорт данных
              </Button>
              <Separator />
              <Button 
                variant="destructive" 
                className="w-full justify-start"
                onClick={handleSignOut}
              >
                Выйти из аккаунта
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

const Profile: React.FC = () => {
  return (
    <ProtectedRoute>
      <ProfileContent />
    </ProtectedRoute>
  );
};

export default Profile;
