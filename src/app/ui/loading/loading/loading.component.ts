import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingService } from '../loading.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ayn-loading',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit, OnDestroy {

  constructor(
    private readonly loadingService: LoadingService
  ) { }

  isLoadingActive: boolean = false;

  private loadingSub?: Subscription;

  ngOnInit(): void {
    this.loadingSub = this.loadingService.loadingActive$.subscribe((isLoadingActive: boolean) => { 
      this.isLoadingActive = isLoadingActive;
    });
  }

  ngOnDestroy(): void {
    if (!!this.loadingSub) { 
      this.loadingSub.unsubscribe();
    }
  }

}
