import React from 'react';

type RiskFactor = {
    id: number;
    code: string;
    name: string;
    description: string | null;
    suggestion: string | null;
};

type Paginator<T> = {
    data: T[];
    links: { url: string | null; label: string; active: boolean }[];
    current_page: number;
    last_page: number;
    from: number | null;
    to: number | null;
    total: number;
};

export default function RiskFactorsPrint({ riskFactors }: { riskFactors: Paginator<RiskFactor> }) {
    return (
        <div className="print-only p-6">
            <h1 className="text-2xl font-bold mb-4">Laporan Faktor Risiko</h1>
            <table className="w-full border-collapse">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border p-2 text-left">Kode</th>
                        <th className="border p-2 text-left">Nama</th>
                        <th className="border p-2 text-left">Deskripsi</th>
                        <th className="border p-2 text-left">Saran</th>
                    </tr>
                </thead>
                <tbody>
                    {riskFactors.data.map((riskFactor) => (
                        <tr key={riskFactor.id}>
                            <td className="border p-2">{riskFactor.code}</td>
                            <td className="border p-2">{riskFactor.name}</td>
                            <td className="border p-2">{riskFactor.description}</td>
                            <td className="border p-2">{riskFactor.suggestion}</td>
                        </tr>
                    ))}
                    {riskFactors.data.length === 0 && (
                        <tr>
                            <td colSpan={4} className="border p-2 text-center">
                                Tidak ada faktor risiko ditemukan.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
