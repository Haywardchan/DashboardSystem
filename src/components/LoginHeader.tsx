import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function LoginHeader() {
    const router = useRouter();

    return (
        <header className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                <h1 className="text-2xl font-semibold text-gray-900">Missing Person Tracker</h1>
                <div className="space-x-2">
                    <Button
                        variant="outline"
                        className="bg-black text-white hover:bg-gray-800"
                        onClick={() => router.push('/login')}
                    >
                        Login
                    </Button>
                    <Button
                        variant="outline"
                        className="bg-black text-white hover:bg-gray-800"
                        onClick={() => router.push('/register')}
                    >
                        Register
                    </Button>
                </div>
            </div>
        </header>
    );
}