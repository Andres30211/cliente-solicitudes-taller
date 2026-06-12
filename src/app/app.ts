import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Registro } from "./auth/registro/registro";
import { Nav } from './componentes/nav/nav';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Nav],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('app-solicitudes-taller');
}
