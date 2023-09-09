import Link from "next/link";

export default function Home() {
  return <div>
    <h1 className='text-4xl'>Home</h1>
    <Link className="btn-primary" href="/admin">Open my admin</Link>
  </div>;
}