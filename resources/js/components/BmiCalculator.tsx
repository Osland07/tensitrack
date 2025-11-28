import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { cn } from '@/lib/utils';
import { usePage } from '@inertiajs/react';
import { type SharedData } from '@/types'; // Import SharedData
import axios from 'axios'; // Import axios

interface UserData {
    id: number;
    name: string;
    email: string;
    height?: number;
    weight?: number;
    bmi?: number;
}

interface BmiCalculatorProps {
    user?: UserData; // Optional user prop
}

export default function BmiCalculator({ user: userProp }: BmiCalculatorProps) {
    const { auth } = usePage<SharedData>().props;
    const currentUser = userProp || auth.user; // Use prop or auth user
    const [gender, setGender] = useState('male');
    const [height, setHeight] = useState<string | number>(currentUser?.height || '');
    const [weight, setWeight] = useState<string | number>(currentUser?.weight || '');
    const [bmiResult, setBmiResult] = useState<string | null>(null);
    const [bmiCategory, setBmiCategory] = useState<string | null>(null);
    const [isSaving, setIsSaving] = useState(false); // New state for saving status
    const [saveError, setSaveError] = useState<string | null>(null); // New state for saving error

    // Helper function for Asian/Indonesian BMI classification
    const getBmiCategory = (bmi: number): string => {
        if (bmi < 18.5) {
            return "Underweight";
        } else if (bmi >= 18.5 && bmi <= 22.9) {
            return "Normal Weight";
        } else if (bmi >= 23.0 && bmi <= 24.9) {
            return "Overweight";
        } else if (bmi >= 25.0 && bmi <= 29.9) {
            return "Obese I";
        } else {
            return "Obese II";
        }
    };

    useEffect(() => {
        if (currentUser) {
            setHeight(currentUser.height || '');
            setWeight(currentUser.weight || '');
            if (currentUser.bmi !== undefined && currentUser.bmi !== null) {
                const userBmi = parseFloat(currentUser.bmi.toString()); // Ensure it's a number
                setBmiResult(userBmi.toFixed(1));
                setBmiCategory(getBmiCategory(userBmi));
            } else {
                setBmiResult(null);
                setBmiCategory(null);
            }
        }
    }, [currentUser]);

    const calculateBMI = async () => { // Made async
        const h = parseFloat(height as string);
        const w = parseFloat(weight as string);

        if (isNaN(h) || isNaN(w) || h <= 0 || w <= 0) {
            setBmiResult("Invalid");
            setBmiCategory("Please enter valid data.");
            return;
        }

        setHeight(h); // Ensure state is number
        setWeight(w); // Ensure state is number

        const heightInMeters = h / 100;
        const bmi = (w / (heightInMeters * heightInMeters));

        setBmiResult(bmi.toFixed(1));
        setBmiCategory(getBmiCategory(bmi));

        // Save to backend if user is logged in
        if (currentUser) {
            setIsSaving(true);
            setSaveError(null);
            try {
                await axios.post('/api/screening/bmi', {
                    height: h,
                    weight: w,
                    bmi: parseFloat(bmi.toFixed(2)), // Send rounded BMI
                });
                // Optionally update local user object if necessary, or refetch user data
            } catch (error) {
                console.error("Error saving BMI details:", error);
                setSaveError("Failed to save BMI details. Please try again.");
            } finally {
                setIsSaving(false);
            }
        }
    };

    // Define styles for dark card
    const cardStyles = "w-full shadow-2xl rounded-2xl bg-primary text-primary-foreground border-secondary/20";
    const inputStyles = "bg-primary-foreground/5 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40 focus:border-secondary";
    const labelStyles = "text-secondary font-semibold";
    const radioLabelStyles = "flex flex-col items-center justify-between rounded-md border-2 border-primary-foreground/20 bg-transparent p-4 hover:bg-white/10 peer-data-[state=checked]:border-secondary [&:has([data-state=checked])]:border-secondary";

    return (
        <Card className={cardStyles}>
            <CardHeader className="text-center">
                <CardTitle className="text-2xl">BMI Calculator</CardTitle>
                <CardDescription className="text-primary-foreground/60">Your health journey starts here. Discover your Body Mass Index.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
                <RadioGroup defaultValue="male" onValueChange={setGender} className="grid grid-cols-2 gap-4">
                    <div>
                        <RadioGroupItem value="male" id="male" className="peer sr-only" />
                        <Label htmlFor="male" className={radioLabelStyles}>Male</Label>
                    </div>
                    <div>
                        <RadioGroupItem value="female" id="female" className="peer sr-only" />
                        <Label htmlFor="female" className={radioLabelStyles}>Female</Label>
                    </div>
                </RadioGroup>
                <div className="grid gap-2">
                    <Label htmlFor="height" className={labelStyles}>Height (cm)</Label>
                    <Input id="height" type="number" placeholder="e.g., 175" value={height} onChange={(e) => setHeight(e.target.value)} className={inputStyles} />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="weight" className={labelStyles}>Weight (kg)</Label>
                    <Input id="weight" type="number" placeholder="e.g., 70" value={weight} onChange={(e) => setWeight(e.target.value)} className={inputStyles} />
                </div>
            </CardContent>
            <CardFooter className="flex flex-col items-stretch gap-4 p-6">
                <Button onClick={calculateBMI} variant="secondary" size="lg" className="font-bold text-lg">
                    Calculate BMI
                </Button>
                {bmiResult && (
                    <div className={cn(
                        "text-center p-4 mt-4 rounded-lg transition-all duration-300",
                        bmiCategory === "Normal Weight" ? "bg-green-500/10 text-green-400" :
                        bmiCategory === "Underweight" || bmiCategory === "Overweight" ? "bg-yellow-500/10 text-yellow-400" :
                        "bg-red-500/10 text-red-400"
                    )}>
                        <p className="text-sm font-medium">Your BMI Result</p>
                        <p className="text-4xl font-extrabold tracking-tighter">{bmiResult}</p>
                        <p className="font-semibold">{bmiCategory}</p>
                    </div>
                )}
            </CardFooter>
        </Card>
    );
}
