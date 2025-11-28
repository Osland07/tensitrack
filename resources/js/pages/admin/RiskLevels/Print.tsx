import React from 'react';

type RiskLevel = {
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

export default function RiskLevelsPrint({ riskLevels }: { riskLevels: Paginator<RiskLevel> }) {
    return (
        <div className="print-only p-6">
            <h1 className="text-2xl font-bold mb-4">Laporan Tingkat Risiko</h1>
            <table className="w-full border-collapse">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border p-2 text-left">Kode</th>
                        <th className="border p-2 text-left">Nama</th>
                        <th className="border p-2 text-left">Keterangan</th>
                        <th className="border p-2 text-left">Saran</th>
                    </tr>
                </thead>
                <tbody>
                    {riskLevels.data.map((riskLevel) => (
                        <tr key={riskLevel.id}>
                            <td className="border p-2">{riskLevel.code}</td>
                            <td className="border p-2">{riskLevel.name}</td>
                            <td className="border p-2">{riskLevel.description}</td>
                            <td className="border p-2">{riskLevel.suggestion}</td>
                        </tr>
                    ))}
                    {riskLevels.data.length === 0 && (
                        <tr>
                            <td colSpan={4} className="border p-2 text-center">
                                Tidak ada tingkat risiko ditemukan.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
