import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Registro } from "./auth/registro/registro";
<<<<<<< HEAD

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
=======
import { Nav } from "./componentes/nav/nav";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Nav],
>>>>>>> 26a89ff (Se actualizo el desarrollo con bootstrap y SweetAlert2)
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('app-solicitudes-taller');
}
