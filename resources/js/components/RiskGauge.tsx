import React from 'react';
import { HeartPulse, PersonStanding } from 'lucide-react';

const RiskGauge = () => {
    return (
        <div className="card-body flex flex-col justify-center items-center text-center p-5 relative">

            {/* Visual Speedometer/Gauge Effect (Multicolor) */}
            <div className="relative mb-4" style={{ width: '220px', height: '110px', overflow: 'hidden' }}>
                {/* Gauge Arc (3 Warna) */}
                <div
                    className="gauge-multicolor" // This class has animations defined in app.css
                    style={{
                        width: '220px',
                        height: '220px',
                        borderRadius: '50%',
                        // Background gradient and mask are now in app.css via .gauge-multicolor
                    }}
                ></div>

                {/* Animated Needle */}
                <div
                    className="gauge-needle-anim" // This class has animations defined in app.css
                    style={{
                        position: 'absolute',
                        bottom: '0',
                        left: '50%',
                        width: '4px',
                        height: '95px',
                        background: 'white',
                        borderRadius: '2px',
                        boxShadow: '0 0 10px rgba(0,0,0,0.5)',
                        marginLeft: '-2px',
                        zIndex: 2,
                        transformOrigin: 'bottom center', // For animation
                        // Initial transform is set by gauge-needle-anim in app.css
                    }}
                ></div>

                {/* Center Dot */}
                <div
                    style={{
                        position: 'absolute',
                        bottom: '-10px',
                        left: '50%',
                        width: '24px',
                        height: '24px',
                        background: 'white',
                        borderRadius: '50%',
                        transform: 'translate(-50%, 0)',
                        zIndex: 3,
                        border: '4px solid #001B48',
                    }}
                ></div>

                {/* Label Text (Opsional) */}
                <div
                    className="flex justify-between w-full absolute px-2"
                    style={{ bottom: '5px', fontSize: '0.65rem', fontWeight: 'bold', color: 'rgba(255,255,255,0.7)' }}
                >
                    <span>AMAN</span>
                    <span style={{ marginLeft: '10px' }}>WASPADA</span>
                    <span>BAHAYA</span>
                </div>
            </div>

            <h3 className="font-bold mb-2 text-white">Analisis Risiko</h3> {/* Added text-white */}
            <p className="text-white-50 mb-4 px-3 text-sm"> {/* Changed small to text-sm */}
                Teknologi kami memproses data gaya hidup Anda untuk memetakan posisi risiko kesehatan Anda.
            </p>


            {/* Stats / Features Floating */}
            <div className="grid grid-cols-2 gap-2 w-full">
                <div className="col-span-1">
                    <div className="bg-white bg-opacity-10 p-3 rounded-xl text-start border border-white border-opacity-10 h-full"> {/* Changed rounded-3 to rounded-xl */}
                        <HeartPulse className="text-green-500 mb-2 block h-6 w-6" /> {/* Changed icon and size */}
                        <small className="block opacity-75 text-xs">PARAMETER</small>
                        <strong className="text-sm">Hasil pengukuran tekanan darah</strong> {/* Changed small to text-sm */}
                    </div>
                </div>
                <div className="col-span-1">
                    <div className="bg-white bg-opacity-10 p-3 rounded-xl text-start border border-white border-opacity-10 h-full"> {/* Changed rounded-3 to rounded-xl */}
                        <PersonStanding className="text-yellow-500 mb-2 block h-6 w-6" /> {/* Changed icon and size */}
                        <small className="block opacity-75 text-xs">PARAMETER</small>
                        <strong className="text-sm">Riwayat keluarga & gaya hidup</strong> {/* Changed small to text-sm */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RiskGauge;
