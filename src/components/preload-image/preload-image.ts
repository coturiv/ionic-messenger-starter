import { Component, Input, ElementRef, Renderer, OnChanges, SimpleChange } from '@angular/core';

import { isPresent } from 'ionic-angular/util/util';

@Component({
		selector: 'preload-image',
		templateUrl: 'preload-image.html'
})
export class PreloadImageComponent implements OnChanges {
		_src: string = '';
		_ratio: { w: number, h: number };
		_img: any;

		constructor(public _elementRef: ElementRef, public _renderer: Renderer) {
				this._img = new Image();
		}

		@Input() alt: string;

		@Input() title: string;

		@Input() set src(val: string) {
				this._src = isPresent(val) ? val : '';
		}

		@Input() set ratio(ratio: { w: number, h: number }){
				this._ratio = ratio || null;
		}

		ngOnChanges(changes: { [propName: string]: SimpleChange }) {
				let ratio_height = (this._ratio.h / this._ratio.w * 100)+"%";
				this._renderer.setElementStyle(this._elementRef.nativeElement, 'padding-bottom', ratio_height);

				this._update();
		}

		_update() {
				if (isPresent(this.alt)) {
						this._img.alt = this.alt;
				}
				if (isPresent(this.title)) {
						this._img.title = this.title;
				}

				this._img.addEventListener('load', () => {
						this._elementRef.nativeElement.appendChild(this._img);
						this._loaded(true);
				});

				this._img.src = this._src;

				this._loaded(false);
		}

		_loaded(isLoaded: boolean) {
				this._elementRef.nativeElement.classList[isLoaded ? 'add' : 'remove']('img-loaded');
		}
}
