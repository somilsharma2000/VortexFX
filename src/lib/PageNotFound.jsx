import { Link } from "react-router-dom";

export default function PageNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: "#0A0E27" }}>
      <div className="text-center">
        <h1 className="text-6xl font-bold text-[#D4AF37] mb-4">404</h1>
        <p className="text-[#A0A8C0] mb-6">This page doesn't exist.</p>
        <Link to="/" className="btn-primary">Back to Dashboard</Link>
      </div>
    </div>
  );
}