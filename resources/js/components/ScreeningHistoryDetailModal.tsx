import React from 'react';

type User = {
    id: number;
    name: string;
};

type RiskLevel = {
    id: number;
    name: string;
};

type RiskFactor = {
    id: number;
    name: string;
    pivot: {
        answer: string;
    };
};

type ScreeningHistory = {
    id: number;
    user: User;
    risk_level: RiskLevel;
    screening_date: string;
    screening_result: string;
    bmi: number;
    created_at: string;
    risk_factors: RiskFactor[];
};

interface ScreeningHistoryDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    history: ScreeningHistory | null;
}

const ScreeningHistoryDetailModal: React.FC<ScreeningHistoryDetailModalProps> = ({ isOpen, onClose, history }) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="bg-white rounded-lg shadow-xl overflow-hidden w-[calc(100%-40%)] max-h-[90vh] flex flex-col">
                <div className="bg-primary text-primary-foreground p-6 rounded-t-lg sticky top-0 z-10 flex justify-between items-center">
                    <h2 className="text-2xl font-bold">Detail Riwayat Skrining</h2>
                    <button onClick={onClose} className="text-primary-foreground hover:text-white text-3xl leading-none">
                        &times;
                    </button>
                </div>

                <div className="p-6 flex-grow overflow-y-auto">
                    {history ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                            {/* Section Identitas Pengguna */}
                            <div className="space-y-2 p-4 border rounded-lg bg-gray-50/50 md:border-r md:border-gray-300 md:pr-6">
                                <h4 className="font-semibold text-lg pb-2 mb-2 border-b-2 border-primary/50 text-primary">Data Pengguna</h4>
                                <div className="grid grid-cols-2 items-center">
                                    <p className="font-medium">Nama Pengguna:</p>
                                    <p>{history.user.name}</p>
                                </div>
                                <div className="grid grid-cols-2 items-center">
                                    <p className="font-medium">Tingkat Risiko:</p>
                                    <p>{history.risk_level.name}</p>
                                </div>
                                <div className="grid grid-cols-2 items-center">
                                    <p className="font-medium">Hasil Skrining:</p>
                                    <p>{history.screening_result}</p>
                                </div>
                                <div className="grid grid-cols-2 items-center">
                                    <p className="font-medium">BMI:</p>
                                    <p>{history.bmi}</p>
                                </div>
                                <div className="grid grid-cols-2 items-center">
                                    <p className="font-medium">Tanggal Skrining:</p>
                                    <p>{new Date(history.screening_date).toLocaleDateString('id-ID')}</p>
                                </div>
                                <div className="grid grid-cols-2 items-center">
                                    <p className="font-medium">Dibuat Pada:</p>
                                    <p>{new Date(history.created_at).toLocaleDateString('id-ID')}</p>
                                </div>
                            </div>

                            {/* Section Faktor Risiko yang Dijawab */}
                            {history.risk_factors.filter(factor => factor.pivot.answer === 1).length > 0 && (
                                <div className="space-y-2 p-4 border rounded-lg bg-gray-50/50 md:pl-6">
                                    <h4 className="font-semibold text-lg pb-2 mb-2 border-b-2 border-primary/50 text-primary">Faktor Risiko yang Dijawab</h4>
                                    <ul className="pl-0 space-y-1">
                                        {history.risk_factors.filter(factor => factor.pivot.answer === 1).map((factor, index) => (
                                            <li key={factor.id} className={`text-gray-700 pb-2 pt-2 ${index < history.risk_factors.filter(factor => factor.pivot.answer === 1).length - 1 ? 'border-b border-gray-200' : ''}`}>
                                                {factor.name}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    ) : (
                        <p className="text-center text-gray-500">Tidak ada detail yang tersedia.</p>
                    )}
                </div>

                <div className="p-4 bg-gray-50 rounded-b-lg sticky bottom-0 z-10 flex justify-end">
                    <button onClick={onClose} className="btn-modern bg-secondary text-secondary-foreground hover:bg-secondary/90 hover:text-white font-bold text-lg">
                        Tutup
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ScreeningHistoryDetailModal;
