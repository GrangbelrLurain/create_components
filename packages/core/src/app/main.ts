import type { Plugins } from "../shared/plugin/type";
import type { CoreProps } from "./type";

export default class Core<
  T extends keyof HTMLElementTagNameMap = keyof HTMLElementTagNameMap,
  K extends keyof HTMLElementEventMap = keyof HTMLElementEventMap
> {
  protected element: HTMLElementTagNameMap[T];
  protected props: CoreProps<T, K> = {
    events: {},
    state: {},
  };
  protected plugins: Plugins<HTMLElementTagNameMap[T]> = [];

  constructor(
    tagName: T,
    props: CoreProps<T, K> = {
      events: {},
      state: {},
    },
    plugins: Plugins<HTMLElementTagNameMap[T]> = []
  ) {
    this.element = document.createElement(tagName);
    this.props = props;
    this.plugins = plugins;
    this.mount();
    this.render();
  }

  get ref() {
    return this.element;
  }

  protected bindEvents() {
    for (const event in this.props.events || {}) {
      this.element.addEventListener(
        event as keyof HTMLElementEventMap,
        this.props.events[event] as EventListener
      );
    }
  }

  protected unbindEvents() {
    for (const event in this.props.events || {}) {
      this.element.removeEventListener(
        event as keyof HTMLElementEventMap,
        this.props.events[event] as EventListener
      );
    }
  }

  public mount() {
    this.bindEvents();
    this.plugins.forEach((plugin) => plugin.mount());
  }

  public unmount() {
    this.unbindEvents();
    this.plugins.forEach((plugin) => plugin.unmount());
  }

  public setState(state: Partial<HTMLElementTagNameMap[T]>) {
    for (const prop in state) {
      if (this.element[prop] !== undefined) {
        this.element[prop] = state[prop] as HTMLElementTagNameMap[T][Extract<
          keyof HTMLElementTagNameMap[T],
          string
        >];
      }
    }
  }

  public setEvents(
    events: Record<
      keyof HTMLElementEventMap,
      HTMLElementEventMap[keyof HTMLElementEventMap]
    >
  ) {
    for (const event in events || {}) {
      if (this.element.removeEventListener) {
        this.element.removeEventListener(
          event as keyof HTMLElementEventMap,
          events[event as keyof HTMLElementEventMap] as unknown as EventListener
        );
      }
      this.element.addEventListener(
        event as keyof HTMLElementEventMap,
        events[event as keyof HTMLElementEventMap] as unknown as EventListener
      );
    }
  }

  public setPlugins(plugins: Plugins<HTMLElementTagNameMap[T]>) {
    this.plugins = plugins;
  }

  protected render() {
    if (this.props.state) {
      for (const prop in this.props.state) {
        const value = this.props.state[prop];
        this.element.style.setProperty(prop, String(value));
      }
    }
  }
}
