import Core from "@core/app/main";
import { CoreProps } from "@core/app/type";
import { Plugins } from "@core/shared/plugin/type";

export default class Input extends Core<"input"> {
  constructor(
    props: CoreProps<"input", "change" | "input"> = {
      state: {},
      events: {},
    },
    plugins: Plugins<HTMLInputElement> = []
  ) {
    super("input", props, plugins);
  }
}
