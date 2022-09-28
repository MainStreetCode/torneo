import { Component, Input, OnInit } from '@angular/core';
import { Table } from './table';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  @Input() table: Table;
  teamScore: number;

  constructor() { }

  ngOnInit(): void {

  }

}
