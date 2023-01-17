import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({providedIn:'root'})
export class LoadingService { 

    loadingActive$ = new BehaviorSubject<boolean>(false);

    private currentLoadingCount = 0;

    start() { 
        this.currentLoadingCount++;
        this.emitLoadingStatus();
    }

    stop() { 
        this.currentLoadingCount--;
        if (this.currentLoadingCount < 0) { 
            this.currentLoadingCount = 0;
        }
        this.emitLoadingStatus();
    }

    emitLoadingStatus() { 
        this.loadingActive$.next(this.currentLoadingCount > 0);
    }
}