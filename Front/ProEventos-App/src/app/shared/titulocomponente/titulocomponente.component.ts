import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-titulocomponente',
  templateUrl: './titulocomponente.component.html',
  styleUrls: ['./titulocomponente.component.scss']
})
export class TitulocomponenteComponent implements OnInit {

  @Input() titulo = '';

  constructor() { }

  ngOnInit() {
  }

}
