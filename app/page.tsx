import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Link className="btn btn-primary" href="/admin">Open my admin</Link>
    </div>
  );
}