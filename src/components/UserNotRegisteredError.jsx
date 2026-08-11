export default function UserNotRegisteredError() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: "#0A0E27" }}>
      <div className="card text-center max-w-md">
        <h1 className="text-2xl font-bold text-white mb-3">Account not registered</h1>
        <p className="text-[#A0A8C0]">Your account isn't registered on FORTREX yet. Join via Discord or contact an admin to get access.</p>
      </div>
    </div>
  );
}