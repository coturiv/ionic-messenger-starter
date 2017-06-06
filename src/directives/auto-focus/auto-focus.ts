import { Directive } from '@angular/core';

/**
 * Generated class for the AutoFocusDirective directive.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/DirectiveMetadata-class.html
 * for more info on Angular Directives.
 */
@Directive({
  selector: '[auto-focus]' // Attribute selector
})
export class AutoFocusDirective {

  constructor() {
    console.log('Hello AutoFocusDirective Directive');
  }

}
