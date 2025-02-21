import type { BaseUpdater } from './BaseUpdater';

export class VideoThumbnailUpdater implements BaseUpdater {
  constructor(private containerElement: Element) {}

  update() {
    console.log('UPDATING VIDEO:', {
      originalTitle: this.containerElement.querySelector('#video-title')?.textContent?.trim(),
      originalChannel: this.containerElement.querySelector('#channel-name')?.textContent?.trim(),
    });

    this.containerElement.querySelector('#video-title').innerHTML = 'XXXXXXX';
    this.containerElement.querySelector('#channel-name').innerHTML = 'XXXXXXXx';
  }

  removeChanges() {}
}
