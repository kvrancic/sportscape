export const metadata = {
  title: "Authentification",
  description: "Sportscape Authentification Page",
};

export default function AuthLayout({ children }) {
  return (
    <main data-theme="winter">
      <div className="flex flex-col h-screen">
        <div className="header border-b border-gray-300 py-8 px-4 mx-8 text-center">
          <h1 className="font-semibold">SPORTSCAPE</h1>
        </div>
        <div className="grid place-items-center my-20 mx-2 sm:my-auto">
          {children}
        </div>
      </div>
    </main>
  );
}
