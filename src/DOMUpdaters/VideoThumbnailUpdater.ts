import { BaseUpdater } from './BaseUpdater';

export class VideoThumbnailUpdater extends BaseUpdater {
  constructor(private container: Element) {
    super(container);
  }

  update() {
    // console.log('UPDATING VIDEO:', {
    //   originalTitle: this.container.querySelector('#video-title')?.textContent?.trim(),
    //   originalChannel: this.container.querySelector('#channel-name')?.textContent?.trim(),
    // });

    try {
      this.container.querySelector('#video-title').innerHTML = 'XXXXXXX';
      this.container.querySelector('#channel-name').innerHTML = 'XXXXXXXx';
    } catch (error) {}
  }

  removeChanges() {
    super.removeChanges();
  }
}


