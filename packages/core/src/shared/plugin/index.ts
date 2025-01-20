export default class Plugin<T extends HTMLElement> {
  constructor(protected element: T) {}

  public mount() {}

  public unmount() {}
}
