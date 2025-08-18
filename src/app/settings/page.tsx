"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card/card"
import { Button } from "@/components/ui/button/button"
import { Input } from "@/components/ui/input/input"
import { Label } from "@/components/ui/label/label"
import Switch from "@/components/ui/switch/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs/tabs"
import Select from "@/components/ui/select"
import Badge from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, Bell, Shield, CreditCard, Users, Edit, Trash2, Plus } from "lucide-react"
import { formatDate } from "@/lib/utils"

const teamMembers = [
    {
        id: 1,
        name: "John Doe",
        email: "john@company.com",
        role: "Owner",
        permissions: "Full Access",
        avatar: "/placeholder.svg?height=40&width=40",
        lastActive: "2024-11-28",
    },
    {
        id: 2,
        name: "Jane Smith",
        email: "jane@company.com",
        role: "Editor",
        permissions: "Read/Write",
        avatar: "/placeholder.svg?height=40&width=40",
        lastActive: "2024-11-27",
    },
]

export default function Settings() {

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">Settings</h1>
                <p className="text-gray-500 dark:text-gray-400">Manage your account settings and preferences</p>
            </div>

            <Tabs defaultValue="profile">
                <TabsList className="glass">
                    <TabsTrigger value="profile">Profile</TabsTrigger>
                    <TabsTrigger value="notifications">Notifications</TabsTrigger>
                    <TabsTrigger value="team">Team & Permissions</TabsTrigger>
                    <TabsTrigger value="billing">Billing</TabsTrigger>
                    <TabsTrigger value="security">Security</TabsTrigger>
                </TabsList>

                <TabsContent value="profile" className="space-y-6">
                    <Card className="glass-card">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <User className="h-5 w-5" />
                                Profile Information
                            </CardTitle>
                            <CardDescription>Update your personal information and company details</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-center gap-6">
                                <Avatar className="h-20 w-20">
                                    <AvatarImage src="/placeholder.svg?height=80&width=80" alt="Profile" />
                                    <AvatarFallback>JD</AvatarFallback>
                                </Avatar>
                                <div>
                                    <Button variant="outline" className="glass bg-transparent">
                                        Change Photo
                                    </Button>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">JPG, GIF or PNG. 1MB max.</p>
                                </div>
                            </div>

                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="firstName">First Name</Label>
                                    <Input id="firstName" defaultValue="John" className="glass" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="lastName">Last Name</Label>
                                    <Input id="lastName" defaultValue="Doe" className="glass" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" defaultValue="john@company.com" className="glass" />
                            </div>

                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="phone">Phone</Label>
                                    <Input id="phone" defaultValue="+44 20 7123 4567" className="glass" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="timezone">Timezone</Label>
                                    <Select>
                                        <option value="gmt">Greenwich Mean Time (GMT)</option>
                                        <option value="cet">Central European Time (CET)</option>
                                        <option value="est">Eastern Time (EST)</option>
                                        <option value="pst">Pacific Time (PST)</option>
                                    </Select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="company">Company</Label>
                                <Input id="company" defaultValue="Freelance Studio" className="glass" />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="website">Website</Label>
                                <Input id="website" defaultValue="https://freelancestudio.co.uk" className="glass" />
                            </div>

                            <Button className="bg-orange-500 hover:bg-orange-600">Save Changes</Button>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="notifications" className="space-y-6">
                    <Card className="glass-card">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Bell className="h-5 w-5" />
                                Notification Preferences
                            </CardTitle>
                            <CardDescription>Choose what notifications you want to receive</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h4 className="font-medium">Email Notifications</h4>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Receive notifications via email</p>
                                    </div>
                                    <Switch />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <h4 className="font-medium">Project Updates</h4>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Get notified when projects are updated</p>
                                    </div>
                                    <Switch />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <h4 className="font-medium">Invoice Reminders</h4>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Reminders for overdue invoices</p>
                                    </div>
                                    <Switch />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <h4 className="font-medium">Task Deadlines</h4>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            Notifications for upcoming task deadlines
                                        </p>
                                    </div>
                                    <Switch />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <h4 className="font-medium">Client Messages</h4>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">New messages from clients</p>
                                    </div>
                                    <Switch />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <h4 className="font-medium">Weekly Reports</h4>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Weekly summary of your activities</p>
                                    </div>
                                    <Switch />
                                </div>
                            </div>

                            <Button className="bg-orange-500 hover:bg-orange-600">Save Preferences</Button>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="team" className="space-y-6">
                    <Card className="glass-card">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle className="flex items-center gap-2">
                                        <Users className="h-5 w-5" />
                                        Team Members
                                    </CardTitle>
                                    <CardDescription>Manage team access and permissions</CardDescription>
                                </div>
                                <Button className="bg-orange-500 hover:bg-orange-600">
                                    <Plus className="mr-2 h-4 w-4" />
                                    Invite Member
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {teamMembers.map((member) => (
                                    <div key={member.id} className="flex items-center justify-between p-4 rounded-lg glass">
                                        <div className="flex items-center gap-4">
                                            <Avatar>
                                                <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                                                <AvatarFallback>
                                                    {member.name
                                                        .split(" ")
                                                        .map((n) => n[0])
                                                        .join("")}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <h4 className="font-medium">{member.name}</h4>
                                                    <Badge variant={member.role === "Owner" ? "default" : "secondary"}>{member.role}</Badge>
                                                </div>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">{member.email}</p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                                    Last active: {formatDate(member.lastActive)}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-4">
                                            <div className="text-right">
                                                <p className="text-sm font-medium">{member.permissions}</p>
                                            </div>
                                            {member.role !== "Owner" && (
                                                <div className="flex items-center gap-2">
                                                    <Button size="sm" variant="outline" className="glass bg-transparent">
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                    <Button size="sm" variant="outline" className="glass text-red-600 bg-transparent">
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-6 p-4 rounded-lg glass">
                                <h4 className="font-medium mb-2">Permission Levels</h4>
                                <div className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                                    <p>
                                        <strong>Free Plan:</strong> Owner only access
                                    </p>
                                    <p>
                                        <strong>Pro Plan:</strong> Can invite members with read-only access
                                    </p>
                                    <p>
                                        <strong>Enterprise Plan:</strong> Full team collaboration with granular permissions
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="billing" className="space-y-6">
                    <Card className="glass-card">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <CreditCard className="h-5 w-5" />
                                Billing & Subscription
                            </CardTitle>
                            <CardDescription>Manage your subscription and billing information</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-center justify-between p-4 rounded-lg glass">
                                <div>
                                    <h4 className="font-medium">Current Plan</h4>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Pro Plan - £24/month</p>
                                </div>
                                <Badge className="bg-orange-500">Active</Badge>
                            </div>

                            <div className="grid gap-4 md:grid-cols-3">
                                <Card className="glass">
                                    <CardHeader className="text-center pb-2">
                                        <CardTitle className="text-lg">Free</CardTitle>
                                        <div className="text-2xl font-bold">£0</div>
                                    </CardHeader>
                                    <CardContent className="pt-0">
                                        <ul className="space-y-2 text-sm">
                                            <li>• Up to 3 projects</li>
                                            <li>• Basic time tracking</li>
                                            <li>• Simple invoicing</li>
                                            <li>• 1GB storage</li>
                                        </ul>
                                    </CardContent>
                                </Card>

                                <Card className="glass ring-2 ring-orange-500">
                                    <CardHeader className="text-center pb-2">
                                        <CardTitle className="text-lg">Pro</CardTitle>
                                        <div className="text-2xl font-bold text-orange-600">£24</div>
                                        <Badge className="bg-orange-500">Current</Badge>
                                    </CardHeader>
                                    <CardContent className="pt-0">
                                        <ul className="space-y-2 text-sm">
                                            <li>• Unlimited projects</li>
                                            <li>• Advanced analytics</li>
                                            <li>• Client collaboration</li>
                                            <li>• 10GB storage</li>
                                            <li>• Read access sharing</li>
                                        </ul>
                                    </CardContent>
                                </Card>

                                <Card className="glass">
                                    <CardHeader className="text-center pb-2">
                                        <CardTitle className="text-lg">Enterprise</CardTitle>
                                        <div className="text-2xl font-bold">£79</div>
                                    </CardHeader>
                                    <CardContent className="pt-0">
                                        <ul className="space-y-2 text-sm">
                                            <li>• Everything in Pro</li>
                                            <li>• Team management</li>
                                            <li>• Advanced permissions</li>
                                            <li>• 100GB storage</li>
                                            <li>• Priority support</li>
                                        </ul>
                                    </CardContent>
                                </Card>
                            </div>

                            <div className="flex gap-2">
                                <Button variant="outline" className="glass bg-transparent">
                                    Change Plan
                                </Button>
                                <Button variant="outline" className="glass bg-transparent">
                                    Cancel Subscription
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="security" className="space-y-6">
                    <Card className="glass-card">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Shield className="h-5 w-5" />
                                Security Settings
                            </CardTitle>
                            <CardDescription>Manage your account security and privacy</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-4">
                                <div>
                                    <h4 className="font-medium mb-2">Change Password</h4>
                                    <div className="grid gap-4 md:grid-cols-2">
                                        <div className="space-y-2">
                                            <Label htmlFor="current-password">Current Password</Label>
                                            <Input id="current-password" type="password" className="glass" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="new-password">New Password</Label>
                                            <Input id="new-password" type="password" className="glass" />
                                        </div>
                                    </div>
                                    <Button className="mt-4 bg-orange-500 hover:bg-orange-600">Update Password</Button>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <h4 className="font-medium">Two-Factor Authentication</h4>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            Add an extra layer of security to your account
                                        </p>
                                    </div>
                                    <Button variant="outline" className="glass bg-transparent">
                                        Enable 2FA
                                    </Button>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <h4 className="font-medium">Login Notifications</h4>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Get notified of new login attempts</p>
                                    </div>
                                    <Switch />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <h4 className="font-medium">Session Timeout</h4>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Automatically log out after inactivity</p>
                                    </div>
                                    <Select>
                                        <option value="15">15 minutes</option>
                                        <option value="30">30 minutes</option>
                                        <option value="60">1 hour</option>
                                        <option value="never">Never</option>
                                    </Select>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
