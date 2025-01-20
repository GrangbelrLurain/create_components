import { useEffect, useRef } from "react";
import Core from "@whole-ui/core";
import { CoreProps } from "@whole-ui/core/src/app/type";
import { Plugins } from "@whole-ui/core/src/shared/plugin/type";

export default function createReactWrapper<
  T extends keyof HTMLElementTagNameMap
>(
  VanillaComponent: new (
    props: CoreProps<T, keyof HTMLElementEventMap>,
    plugins?: Plugins<HTMLElementTagNameMap[T]>
  ) => Core<T, keyof HTMLElementEventMap>
) {
  return function ReactWrapper({
    state,
    events,
    plugins,
  }: {
    state?: Partial<HTMLElementTagNameMap[T]>;
    events?: Record<keyof HTMLElementEventMap, any>;
    plugins?: Plugins<HTMLElementTagNameMap[T]>;
  }) {
    const coreRef = useRef<Core<T, keyof HTMLElementEventMap> | null>(null);

    useEffect(() => {
      if (coreRef.current) {
        if (state) {
          coreRef.current?.setState(state);
        }
        if (events) {
          coreRef.current?.setEvents(events);
        }
        if (plugins) {
          coreRef.current?.setPlugins(plugins);
        }
      } else if (!coreRef.current?.ref) {
        coreRef.current = new VanillaComponent({ state, events }, plugins);
        coreRef.current.mount();
      }
      return () => {
        coreRef.current?.unmount();
      };
    }, [state, events, plugins]);

    return coreRef.current.ref;
  };
}
