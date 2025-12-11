"use client";

import {useEffect, useState, useRef, useCallback} from "react";
import {Html5QrcodeScanner} from "html5-qrcode";

const StatusModal = ({message, type, onClose}) => {
    const isSuccess = type === "success";
    const textColor = isSuccess ? "text-green-500" : "text-red-500";
    const title = isSuccess ? "Berhasil!" : "Gagal!"

    return (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
            <div
                className="rounded-xl shadow-lg p-5 w-full max-w-sm transform transition-all scale-100 text-gray-800 bg-white">
                <h3 className={`text-2xl font-bold mb-4 border-b border-gray-800 border-opacity-30 pb-2 ${textColor}`}>{title}</h3>
                <p className="mb-6">{message}</p>
                <button onClick={onClose}
                        className="w-full bg-gray-800 text-white font-semibold py-2 rounded-md hover:bg-gray-600 transition duration-150">
                    Tutup
                </button>
            </div>
        </div>
    );
}

const LoadingSpinner = () => (
    <div className="flex items-center justify-center p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-700"></div>
        <p className="ml-3 text-purple-700 font-medium">Memproses data...</p>
    </div>
);

export default function QRScannerPage() {
    const [scanResult, setScanResult] = useState(null);
    const [isScanning, setIsScanning] = useState(false);
    const [loading, setLoading] = useState(false);

    const [modal, setModal] = useState({
        show: false,
        message: "",
        type: ""
    });

    const scannerRef = useRef(null);
    const API_URL = "https://unwinning-kieran-stutteringly.ngrok-free.dev/webhook-test/attendance";

    const closeModal = () => {
        setModal({
            show: false,
            message: "",
            type: ""
        });
    };

    const stopScanning = useCallback(() => {
        if (scannerRef.current) {
            scannerRef.current.clear().catch(console.error);
            scannerRef.current = null;
        }
        setIsScanning(false);
    }, []);

    const sendToServer = async (text) => {
        setLoading(true);
        // stopScanning();

        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ticket_id: text
                }),
            });

            if (!response.ok) {
                throw new Error(`Server error: HTTP ${response.status}`);
            }

            const result = await response.json();

            if (result && result.success === true) {
                setModal({
                    show: true,
                    message: result.data || "Peserta berhasil diverifikasi!",
                    type: "success"
                });
                setScanResult(text);
            } else {
                throw new Error(result.data || result.message || "Verifikasi tiket gagal.");
            }

        } catch (err) {
            console.error("Kesalahan saat mengirim/memproses:", err);
            setModal({
                show: true,
                message: "Terjadi kesalahan: " + err.message,
                type: "failure"
            });
        } finally {
            setLoading(false);
            stopScanning();
        }
    };

    const onScanSuccess = (decodedText, decodedResult) => {
        console.log(`QR Code terdeteksi: ${decodedText}`);
        sendToServer(decodedText);
    };

    const onScanError = (err) => {

    };

    const startScanning = () => {
        setScanResult(null);
        setModal({
            show: false,
            message: "",
            type: ""
        });
        setIsScanning(true);

        setTimeout(() => {
            if (!scannerRef.current) {
                const scanner = new Html5QrcodeScanner(
                    "reader",
                    {
                        fps: 10,
                        qrbox: {
                            width: 250,
                            height: 250
                        },
                        disableFlip: false
                    }, // disableFlip: false untuk kamera depan/belakang
                    false // verbose = false
                );

                scanner.render(onScanSuccess, onScanError);
                scannerRef.current = scanner;
            }
        }, 100);
    };

    useEffect(() => {
        return () => {
            stopScanning();
        };
    }, [stopScanning]);

    const primaryColor = "#7209b7";
    const secondaryColor = "#f72585";

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center p-4 sm:p-8">
            <h1 className="font-extrabold text-4xl mb-10 text-gray-800" style={{color: primaryColor}}>
                🎟️ Verifikasi Tiket Peserta
            </h1>

            {modal.show && <StatusModal message={modal.message} type={modal.type} onClose={closeModal}/>}

            <div className="w-full max-w-lg bg-white p-6 rounded-xl shadow-2xl transition-all duration-300">
                {!isScanning ? (
                    <div className="flex flex-col items-center gap-6">
                        <div className="w-48 h-48 rounded-full bg-purple-100 flex items-center justify-center">
                            <svg className="w-24 h-24 text-purple-600" fill="none" stroke="currentColor"
                                 viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M12 4v16m8-8H4m12 0a4 4 0 11-8 0 4 4 0 018 0z"></path>
                            </svg>
                        </div>
                        <p className="text-center text-gray-600 font-medium">
                            Siap untuk memindai? Klik tombol di bawah untuk mengaktifkan kamera dan memverifikasi tiket.
                        </p>
                        <button
                            onClick={startScanning}
                            style={{backgroundColor: secondaryColor}}
                            className="w-full py-3 px-4 rounded-lg text-white font-semibold text-lg hover:shadow-lg hover:opacity-90 transition duration-300 transform hover:scale-[1.01]"
                        >
                            Mulai Scanning
                        </button>
                    </div>
                ) : (
                    <div className="flex flex-col items-center gap-4">
                        <div id="reader" className="w-full h-auto max-w-xs sm:max-w-none">

                        </div>

                        <button onClick={stopScanning}
                                className="w-full py-2 px-4 rounded-lg bg-gray-500 text-white font-medium hover:bg-gray-600 transition duration-200">
                            Hentikan Scanning
                        </button>
                    </div>
                )}

                <div className="mt-8 pt-4 border-t border-gray-200">
                    {loading && <LoadingSpinner/>}

                    {scanResult && !loading && (
                        <div className="mt-5 p-4 bg-purple-50 border-l-4 border-purple-500 rounded-md text-gray-800">
                            <strong className="text-purple-700">ID Tiket Terakhir Diverifikasi:</strong>
                            <p className="mt-1 font-mono break-words text-sm">{scanResult}</p>
                        </div>
                    )}

                    {!isScanning && !scanResult && !loading && (
                        <p className="text-center text-gray-400 text-sm italic">
                            Tekan tombol diatas untuk memulai proses verifikasi.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}