import { EspnSpoilerBlocker } from '../EspnSpoilerBlocker';

export class BaseUpdater {
  constructor(private node: Element) {
    this.markElement();
  }

  public static isElementAlreadyBeingWatched(element: Element) {
    return element.classList.contains(EspnSpoilerBlocker.ADDED_CLASS_TO_MARK_AS_WATCHED);
  }

  public update(...arg: any[]) {
    throw new Error('update method not implemented');
  }

  public removeChanges() {
    this.removeChanges();
  }

  public markElement() {
    this.node.classList.add(EspnSpoilerBlocker.ADDED_CLASS_TO_MARK_AS_WATCHED);
  }

  public unmarkElement() {
    this.node.classList.remove(EspnSpoilerBlocker.ADDED_CLASS_TO_MARK_AS_WATCHED);
  }
}
