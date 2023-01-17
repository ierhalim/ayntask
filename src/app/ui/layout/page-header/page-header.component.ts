import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ayn-page-header',
  template: `
  <div class="page-header">
    <div class="main-header">
        <ng-content select="[header]"></ng-content>
    </div>
    <div class="sub-header">
        <ng-content select="[subHeader]"></ng-content>
    </div>
  </div>
    `,
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent {
}
