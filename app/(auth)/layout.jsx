export const metadata = {
  title: "Authentification",
  description: "Sportscape Authentification Page",
};

export default function AuthLayout({ children }) {
  return (
    <main data-theme="winter">
      <div className="flex flex-col h-screen">
        <div className="grid place-items-center my-20 sm:my-auto">
          {children}
        </div>
      </div>
    </main>
  );
}
