import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center py-6">
        <Link className="btn btn-primary" href="/admin">Open my admin</Link>
    </div>
  );
}