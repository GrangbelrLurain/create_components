import { useState } from "react";

interface IButtonAndMenu {
  0: JSX.Element;
  1: JSX.Element;
}

type TAnimation = "ghost" | "rolling";

interface IDropdown {
  children: IButtonAndMenu;
  animation: TAnimation;
}

/**
 * First children is hamberger menu & Second children is toggling element
 * */
function Dropdown({ children }: IDropdown) {
  const animationList: {[key in TAnimation]: string } = {
    ghost: ,
    rolling: ,
  };
  const [mDropdown, setMDropdown] = useState(false);

  function openDropdown() {
    setMDropdown(true);
  }

  function closeDropdown() {
    setMDropdown(false);
  }

  function toggleDropdown() {
    setMDropdown((toggle) => !toggle);
  }

  function RenderDropdownElement() {
    const childrenElement = children[1].props.children || "";
    const props = children[1].props;
    if (mDropdown) {
      return <div {...props}>{childrenElement}</div>;
    }
    return null;
  }

  function RenderEventElement() {
    const childrenElement = children[0].props.children || "";
    const props = children[0].props;
    return (
      <div onFocus={openDropdown} onBlur={closeDropdown}>
        <button {...props}>{childrenElement}</button>
        <RenderDropdownElement />
      </div>
    );
  }

  return <RenderEventElement />;
}

export default Dropdown;
