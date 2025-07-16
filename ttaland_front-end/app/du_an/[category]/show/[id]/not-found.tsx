import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-800 flex items-center justify-center">
      <div className="text-center text-white max-w-md mx-auto px-4">
        <FontAwesomeIcon icon={faExclamationTriangle} className="text-6xl text-yellow-400 mb-6" />
        <h2 className="text-3xl font-bold mb-4">Project Not Found</h2>
        <p className="mb-8 text-gray-300 text-lg">
          The project you are looking for does not exist or may have been removed.
        </p>
        <div className="space-y-4">
          <Link href="/du_an/tat_ca" className="inline-flex items-center bg-blue-950 text-white px-6 py-3 rounded-lg hover:bg-blue-900 transition-colors">
            <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
            Return to All Projects
          </Link>
        </div>
      </div>
    </div>
  );
}
