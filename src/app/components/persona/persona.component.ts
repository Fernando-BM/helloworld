import { Component, OnInit, ɵɵstylePropInterpolate1 } from '@angular/core';

import { Persona } from '../../_models/persona';
import { PersonaService } from '../../_services/persona.service';

import { FormBuilder, Validators, FormGroup } from '@angular/forms';

declare var $: any;

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})
export class PersonaComponent implements OnInit {

  personas: Persona[] | any;
  persona: Persona | any;
  personaForm: FormGroup;
  submitted = false;

  constructor(private personaService: PersonaService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    // Inicie el formulario vacio
    this.personaForm = this.formBuilder.group({
      id: [''],
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      fecha_nacimiento: ['', Validators.required],
      domicilio: ['', Validators.required],
      rfc: ['', Validators.required]
    });

    // Consulte lista personas
    this.getPersonas();
  }

  // Consultar lista de personas
  getPersonas(){
    this.personas = [];
    this.personas = [ new Persona("1","Fernando","Bernal Martìnez","1997-08-10","Valle de Chalco","BEFEMA12345"),
                      new Persona("2","Brenda","Bedolla Villasenor","1997-09710","CDMX","BEBVMA12345")];
    
    /*this.personaService.getPersonas().subscribe(
      res => {
        this.personas = res;
        console.log(this.personas)      },
      err => console.error(err)
    )*/
  }

  // Consultar una persona
  getPersona(id){
    this.persona = null;
    this.personaService.getPersona(id).subscribe(
      res => {
        this.persona = res;
      },
      err => console.error(err)
    )
  }

  // Eliminar una persona
  deletePersona(id){
    this.personaService.deletePersona(id).subscribe(
      res => {
        this.getPersonas();
      },
      err => console.error(err)
    )
  }

  // Crear una persona
  createPersona(){
    this.submitted = true;

    if(this.personaForm.invalid){
      console.log('Formulario inválido');
      return;
    }

    this.personaService.createPersona(this.personaForm.value).subscribe(
      res => {
        $("#personaModal").modal("hide");
        this.getPersonas();
      },
      err => console.error(err)
    )
  }

  // Actualizar una persona
  updatePersona(){
    
    this.submitted = true;

    if(this.personaForm.invalid){
      console.log('Formulario inválido');
      return;
    }
    console.log("Invocando al UPDATE, nueva Data")
    console.log(this.personaForm.value)

    this.personaService.updatePersona(this.personaForm.value).subscribe(
      res => {
        this.getPersonas();
      },
      err => console.error(err)
    )
  }

  get f() { return this.personaForm.controls;}

  openModalPersona(){
    this.personaForm.reset();
    $("#personaModal").modal("show");
  }

  openEditaModalPersona(persona:Persona){
    this.personaForm = this.formBuilder.group({
      id: [persona.id],
      nombre: [persona.nombre, Validators.required],
      apellidos: [persona.apellidos, Validators.required],
      fecha_nacimiento: [persona.fecha_nacimiento, Validators.required],
      domicilio: [persona.domicilio, Validators.required],
      rfc: [persona.rfc, Validators.required]
    });
    $("#personaEditaModal").modal("show");
  }
}
