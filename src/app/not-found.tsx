import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-black px-4">
      <div className="text-center mb-6">
        <h1 className="text-[120px] font-bold text-white leading-none">404</h1>
      </div>
      
      <div className="text-center space-y-8">
        <p className="text-gray-400 text-xl font-medium mb-8">
          您可能尚未登录或没有访问权限
        </p>
        <Link href="/sign-in">
          <button className="px-8 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-full transition-colors duration-200 border border-gray-600">
            前往登录
          </button>
        </Link>
      </div>
    </div>
  );
}