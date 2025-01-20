export type TypedEventListener<
  T extends HTMLElement,
  K extends keyof HTMLElementEventMap
> = (this: T, event: HTMLElementEventMap[K]) => void;

export type CoreProps<
  T extends keyof HTMLElementTagNameMap,
  K extends keyof HTMLElementEventMap,
  S extends HTMLElementTagNameMap[T] = HTMLElementTagNameMap[T],
  E extends Record<K, TypedEventListener<HTMLElementTagNameMap[T], K>> = Record<
    K,
    TypedEventListener<HTMLElementTagNameMap[T], K>
  >
> = {
  state: Partial<S>;
  events: Partial<E>;
};
