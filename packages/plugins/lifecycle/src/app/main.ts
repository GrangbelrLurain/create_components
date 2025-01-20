import Plugin from "@whole-ui/core/src/shared/plugin";

type LifeCycleState = "mount" | "unmount" | string;

interface LifeCycle {
  properties: Record<string, string>;
  duration: number;
  onStart?: () => void;
  onFinish?: () => void;
  onCancel?: () => void;
}

type LifeCycleName<T extends string> = T | ((prev: T | null) => T);

export default class LifeCyclePlugin<
  E extends HTMLElement,
  T extends LifeCycleState = LifeCycleState
> extends Plugin<E> {
  private state: T | null = null;
  private current: T | null = null;

  constructor(element: E, private lifeCycles: Partial<Record<T, LifeCycle>>) {
    super(element);
  }

  public static of<E extends HTMLElement, T extends LifeCycleState>(
    element: E,
    lifeCycles: Partial<Record<T, LifeCycle>>
  ) {
    return new LifeCyclePlugin<E, T>(element, lifeCycles);
  }

  public override(lifeCycles: Partial<Record<T, LifeCycle>>) {
    this.lifeCycles = { ...this.lifeCycles, ...lifeCycles };
  }

  private static setup = (
    element: HTMLElement,
    setupTarget: {
      onStart?: LifeCycle["onStart"];
      onFinish?: LifeCycle["onFinish"];
      onCancel?: LifeCycle["onCancel"];
    }
  ) => {
    if (setupTarget.onStart) {
      element.addEventListener("transitionstart", setupTarget.onStart);
    }
    if (setupTarget.onFinish) {
      element.addEventListener("transitionend", setupTarget.onFinish);
    }
    if (setupTarget.onCancel) {
      element.addEventListener("transitioncancel", setupTarget.onCancel);
    }
  };

  private static cleanUp = (
    element: HTMLElement,
    clearTarget: {
      onStart?: LifeCycle["onStart"];
      onFinish?: LifeCycle["onFinish"];
      onCancel?: LifeCycle["onCancel"];
    }
  ) => {
    if (clearTarget.onStart) {
      element.removeEventListener("transitionstart", clearTarget.onStart);
    }
    if (clearTarget.onFinish) {
      element.removeEventListener("transitionend", clearTarget.onFinish);
    }
    if (clearTarget.onCancel) {
      element.removeEventListener("transitioncancel", clearTarget.onCancel);
    }
  };

  private static getName = <T extends LifeCycleState>(
    nameOrFn: LifeCycleName<T>,
    current: T | null
  ): T | null => {
    return typeof nameOrFn === "function" ? nameOrFn(current as T) : nameOrFn;
  };

  private static setStyles = (
    element: HTMLElement,
    properties: Record<string, string | number>
  ) => {
    requestAnimationFrame(() => {
      for (const prop in properties) {
        const value = properties[prop];
        if (!(prop in element.style)) {
          continue;
        }

        element.style.setProperty(prop, String(value));
      }
    });
  };

  private static setDuration = (element: HTMLElement, duration: number) => {
    element.style.transition = `all ${duration}ms`;
  };

  public transition(nameOrFn: LifeCycleName<T>) {
    const element = this.element;

    if (!element) return;

    const lifeCycleName = LifeCyclePlugin.getName(nameOrFn, this.state);

    if (!lifeCycleName || !this.lifeCycles[lifeCycleName]) return;

    const { properties, duration } = this.lifeCycles[lifeCycleName];

    const currentSetup = this.lifeCycles[this.current as T];

    if (this.current && currentSetup) {
      element.dispatchEvent(new Event("transitioncancel"));
      LifeCyclePlugin.cleanUp(element, currentSetup);
    }

    const nextSetup = this.lifeCycles[lifeCycleName];
    if (nextSetup) {
      LifeCyclePlugin.setup(element, nextSetup);
    }
    LifeCyclePlugin.setDuration(element, duration);
    LifeCyclePlugin.setStyles(element, properties);

    this.state = lifeCycleName;
  }
}
