import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { usePage } from '@inertiajs/react'; // To get user_id if logged in
import {
    Dialog,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { DialogSkrining } from '@/components/ui/dialog-skrining';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Check, X } from 'lucide-react';
import { cn } from "@/lib/utils";

// --- Type Definitions ---
interface Question {
    id: number;
    name: string; // The question text
}

interface Answer {
    id: number; // RiskFactor ID
    answer: boolean; // true for "Ya", false for "Tidak"
}

interface ScreeningResult {
    riskLevel: string;
    riskDescription: string;
    suggestions: string[];
    screeningHistoryId: number;
    totalScore: number;
}

interface ScreeningModalProps {
    isOpen: boolean;
    onClose: () => void;
    currentUserBmi?: number | null; // New prop for user's BMI
}

export default function ScreeningModal({ isOpen, onClose, currentUserBmi }: ScreeningModalProps) {
    const { user } = usePage().props.auth; // Get authenticated user if available
    const [step, setStep] = useState<'initial' | 'screening' | 'results'>('initial');
    const [questions, setQuestions] = useState<Question[]>([]);
    const [isLoadingQuestions, setIsLoadingQuestions] = useState(false);
    const [errorQuestions, setErrorQuestions] = useState<string | null>(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<Answer[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorSubmission, setErrorSubmission] = useState<string | null>(null);
    const [screeningResults, setScreeningResults] = useState<ScreeningResult | null>(null);

    const currentQuestions = questions; // Alias for readability

    useEffect(() => {
        if (isOpen && questions.length === 0 && !isLoadingQuestions && !errorQuestions) {
            const fetchQuestions = async () => {
                setIsLoadingQuestions(true);
                setErrorQuestions(null);
                try {
                    const response = await axios.get('/api/screening/questions');
                    setQuestions(response.data);
                } catch (error) {
                    console.error("Error fetching questions:", error);
                    setErrorQuestions("Failed to load screening questions.");
                } finally {
                    setIsLoadingQuestions(false);
                }
            };
            fetchQuestions();
        }
    }, [isOpen, questions.length, isLoadingQuestions, errorQuestions]);

    const handleStart = () => {
        setStep('screening');
    };

    const handleAnswer = async (answer: boolean) => {
        const currentQuestion = currentQuestions[currentQuestionIndex];
        const newAnswer: Answer = {
            id: currentQuestion.id,
            answer: answer,
        };
        const updatedAnswers = [...answers, newAnswer];
        setAnswers(updatedAnswers);

        if (currentQuestionIndex < currentQuestions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            // All questions answered, submit to backend
            setIsSubmitting(true);
            setErrorSubmission(null);
            try {
                const response = await axios.post('/api/screening/submit', {
                    answers: updatedAnswers,
                    bmi: currentUserBmi, // Use BMI from prop
                    user_id: user?.id, // Pass user ID if available
                });
                setScreeningResults(response.data);
                setStep('results');
            } catch (error: any) {
                console.error("Error submitting screening:", error);
                if (error.response && error.response.data && error.response.data.message) {
                    setErrorSubmission(error.response.data.message);
                } else {
                    setErrorSubmission("Failed to submit screening. Please try again.");
                }
                setStep('results'); // Still go to results to show error or retry option
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    const restartScreening = () => {
        setStep('initial');
        setCurrentQuestionIndex(0);
        setAnswers([]);
        setScreeningResults(null);
        setErrorQuestions(null);
        setErrorSubmission(null);
        setIsSubmitting(false);
        setIsLoadingQuestions(false);
    };

    const handleClose = () => {
        restartScreening(); // Reset state when closing
        onClose();
    };

    const progressValue = ((currentQuestionIndex + 1) / currentQuestions.length) * 100;

    const renderContent = () => {
        if (isLoadingQuestions) {
            return (
                <div className="p-6 text-center">
                    <p>Memuat pertanyaan skrining...</p>
                </div>
            );
        }

        if (errorQuestions) {
            return (
                <div className="p-6 text-center text-red-500">
                    <p>{errorQuestions}</p>
                    <Button onClick={handleClose} className="mt-4">Tutup</Button>
                </div>
            );
        }

        switch (step) {


            case 'screening':
                const currentQuestion = currentQuestions[currentQuestionIndex];
                const progressValue = ((currentQuestionIndex + 1) / currentQuestions.length) * 100;
                return (
                    <>
                        <DialogHeader className="p-6">
                            <DialogTitle className="text-center text-sm font-normal text-muted-foreground">
                                Pertanyaan {currentQuestionIndex + 1} dari {currentQuestions.length}
                            </DialogTitle>
                            <Progress value={progressValue} className="w-full h-2" />
                        </DialogHeader>
                        <div className="px-6 py-8">
                            <p className="text-center text-2xl font-bold text-primary min-h-[100px] flex items-center justify-center">
                                {currentQuestion.name}
                            </p>
                        </div>
                        <DialogFooter className="grid grid-cols-2 gap-0 mt-auto">
                            <Button variant="default" size="lg" className="h-20 text-lg font-bold rounded-none rounded-bl-lg" onClick={() => handleAnswer(false)}>
                                <X className="mr-2 h-6 w-6" /> Tidak
                            </Button>
                            <Button variant="secondary" size="lg" className="h-20 text-lg font-bold rounded-none rounded-br-lg" onClick={() => handleAnswer(true)}>
                                <Check className="mr-2 h-6 w-6" /> Ya
                            </Button>
                        </DialogFooter>
                    </>
                );

            case 'results':
                if (isSubmitting) {
                    return (
                        <div className="p-6 text-center">
                            <p>Mengirim jawaban dan menghitung risiko...</p>
                        </div>
                    );
                }

                if (errorSubmission) {
                    return (
                        <>
                            <div className="p-6 text-center text-red-500">
                                <p>{errorSubmission}</p>
                            </div>
                            <DialogFooter className="p-4 pt-4 flex-col sm:flex-col sm:space-x-0 gap-2 border-t">
                                <Button onClick={restartScreening}>Coba Lagi</Button>
                                <Button variant="outline" onClick={handleClose}>Tutup</Button>
                            </DialogFooter>
                        </>
                    );
                }

                if (!screeningResults) {
                    return (
                        <div className="p-6 text-center">
                            <p>Tidak ada hasil skrining.</p>
                            <Button onClick={handleClose} className="mt-4">Tutup</Button>
                        </div>
                    );
                }

                const riskColorClasses: { [key: string]: string } = {
                    "Risiko Rendah": "bg-green-100 border-green-500 text-green-800",
                    "Risiko Sedang": "bg-yellow-100 border-yellow-500 text-yellow-800",
                    "Risiko Tinggi": "bg-red-100 border-red-500 text-red-800",
                    "Tidak Diketahui": "bg-gray-100 border-gray-500 text-gray-800", // Default for 'Tidak Diketahui'
                };
                const riskColor = riskColorClasses[screeningResults.riskLevel] || "bg-gray-100 border-gray-500 text-gray-800"; // Fallback

                const answeredYesQuestions = answers
                    .filter(ans => ans.answer === true)
                    .map(ans => questions.find(q => q.id === ans.id))
                    .filter((q): q is Question => q !== undefined); // Filter out undefined

                return (
                    <>
                        <DialogHeader className="p-6 bg-gradient-to-r from-primary to-secondary text-center rounded-t-lg">
                            <DialogTitle className="text-2xl text-white">Hasil Skrining Anda</DialogTitle>
                        </DialogHeader>

                        <div className="p-6 overflow-y-auto max-h-[75vh]">
                            {/* --- Risk Level Section (Top) --- */}
                            <div className={`text-center p-4 rounded-xl border-2 ${riskColor} mb-6`}>
                                <h3 className="text-base font-bold text-center text-primary">Tingkat Risiko Anda</h3>
                                <p className={`text-3xl font-bold mt-1`}>{screeningResults.riskLevel}</p>
                                <p className={`mt-2 text-sm`}>{screeningResults.riskDescription}</p>
                            </div>

                            {/* --- 2-Column Grid for Details --- */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* --- Left Column: Answered Risk Factors --- */}
                                <div className="p-4 rounded-lg bg-muted">
                                    <h3 className="text-lg font-bold mb-4 text-center">Faktor Risiko Terdeteksi</h3>
                                    {answeredYesQuestions.length > 0 ? (
                                        <ul className="space-y-2">
                                            {answeredYesQuestions.map((question, index) => (
                                                <li key={question.id} className="flex items-start text-sm">
                                                    <span className="flex items-center justify-center font-bold text-primary bg-primary/10 rounded-full h-5 w-5 text-xs flex-shrink-0 mr-3">
                                                        {index + 1}
                                                    </span>
                                                    <span>{question.name}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="text-center text-muted-foreground text-sm">Tidak ada faktor risiko terdeteksi.</p>
                                    )}
                                </div>

                                {/* --- Right Column: Suggestions --- */}
                                <div className="p-4 rounded-lg bg-muted">
                                    <h3 className="text-lg font-bold mb-4 text-center">Saran Penatalaksanaan</h3>
                                    <ul className="space-y-2">
                                        {screeningResults.suggestions.map((suggestion, index) => (
                                            <li key={index} className="flex items-start text-sm">
                                                <Check className="h-5 w-5 text-primary mt-0.5 mr-3 flex-shrink-0" />
                                                <span>{suggestion}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <DialogFooter className="p-4 pt-4 flex-col sm:flex-col sm:space-x-0 gap-2 border-t">
                            <p className="text-xs text-muted-foreground text-center">Ini bukan diagnosis medis. Konsultasikan dengan dokter untuk informasi lebih lanjut.</p>
                            <Button onClick={handleClose}>Selesai</Button>
                        </DialogFooter>
                    </>
                );
            case 'initial':
            default:
                return (
                    <>
                        <DialogHeader className="p-6 bg-gradient-to-r from-primary to-secondary rounded-t-lg text-left">
                            <DialogTitle className="text-2xl font-bold text-white">Mulai Skrining Risiko Hipertensi?</DialogTitle>
                        </DialogHeader>
                        <div className="p-6">
                            <DialogDescription className="text-base text-muted-foreground">
                                Anda akan memulai proses skrining untuk mendeteksi risiko hipertensi. Proses ini terdiri dari beberapa langkah:
                            </DialogDescription>
                            <div className="list-disc list-inside space-y-2 mt-4 text-muted-foreground text-base">
                                <span>Anda akan menjawab <strong>{currentQuestions.length} pertanyaan</strong> singkat terkait gaya hidup dan riwayat kesehatan.</span><br />
                                <span>Jawablah setiap pertanyaan dengan <strong>jujur</strong> untuk hasil yang akurat.</span><br />
                                <span>Hasil skrining ini <strong>bukanlah diagnosis medis</strong>, namun sebagai langkah awal deteksi dini.</span>
                            </div>
                        </div>
                        <DialogFooter className="p-6 pt-0">
                            <Button variant="outline" onClick={handleClose}>Batal</Button>
                            <Button onClick={handleStart}>Lanjutkan</Button>
                        </DialogFooter>
                    </>
                );
        }
    };
    
    // --- Dynamic Class for Modal Width ---
    const dialogWidthClass = {
        initial: "max-w-[calc(100%-40%)]",
        screening: "max-w-[calc(100%-40%)]",
        results: "max-w-[calc(100%-40%)]",
    }[step];

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogSkrining
                className={cn("p-0")}
                onInteractOutside={(e) => { e.preventDefault(); }}
            >
                {renderContent()}
            </DialogSkrining>
        </Dialog>
    );
}