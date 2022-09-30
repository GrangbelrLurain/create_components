import Dropdown from "../../components/dropdown";

const dropdown = () => (
  <section>
    <Dropdown>
      <button className="px-4 py-2 bg-black rounded-md"></button>
      <ul className="px-4 py-2 w-40 h-80 bg-black rounded-md text-white">
        <li>메뉴 1</li>
        <li>메뉴 2</li>
        <li>메뉴 3</li>
        <li>메뉴 4</li>
        <li>메뉴 5</li>
        <li>메뉴 6</li>
        <li>메뉴 7</li>
      </ul>
    </Dropdown>
    <div className='h-40'>123</div>
  </section>
);

export default dropdown;
