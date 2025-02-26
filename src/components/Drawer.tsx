import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useMissingPersons } from "@/hooks/useMissingPersons";
import { useRouter } from "next/navigation";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const Drawer: React.FC<DrawerProps> = ({ isOpen, onClose }) => {
  const router = useRouter();
  const { missingPersons, loading, error } = useMissingPersons();
  const { logout } = useAuth();
  const first_person_eui = missingPersons[0]?.devEUI;

  return (
    <aside
      className={`fixed inset-y-0 left-0 bg-gray-100 shadow-xl transform w-64 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-500 z-50 flex flex-col justify-between rounded-2xl`}
    >
      <div className="p-6 flex flex-col my-auto pb-20">
        <Button
          onClick={() => router.push("/main")}
          className="text-gray-600 hover:text-black hover:bg-gray-300"
        >
          Main
        </Button>
        <Button
          onClick={() => router.push("/dashboard")}
          className="text-gray-600 hover:text-black hover:bg-gray-300"
        >
          Dashboard
        </Button>
        <Button
          onClick={() => router.push(`/tracker?devEUI=${first_person_eui}`)}
          className="text-gray-600 hover:text-black hover:bg-gray-300"
        >
          Location Tracker
        </Button>
        <Button
          onClick={() => router.push("/event")}
          className="text-gray-600 hover:text-black hover:bg-gray-300"
        >
          Event
        </Button>
        <Button
          onClick={() => router.push("/register")}
          className="text-gray-600 hover:text-black hover:bg-gray-300"
        >
          Register
        </Button>
        <div className="absolute top-0 right-0 m-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-black"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            onClick={onClose}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-0 mb-10 left-6 flex items-center">
        <Button
          onClick={() => {
            logout();
            router.push("/login");
          }}
          className="flex items-center text-red-500 hover:text-red-700 hover:bg-red-200 px-16"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v6"
            />
          </svg>
          <span className="ml-2">Logout</span>
        </Button>
      </div>
    </aside>
  );
};

export default Drawer;
