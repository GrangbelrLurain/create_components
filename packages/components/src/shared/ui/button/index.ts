import Core from "@core/app/main";
import { CoreProps } from "@core/app/type";
import { Plugins } from "@core/shared/plugin/type";

export default class Button extends Core {
  constructor(
    props: CoreProps<"button", "click" | "mouseup" | "mousedown"> = {
      state: {},
      events: {},
    },
    plugins: Plugins<HTMLButtonElement> = []
  ) {
    super("button", props, plugins);
  }
}
