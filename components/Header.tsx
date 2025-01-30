import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="header">
      <Link href="/">
        <Image src="/logo.png" alt="CodeShare Logo" width={100} height={50} />
      </Link>
    </header>
  );
}