'use client';

export const dynamic = 'force-dynamic';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, Loader2, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuthStore, useLocaleStore } from '@/store';
import { updateProfile, resetPassword } from '@/lib/api/auth';
import { toast } from 'sonner';

export default function ProfilePage() {
  const { user, setUser } = useAuthStore();
  const { t } = useLocaleStore();
  const [saving, setSaving] = useState(false);
  const [resetting, setResetting] = useState(false);
  const [form, setForm] = useState({
    fullName: user?.fullName || '',
    phone: user?.phone || '',
  });

  if (!user) return null;

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateProfile(user.id, { fullName: form.fullName, phone: form.phone });
      setUser({ ...user, fullName: form.fullName, phone: form.phone });
      toast.success(t('Profile updated!', 'प्रोफाइल अपडेट हुई!'));
    } catch {
      toast.error(t('Failed to update profile', 'प्रोफाइल अपडेट नहीं हुई'));
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordReset = async () => {
    setResetting(true);
    try {
      await resetPassword(user.email);
      toast.success(t('Password reset email sent!', 'पासवर्ड रीसेट ईमेल भेजी गई!'));
    } catch {
      toast.error(t('Failed to send reset email', 'रीसेट ईमेल भेजने में विफल'));
    } finally {
      setResetting(false);
    }
  };

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display text-2xl font-bold flex items-center gap-2">
          <User className="h-6 w-6 text-amber-500" />
          {t('My Profile', 'मेरी प्रोफाइल')}
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          {t('Manage your personal information', 'अपनी व्यक्तिगत जानकारी प्रबंधित करें')}
        </p>
      </motion.div>

      {/* Avatar card */}
      <Card>
        <CardContent className="p-6 flex items-center gap-5">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center shrink-0">
            <span className="text-3xl font-bold text-white">
              {user.fullName?.[0]?.toUpperCase() || user.email[0].toUpperCase()}
            </span>
          </div>
          <div>
            <h2 className="font-semibold text-lg">{user.fullName || 'User'}</h2>
            <p className="text-sm text-muted-foreground">{user.email}</p>
            <span className="inline-block mt-1 text-xs bg-amber-500/10 text-amber-600 px-2 py-0.5 rounded-full capitalize">
              {user.role}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Edit form */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">{t('Personal Information', 'व्यक्तिगत जानकारी')}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSave} className="space-y-4">
            <div className="space-y-1">
              <Label className="flex items-center gap-2">
                <User className="h-3.5 w-3.5" /> {t('Full Name', 'पूरा नाम')}
              </Label>
              <Input
                value={form.fullName}
                onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                placeholder="Shivam Maheshwari"
              />
            </div>
            <div className="space-y-1">
              <Label className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5" /> {t('Email', 'ईमेल')}
              </Label>
              <Input value={user.email} disabled className="opacity-60" />
              <p className="text-xs text-muted-foreground">
                {t('Email cannot be changed', 'ईमेल बदली नहीं जा सकती')}
              </p>
            </div>
            <div className="space-y-1">
              <Label className="flex items-center gap-2">
                <Phone className="h-3.5 w-3.5" /> {t('Phone', 'फोन')}
              </Label>
              <Input
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="+91 90000 00000"
              />
            </div>
            <Button type="submit" disabled={saving} className="bg-amber-500 hover:bg-amber-600 text-white">
              {saving && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
              {t('Save Changes', 'परिवर्तन सहेजें')}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Password reset */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">{t('Password', 'पासवर्ड')}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            {t(
              'We\'ll send a password reset link to your email address.',
              'हम आपके ईमेल पर पासवर्ड रीसेट लिंक भेजेंगे।'
            )}
          </p>
          <Button
            variant="outline"
            onClick={handlePasswordReset}
            disabled={resetting}
            className="gap-2"
          >
            {resetting
              ? <Loader2 className="h-4 w-4 animate-spin" />
              : <Lock className="h-4 w-4" />
            }
            {t('Send Reset Email', 'रीसेट ईमेल भेजें')}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
