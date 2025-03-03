import { EspnSpoilerBlocker } from '../EspnSpoilerBlocker';

export class BaseUpdater {
  protected elementToEdit: Element;

  private originalStyles = {};

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

  public duplicateElement() {
    // duplicate the element and edit this one
    this.elementToEdit = this.node.cloneNode(true) as Element;
    this.node.insertAdjacentElement('afterend', this.elementToEdit);
    this.elementToEdit.classList.add(EspnSpoilerBlocker.ADDED_CLASS_TO_MARK_AS_ADDED);

    // hide original element
    const style = (this.node as HTMLDivElement).style;
    style.display = 'none';
  }

  public markElement() {
    this.node.classList.add(EspnSpoilerBlocker.ADDED_CLASS_TO_MARK_AS_WATCHED);

    const style = (this.node as HTMLDivElement).style;

    this.originalStyles = { display: style.display };
  }

  public unmarkElement() {
    this.node.classList.remove(EspnSpoilerBlocker.ADDED_CLASS_TO_MARK_AS_WATCHED);

    const style = (this.node as HTMLDivElement).style;
    Object.entries(this.originalStyles).forEach(([key, value]) => {
      style[key] = value;
    });
  }
}
