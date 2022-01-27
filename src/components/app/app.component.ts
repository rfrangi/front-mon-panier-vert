import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: `./app.component.html`,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor() {
    this.addScrollEvent();
  }

  private addScrollEvent(): any{
    const debounce = (fn: any) => {
      let frame: number;
      return (...params: any) => {
        if (frame) {
          cancelAnimationFrame(frame);
        }
        frame = requestAnimationFrame(() => {
          fn(...params);
        });

      };
    };
    const storeScroll = () => {
      document.documentElement.dataset['scroll'] = String(window.scrollY);
    };
    document.addEventListener('scroll', debounce(storeScroll), { passive: true });
    storeScroll();
  }
}
