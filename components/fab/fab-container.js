import { Component, ContentChild, ContentChildren } from '@angular/core';
import { Platform } from '../../platform/platform';
import { UIEventManager } from '../../gestures/ui-event-manager';
import { FabButton } from './fab';
import { FabList } from './fab-list';
/**
  * @name FabContainer
  * @module ionic
  *
  * @description
  * `<ion-fab>` is not a FAB button by itself but a container that assist the fab button (`<button ion-fab>`) allowing it
  * to be placed in fixed position that does not scroll with the content. It is also used to implement "material design speed dial",
  * ie. a FAB buttons displays a small lists of related actions when clicked.
  *
  * @property [top] - Places the container on the top of the content
  * @property [bottom] - Places the container on the bottom  of the content
  * @property [left] - Places the container on the left
  * @property [right] - Places the container on the right
  * @property [middle] - Places the container on the middle vertically
  * @property [center] - Places the container on the center horizontally
  * @property [edge] - Used to place the container between the content and the header/footer
  *
  * @usage
  *
  * ```html
  * <!-- this fab is placed at top right -->
  * <ion-content>
  *  <ion-fab top right>
  *    <button ion-fab>Button</button>
  *  </ion-fab>
  *
  *  <!-- this fab is placed at the center of the content viewport -->
  *  <ion-fab center middle>
  *    <button ion-fab>Button</button>
  *  </ion-fab>
  * </ion-content>
  * ```
  *
  * Ionic's FAB also supports "material design's fab speed dial". It is a normal fab button
  * that shows a list of related actions when clicked.
  *
  * The same `ion-fab` container can contain several `ion-fab-list` with different side values:
  * `top`, `bottom`, `left` and `right`. For example, if you want to have a list of button that are
  * on the top of the main button, you should use `side="top"` and so on. By default, if side is ommited, `side="bottom"`.
  *
  * ```html
  * <ion-content>
  *  <!-- this fab is placed at bottom right -->
  *  <ion-fab bottom right >
  *    <button ion-fab>Share</button>
  *    <ion-fab-list side="top">
  *      <button ion-fab>Facebook</button>
  *      <button ion-fab>Twitter</button>
  *      <button ion-fab>Youtube</button>
  *    </ion-fab-list>
  *    <ion-fab-list side="left">
  *      <button ion-fab>Vimeo</button>
  *    </ion-fab-list>
  *  </ion-fab>
  * </ion-content>
  * ```
  *
  * A FAB speed dial can also be closed programatically.
  *
  * ```html
  * <ion-content>
  *  <ion-fab bottom right #fab>
  *    <button ion-fab>Share</button>
  *    <ion-fab-list side="top">
  *      <button ion-fab (click)="share('facebook', fab)">Facebook</button>
  *      <button ion-fab (click)="share('twitter', fab)">Twitter</button>
  *    </ion-fab-list>
  *  </ion-fab>
  * </ion-content>
  * ```
  *
  * ```ts
  * share(socialNet: string, fab: FabContainer) {
  *   fab.close();
  *   console.log("Sharing in", socialNet);
  * }
  * ```
  *
  * @demo /docs/demos/src/fab/
  * @see {@link /docs/components#fabs FAB Component Docs}
 */
var FabContainer = (function () {
    function FabContainer(plt) {
        /**
         * @hidden
         */
        this._listsActive = false;
        this._events = new UIEventManager(plt);
    }
    /**
     * @hidden
     */
    FabContainer.prototype.ngAfterContentInit = function () {
        var mainButton = this._mainButton;
        if (!mainButton || !mainButton.getNativeElement()) {
            console.error('FAB container needs a main <button ion-fab>');
            return;
        }
        this._events.listen(mainButton.getNativeElement(), 'click', this.clickHandler.bind(this), { zone: true });
    };
    /**
     * @hidden
     */
    FabContainer.prototype.clickHandler = function (ev) {
        if (this.canActivateList(ev)) {
            this.toggleList();
        }
    };
    /**
     * @hidden
     */
    FabContainer.prototype.canActivateList = function (ev) {
        if (this._fabLists.length > 0 && this._mainButton && ev.target) {
            var ele = ev.target.closest('ion-fab>[ion-fab]');
            return (ele && ele === this._mainButton.getNativeElement());
        }
        return false;
    };
    /**
     * @hidden
     */
    FabContainer.prototype.toggleList = function () {
        this.setActiveLists(!this._listsActive);
    };
    /**
     * @hidden
     */
    FabContainer.prototype.setActiveLists = function (isActive) {
        if (isActive === this._listsActive) {
            return;
        }
        var lists = this._fabLists.toArray();
        for (var _i = 0, lists_1 = lists; _i < lists_1.length; _i++) {
            var list = lists_1[_i];
            list.setVisible(isActive);
        }
        this._mainButton.setActiveClose(isActive);
        this._listsActive = isActive;
    };
    /**
     * Close an active FAB list container
     */
    FabContainer.prototype.close = function () {
        this.setActiveLists(false);
    };
    /**
     * @hidden
     */
    FabContainer.prototype.ngOnDestroy = function () {
        this._events.destroy();
    };
    FabContainer.decorators = [
        { type: Component, args: [{
                    selector: 'ion-fab',
                    template: '<ng-content></ng-content>'
                },] },
    ];
    /** @nocollapse */
    FabContainer.ctorParameters = function () { return [
        { type: Platform, },
    ]; };
    FabContainer.propDecorators = {
        '_mainButton': [{ type: ContentChild, args: [FabButton,] },],
        '_fabLists': [{ type: ContentChildren, args: [FabList,] },],
    };
    return FabContainer;
}());
export { FabContainer };
//# sourceMappingURL=fab-container.js.map