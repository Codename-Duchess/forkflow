'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button/button';
import { Input } from '@/components/ui/input/input';
import { Label } from '@/components/ui/label/label';
import { Check } from 'lucide-react';
import clsx from 'clsx';
import { redirect } from 'next/navigation';

const modules = [
    { id: 'bookings', name: 'Booking management', description: 'Take online bookings based around your opening hours and capacity.', base: true },
    { id: 'rotas', name: 'Staff rotas', description: 'Configure shift requirements, add staff and conditional patterns.', price: 4 },
    // { id: 'document_storage', name: 'Document storage', description: 'Securely store and share files.', price: 3 },
    { id: 'calendar', name: 'Calendar', description: 'Connect to staff rotas and bookings to identify over/understaffed shifts.', price: 3 },
    { id: 'reminders', name: 'Reminders & notifications', description: 'Set reminders for supplier orders, prep for events, staff holidays etc', price: 2 },
    { id: 'stock-management', name: 'Stock management', description: 'Set par levels to assist with stocktakes, orders and menu design/pricing.', price: 4 },
    { id: 'data-insights', name: 'Data insights', description: 'Graphs and insights based on your data', price: 4 },
];

export default function PrelaunchCalculator() {
    const [selectedModules, setSelectedModules] = useState<string[]>([]);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const toggleModule = (id: string) => {
        if (modules.find(m => m.id === id)?.base) return; // base modules always included
        setSelectedModules(prev =>
            prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]
        );
    };

    const total = selectedModules.reduce((sum, id) => {
        const mod = modules.find(m => m.id === id);
        return mod ? sum + (mod.price || 0) : sum;
    }, 0);

    const handleSubmit = async () => {
        if (!email || !firstName || !lastName) return;

        console.log('Submitting:', JSON.stringify({ first_name: firstName, last_name: lastName, email: email, modules: selectedModules, total_price: total }));


        try {
            await fetch('/api/prelaunch-signups', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ first_name: firstName, last_name: lastName, email: email, modules: selectedModules, total_price: total }),
            });
            setSubmitted(true);
            console.log('Signup successful');
        } catch (error) {
            console.error('Signup failed:', error);
        }
        redirect('/thank-you');
    };

    return (
        <div className="max-w-5xl mx-auto p-6 bg-white rounded-2xl shadow-md border border-sky-50">
            <h1 className="text-4xl text-center font-bold text-sky-900 mb-2">Forkflow</h1>
            <h2 className="text-xl text-center font-bold text-sky-900 mb-2">Restaurant management software to optimise your management tasks</h2>
            <p className="text-sky-700 mb-6">Select the features you need and sign up for early access to our Beta app. Early access users and backers will receive exclusive benefits and pricing.</p>
            <hr className="mb-4" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {modules.map(({ id, name, description, base }) => {
                    const selected = selectedModules.includes(id) || base;
                    return (
                        <button
                            key={id}
                            type="button"
                            onClick={() => toggleModule(id)}
                            disabled={base}
                            className={clsx(
                                'relative rounded-xl border p-5 text-left flex flex-col gap-2 transition-colors',
                                selected ? 'bg-sky-50 border-sky-400' : 'bg-white border-gray-300 hover:border-sky-300',
                                base && 'cursor-not-allowed opacity-60'
                            )}
                        >
                            <div className="flex items-center gap-3">
                                <div className="relative w-5 h-5 flex items-center justify-center border rounded text-sky-600">
                                    {selected ? <Check size={16} /> : null}
                                </div>
                                <h3 className="text-lg font-semibold text-sky-900">{name}</h3>
                            </div>
                            <p className="text-sm text-gray-600">{description}</p>
                        </button>
                    );
                })}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                    <Label htmlFor="first-name">First name</Label>
                    <Input
                        id="first-name"
                        type="text"
                        value={firstName}
                        onChange={e => setFirstName(e.target.value)}
                        required
                        className="mt-1"
                    />
                </div>
                <div>
                    <Label htmlFor="last-name">Last name</Label>
                    <Input
                        id="last-name"
                        type="text"
                        value={lastName}
                        onChange={e => setLastName(e.target.value)}
                        required
                        className="mt-1"
                    />
                </div>
            </div>

            <div className="mb-6">
                <Label htmlFor="email">Email for early access</Label>
                <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    className="mt-1"
                />
            </div>

            <div className="flex justify-between items-center">
                <p className="text-lg font-medium text-sky-900">
                    Estimated Price: <span className="font-bold">£{total}/mo</span>
                </p>
                <Button type="button" onClick={handleSubmit} disabled={submitted}>
                    {submitted ? 'Submitted!' : 'Register for Beta access'}
                </Button>
            </div>
        </div>
    );
}
