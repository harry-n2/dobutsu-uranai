export default function DiagnosisLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-blue-50 flex flex-col items-center py-8 px-4">
            {/* ProgressBar or Header could go here */}
            <div className="w-full max-w-lg mb-6">
                <h2 className="text-center text-gray-400 text-sm font-medium tracking-widest">
                    DNA FORTUNE TELLING
                </h2>
            </div>

            <div className="w-full max-w-lg">
                {children}
            </div>
        </div>
    );
}
