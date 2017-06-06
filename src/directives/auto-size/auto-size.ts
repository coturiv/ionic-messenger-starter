import { ElementRef, HostListener, Directive, AfterViewInit, Optional, OnInit, OnDestroy, NgZone } from '@angular/core';
import { NgModel } from '@angular/forms';
import { Observable, Subscription } from 'rxjs/Rx';


@Directive({
  selector: '[auto-size]' // Attribute selector
})
export class AutoSizeDirective implements OnInit, OnDestroy, AfterViewInit {
  private subscription: Subscription;
  private textareaEl: HTMLTextAreaElement;

  constructor(private el: ElementRef, private ngZone: NgZone, @Optional() private model: NgModel) {}

  ngOnInit() {
    if (!this.model)
      return;

    this.subscription = this.model.valueChanges.debounceTime(100).subscribe(() => this.adjust());
  }

  ngAfterViewInit() {
    if (this.isTextarea(this.el.nativeElement)) {
      this.setupTextarea(this.el.nativeElement);
      return;
    }

    const children: HTMLElement[] = Array.from(this.el.nativeElement.children) as HTMLElement[];
    const textareaEl = children.find(el => this.isTextarea(el));
    if (textareaEl) {
      this.setupTextarea(textareaEl as HTMLTextAreaElement);
      return;
    }

    throw new Error('The `fz-elastic` attribute directive must be used on a `textarea` or an element that contains a `textarea`.');
  }

  ngOnDestroy() {
    if (this.subscription)
      this.subscription.unsubscribe();
  }

  @HostListener('input')
  onInput(): void {
    // This is run whenever the user changes the input.
    this.adjust();
  }

  private isTextarea(el: HTMLElement) {
    return el.tagName === 'TEXTAREA';
  }

  private setupTextarea(textareaEl: HTMLTextAreaElement) {
    this.textareaEl = textareaEl;

    // Set some necessary styles
    const style = this.textareaEl.style;
    style.overflow = 'hidden';
    style.resize = 'none';

    // Listen for window resize events
    this.ngZone.runOutsideAngular(() => {
      Observable.fromEvent(window, 'resize')
        .debounceTime(100)
        .subscribe(() => this.adjust());
    });

    // Ensure we adjust the textarea if
    // content is already present
    this.adjust();
  }

  private adjust(): void {
    if (!this.textareaEl)
      return;

    this.textareaEl.style.height = 'auto';
    this.textareaEl.style.height = this.textareaEl.scrollHeight + 'px';
  }

}
