
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/context/AuthContext';
import { 
  User, 
  Lock, 
  Bell, 
  LayoutDashboard, 
  CreditCard, 
  Shield, 
  Languages,
  Moon,
  Sun
} from 'lucide-react';

const Settings = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState('');
  const [language, setLanguage] = useState('english');
  const [currency, setCurrency] = useState('inr');
  const [theme, setTheme] = useState('light');
  
  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "New password and confirm password must be the same",
        variant: "destructive"
      });
      return;
    }
    
    // Mock password change
    setTimeout(() => {
      toast({
        title: "Password updated",
        description: "Your password has been successfully updated",
      });
      
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    }, 1000);
  };
  
  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock profile update
    setTimeout(() => {
      toast({
        title: "Profile updated",
        description: "Your profile information has been successfully updated",
      });
    }, 1000);
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', newTheme);
    
    toast({
      title: "Theme updated",
      description: `Theme changed to ${newTheme} mode`,
    });
  };
  
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Account Settings</h1>
          <p className="text-gray-600">Manage your account settings and preferences</p>
        </div>
        
        <Tabs defaultValue="profile" className="w-full">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-64 space-y-4">
              <TabsList className="flex flex-col w-full h-auto gap-1">
                <TabsTrigger value="profile" className="justify-start w-full px-3 py-2">
                  <User size={16} className="mr-2" />
                  Profile
                </TabsTrigger>
                <TabsTrigger value="security" className="justify-start w-full px-3 py-2">
                  <Lock size={16} className="mr-2" />
                  Security
                </TabsTrigger>
                <TabsTrigger value="preferences" className="justify-start w-full px-3 py-2">
                  <LayoutDashboard size={16} className="mr-2" />
                  Preferences
                </TabsTrigger>
                <TabsTrigger value="notifications" className="justify-start w-full px-3 py-2">
                  <Bell size={16} className="mr-2" />
                  Notifications
                </TabsTrigger>
                <TabsTrigger value="payment" className="justify-start w-full px-3 py-2">
                  <CreditCard size={16} className="mr-2" />
                  Payment Methods
                </TabsTrigger>
                <TabsTrigger value="privacy" className="justify-start w-full px-3 py-2">
                  <Shield size={16} className="mr-2" />
                  Privacy
                </TabsTrigger>
              </TabsList>
            </div>
            
            <div className="flex-1">
              <TabsContent value="profile" className="m-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>Update your personal details</CardDescription>
                  </CardHeader>
                  <form onSubmit={handleProfileUpdate}>
                    <CardContent className="space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="h-20 w-20 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xl font-bold">
                          {name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <Button variant="outline" size="sm">
                            Change Avatar
                          </Button>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input 
                          id="name" 
                          value={name} 
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input 
                          id="email" 
                          type="email" 
                          value={email} 
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input 
                          id="phone" 
                          value={phone} 
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="Enter your phone number"
                        />
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button type="submit">Save Changes</Button>
                    </CardFooter>
                  </form>
                </Card>
              </TabsContent>
              
              <TabsContent value="security" className="m-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Change Password</CardTitle>
                    <CardDescription>Update your password to keep your account secure</CardDescription>
                  </CardHeader>
                  <form onSubmit={handlePasswordChange}>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="current-password">Current Password</Label>
                        <Input 
                          id="current-password" 
                          type="password" 
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="new-password">New Password</Label>
                        <Input 
                          id="new-password" 
                          type="password" 
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirm New Password</Label>
                        <Input 
                          id="confirm-password" 
                          type="password" 
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button type="submit">Update Password</Button>
                    </CardFooter>
                  </form>
                </Card>
              </TabsContent>
              
              <TabsContent value="preferences" className="m-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Preferences</CardTitle>
                    <CardDescription>Customize your app experience</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="language">Language</Label>
                      <div className="flex items-center gap-3">
                        <Languages size={18} className="text-gray-500" />
                        <select 
                          id="language" 
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          value={language}
                          onChange={(e) => setLanguage(e.target.value)}
                        >
                          <option value="english">English</option>
                          <option value="hindi">Hindi</option>
                          <option value="tamil">Tamil</option>
                          <option value="telugu">Telugu</option>
                          <option value="bengali">Bengali</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="currency">Currency</Label>
                      <div className="flex items-center gap-3">
                        <CreditCard size={18} className="text-gray-500" />
                        <select 
                          id="currency" 
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          value={currency}
                          onChange={(e) => setCurrency(e.target.value)}
                        >
                          <option value="inr">Indian Rupee (₹)</option>
                          <option value="usd">US Dollar ($)</option>
                          <option value="eur">Euro (€)</option>
                          <option value="gbp">British Pound (£)</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Theme</Label>
                      <div className="flex items-center gap-4">
                        <Button 
                          variant={theme === 'light' ? "default" : "outline"} 
                          size="sm"
                          className="w-32 flex items-center gap-2" 
                          onClick={toggleTheme}
                        >
                          <Sun size={16} />
                          Light Mode
                        </Button>
                        <Button 
                          variant={theme === 'dark' ? "default" : "outline"} 
                          size="sm"
                          className="w-32 flex items-center gap-2" 
                          onClick={toggleTheme}
                        >
                          <Moon size={16} />
                          Dark Mode
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button>Save Preferences</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="notifications" className="m-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Notification Settings</CardTitle>
                    <CardDescription>Manage how you receive notifications</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {['Market Updates', 'Portfolio Changes', 'Price Alerts', 'News', 'Account Security'].map((item) => (
                      <div key={item} className="flex items-center justify-between py-2">
                        <div>
                          <h4 className="font-medium">{item}</h4>
                          <p className="text-sm text-gray-500">Receive notifications about {item.toLowerCase()}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <label className="inline-flex items-center cursor-pointer">
                            <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                  <CardFooter>
                    <Button>Save Notification Settings</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="payment" className="m-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Payment Methods</CardTitle>
                    <CardDescription>Manage your payment methods for investments</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                          <CreditCard size={20} />
                        </div>
                        <div>
                          <h4 className="font-medium">UPI</h4>
                          <p className="text-sm text-gray-500">user@upi</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">Edit</Button>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                          <CreditCard size={20} />
                        </div>
                        <div>
                          <h4 className="font-medium">Bank Account</h4>
                          <p className="text-sm text-gray-500">HDFC Bank •••• 1234</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">Edit</Button>
                    </div>
                    
                    <Button variant="outline" className="w-full">
                      Add New Payment Method
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="privacy" className="m-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Privacy Settings</CardTitle>
                    <CardDescription>Manage your privacy preferences</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {['Data Sharing', 'Marketing Emails', 'App Analytics', 'Portfolio Visibility'].map((item) => (
                      <div key={item} className="flex items-center justify-between py-2">
                        <div>
                          <h4 className="font-medium">{item}</h4>
                          <p className="text-sm text-gray-500">Control how your {item.toLowerCase()} is handled</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <label className="inline-flex items-center cursor-pointer">
                            <input type="checkbox" value="" className="sr-only peer" defaultChecked={item !== 'Marketing Emails'} />
                            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                  <CardFooter>
                    <Button>Save Privacy Settings</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </div>
          </div>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Settings;
