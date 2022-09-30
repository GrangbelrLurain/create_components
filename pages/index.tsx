import type { NextPage } from "next";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <div>
      <h1>CC</h1>
      <h2>Create Components</h2>
      <h3>Components List</h3>
      <ul>
        <Link href="/calculator">
          <li>계산기</li>
        </Link>
        <Link href="/dropdown">
          <li>드롭다운 메뉴</li>
        </Link>
      </ul>
    </div>
  );
};

export default Home;
