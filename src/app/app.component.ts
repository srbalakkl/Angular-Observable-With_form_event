import {Component} from '@angular/core';
import {Observable} from "rxjs";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'ObsrevableWithFormEvent';

    constructor() {
        /*this.fromEvent(document.body, "click").subscribe({
            next() {
                console.log('Body is Clicked')
            }
        })*/

        this.fromEvent(document.body, "click").subscribe(x => {
            console.log('body clicked')
        })
    }


    fromEvent<T extends keyof HTMLElementEventMap>(target: HTMLElement, eventName: T) {
        return new Observable<HTMLElementEventMap[T]>((observer) => {
            const handler = (e: HTMLElementEventMap[T]) => observer.next(e);

            // Add the event handler to the target
            target.addEventListener(eventName, handler);

            return () => {
                // Detach the event handler from the target
                //todo: If we don't use below command then there will be a memory leakage
                target.removeEventListener(eventName, handler);
            };
        });
    }

    unsubscribeMtd() {
        // this.bodyClick$ = null;
    }
}
