'use client';

export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Plus, Trash2, Star, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuthStore, useLocaleStore } from '@/store';
import {
  getAddresses,
  addAddress,
  deleteAddress,
  setDefaultAddress,
} from '@/lib/api/database';
import { toast } from 'sonner';
import type { Address } from '@/types';

const STATES = [
  'Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh','Goa','Gujarat','Haryana',
  'Himachal Pradesh','Jharkhand','Karnataka','Kerala','Madhya Pradesh','Maharashtra','Manipur',
  'Meghalaya','Mizoram','Nagaland','Odisha','Punjab','Rajasthan','Sikkim','Tamil Nadu','Telangana',
  'Tripura','Uttar Pradesh','Uttarakhand','West Bengal','Delhi','Jammu & Kashmir','Ladakh',
];

const emptyForm = { name: '', phone: '', address: '', city: '', state: '', pincode: '' };

export default function AddressesPage() {
  const { user } = useAuthStore();
  const { t } = useLocaleStore();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (user) loadAddresses();
  }, [user]);

  async function loadAddresses() {
    if (!user) return;
    setLoading(true);
    try {
      const data = await getAddresses(user.id);
      setAddresses(data);
    } catch {
      toast.error(t('Failed to load addresses', 'पते लोड नहीं हुए'));
    } finally {
      setLoading(false);
    }
  }

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    if (!form.name || !form.phone || !form.address || !form.city || !form.state || !form.pincode) {
      toast.error(t('Please fill all fields', 'सभी फ़ील्ड भरें'));
      return;
    }
    setSaving(true);
    try {
      await addAddress(user.id, form);
      toast.success(t('Address added!', 'पता जोड़ा गया!'));
      setForm(emptyForm);
      setShowForm(false);
      loadAddresses();
    } catch {
      toast.error(t('Failed to add address', 'पता जोड़ने में विफल'));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteAddress(id);
      setAddresses((prev) => prev.filter((a) => a.id !== id));
      toast.success(t('Address removed', 'पता हटाया गया'));
    } catch {
      toast.error(t('Failed to delete', 'हटाने में विफल'));
    }
  };

  const handleSetDefault = async (id: string) => {
    if (!user) return;
    try {
      await setDefaultAddress(user.id, id);
      setAddresses((prev) => prev.map((a) => ({ ...a, isDefault: a.id === id })));
      toast.success(t('Default address updated', 'डिफ़ॉल्ट पता अपडेट हुआ'));
    } catch {
      toast.error(t('Failed to update', 'अपडेट नहीं हुआ'));
    }
  };

  if (!user) return null;

  return (
    <div className="space-y-4">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="font-display text-2xl font-bold flex items-center gap-2">
            <MapPin className="h-6 w-6 text-amber-500" />
            {t('My Addresses', 'मेरे पते')}
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            {t('Manage your delivery addresses', 'अपने डिलीवरी पते प्रबंधित करें')}
          </p>
        </div>
        <Button
          onClick={() => setShowForm((v) => !v)}
          className="bg-amber-500 hover:bg-amber-600 text-white gap-2"
          size="sm"
        >
          <Plus className="h-4 w-4" />
          {t('Add Address', 'पता जोड़ें')}
        </Button>
      </motion.div>

      {/* Add Form */}
      {showForm && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <Card>
            <CardContent className="p-5">
              <h3 className="font-semibold mb-4">{t('New Address', 'नया पता')}</h3>
              <form onSubmit={handleAdd} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label>{t('Full Name', 'पूरा नाम')}</Label>
                  <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Shivam Maheshwari" />
                </div>
                <div className="space-y-1">
                  <Label>{t('Phone', 'फोन')}</Label>
                  <Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+91 90000 00000" />
                </div>
                <div className="space-y-1 sm:col-span-2">
                  <Label>{t('Address', 'पता')}</Label>
                  <Input value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} placeholder="Street, Area, Landmark" />
                </div>
                <div className="space-y-1">
                  <Label>{t('City', 'शहर')}</Label>
                  <Input value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} placeholder="Jaipur" />
                </div>
                <div className="space-y-1">
                  <Label>{t('State', 'राज्य')}</Label>
                  <select
                    value={form.state}
                    onChange={(e) => setForm({ ...form, state: e.target.value })}
                    className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="">{t('Select state', 'राज्य चुनें')}</option>
                    {STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div className="space-y-1">
                  <Label>{t('Pincode', 'पिनकोड')}</Label>
                  <Input value={form.pincode} onChange={(e) => setForm({ ...form, pincode: e.target.value })} placeholder="302001" maxLength={6} />
                </div>
                <div className="sm:col-span-2 flex gap-3">
                  <Button type="submit" disabled={saving} className="bg-amber-500 hover:bg-amber-600 text-white">
                    {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                    {t('Save Address', 'पता सहेजें')}
                  </Button>
                  <Button type="button" variant="outline" onClick={() => { setShowForm(false); setForm(emptyForm); }}>
                    {t('Cancel', 'रद्द करें')}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Addresses List */}
      {loading ? (
        <div className="space-y-3">
          {[1, 2].map((i) => <div key={i} className="h-28 bg-muted animate-pulse rounded-xl" />)}
        </div>
      ) : addresses.length === 0 ? (
        <Card>
          <CardContent className="py-14 text-center">
            <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
            <p className="font-medium">{t('No addresses saved', 'कोई पता सहेजा नहीं')}</p>
            <p className="text-muted-foreground text-sm mt-1">
              {t('Add an address for faster checkout', 'तेज़ चेकआउट के लिए पता जोड़ें')}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-3">
          {addresses.map((addr, idx) => (
            <motion.div
              key={addr.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
            >
              <Card className={addr.isDefault ? 'border-amber-500/50' : ''}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-semibold">{addr.name}</p>
                        {addr.isDefault && (
                          <span className="text-xs bg-amber-500/10 text-amber-600 px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
                            <Star className="h-3 w-3" /> {t('Default', 'डिफ़ॉल्ट')}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{addr.phone}</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {addr.address}, {addr.city}, {addr.state} - {addr.pincode}
                      </p>
                    </div>
                    <div className="flex flex-col gap-2 ml-4">
                      {!addr.isDefault && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleSetDefault(addr.id)}
                          className="text-xs"
                        >
                          {t('Set Default', 'डिफ़ॉल्ट करें')}
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDelete(addr.id)}
                        className="text-red-500 hover:text-red-600 hover:bg-red-500/10"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
