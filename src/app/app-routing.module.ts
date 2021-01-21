import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { from } from 'rxjs';
//NAV
import { LandingComponent } from './components/body/landing/landing.component';
import { NotFoundComponent } from './components/body/not-found/not-found.component';
import { CharactersComponent } from './components/body/characters/characters.component';
import { CharacterComponent } from './components/body/characters/character/character.component';
import { TeamSimulatorComponent } from './components/body/simulator/team-simulator/team-simulator.component';
//WORLD
import { WorldComponent } from './components/body/world/world.component';
import { MapComponent } from './components/body/world/map/map.component';
import { BestiaryComponent } from './components/body/world/bestiary/bestiary.component';
import { ElementsComponent } from './components/body/world/elements/elements.component';
import { RacesComponent } from './components/body/world/races/races.component';
import { ItemsComponent } from './components/body/world/items/items.component';



const routes: Routes = [
  // Inicio
  {
    path: 'landing', component: LandingComponent, data: {
      title: 'Inicio',
      breadcrumb: [
        {
          label: 'Inicio',
          url: ''
        }
      ]
    }
  },
  // Inicio/ Personajes
  {
    path: 'characters', component: CharactersComponent, data: {
      title: 'Personajes',
      breadcrumb: [
        {
          label: 'Inicio',
          url: 'landing'
        },
        {
          label: 'Personajes',
          url: ''
        }
      ]
    }
  },
  // Inicio/ Personajes/ Personaje concreto
  {
    path: 'character/:id/:name', component: CharacterComponent, data: {
      title: 'World',
      breadcrumb: [
        {
          label: 'Inicio',
          url: 'landing'
        },
        {
          label: 'Personajes',
          url: 'characters'
        },
        {
          label: '{{name}}',
          url: ''
        }
      ]
    }
  },
  // Inicio/ Mundo
  {
    path: 'world', component: WorldComponent, data: {
      title: 'Mundo',
      breadcrumb: [
        {
          label: 'Inicio',
          url: 'landing'
        },
        {
          label: 'Mundo',
          url: ''
        }
      ]
    }
  },
  // Inicio/ Mundo/ Mapa
  {
    path: 'map', component: MapComponent, data: {
      title: 'Mapa',
      breadcrumb: [
        {
          label: 'Inicio',
          url: 'landing'
        },
        {
          label: 'Mundo',
          url: 'world'
        },
        {
          label: 'Mapa',
          url: ''
        },

      ]
    }
  },
  // Inicio/ Mundo/ Bestiario
  {
    path: 'bestiary', component: BestiaryComponent, data: {
      title: 'Bestiario',
      breadcrumb: [
        {
          label: 'Inicio',
          url: 'landing'
        },
        {
          label: 'Mundo',
          url: 'world'
        },
        {
          label: 'Bestiario',
          url: ''
        },

      ]
    }
  },
  // Inicio/ Mundo/ Razas
  {
    path: 'races', component: RacesComponent, data: {
      title: 'Razas',
      breadcrumb: [
        {
          label: 'Inicio',
          url: 'landing'
        },
        {
          label: 'Mundo',
          url: 'world'
        },
        {
          label: 'Razas',
          url: ''
        },

      ]
    }
  },
  // Inicio/ Mundo/ Elementos
  {
    path: 'elements', component: ElementsComponent, data: {
      title: 'Elementos',
      breadcrumb: [
        {
          label: 'Inicio',
          url: 'landing'
        },
        {
          label: 'Mundo',
          url: 'world'
        },
        {
          label: 'Elementos',
          url: ''
        },

      ]
    }
  },
  // Inicio/ Mundo/ Objetos
  {
    path: 'items', component: ItemsComponent, data: {
      title: 'Objetos',
      breadcrumb: [
        {
          label: 'Inicio',
          url: 'landing'
        },
        {
          label: 'Mundo',
          url: 'world'
        },
        {
          label: 'Objetos',
          url: ''
        },

      ]
    }
  },
  // Inicio/ Simulador de Equipo
  {
    path: 'team', component: TeamSimulatorComponent, data: {
      title: 'Simulador de Equipo',
      breadcrumb: [
        {
          label: 'Inicio',
          url: 'landing'
        },
        {
          label: 'Simulador de Equipo',
          url: ''
        }
      ]
    }
  },
  // DEFAULT PAGE
  { path: '', redirectTo: '/landing', pathMatch: 'full' },
  // NOT FOUND PAGE
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
