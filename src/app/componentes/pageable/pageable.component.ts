import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pageable',
  templateUrl: './pageable.component.html',
  styleUrls: ['./pageable.component.css']
})
export class PageableComponent implements OnInit {


  @Input() currentPage!: number;
  @Input() totalPages!: number;
  @Output() changePageEmmiter: EventEmitter<Number> = new EventEmitter();
  pageNumbers!: number[];

  ngOnInit(): void {
    this.loadPageNumbers();
  }

  onPreviousPage() {
    this.changePageEmmiter.emit(this.currentPage - 1);
  }

  onNextPage() {
    this.changePageEmmiter.emit(this.currentPage + 1);
  }

  onSelectPage(pageNumber: Number) {
    this.changePageEmmiter.emit(pageNumber);
  }

  loadPageNumbers() {
    this.pageNumbers = new Array();
    for (let i = 0; i < this.totalPages; i++) {
      this.pageNumbers.push(i);
    }
  }

}
