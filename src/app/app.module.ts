//MODULES
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { Ng7DynamicBreadcrumbModule } from "ng7-dynamic-breadcrumb"
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
//COMPONENTS
import { NotFoundComponent } from './components/body/not-found/not-found.component';
import { LandingComponent } from './components/body/landing/landing.component';
import { NavComponent } from './components/nav/nav.component';
import { FooterComponent } from './components/footer/footer.component';
import { CharactersComponent } from './components/body/characters/characters.component';
import { CharacterComponent } from './components/body/characters/character/character.component';
import { ElementsComponent } from './components/body/world/elements/elements.component';
import { BestiaryComponent } from './components/body/world/bestiary/bestiary.component';
import { RacesComponent } from './components/body/world/races/races.component';
import { MapComponent } from './components/body/world/map/map.component';
//PIPES
import { EquilibriumPipe } from './pipes/equilibrium.pipe';
import { PrimordialPipe } from './pipes/primordial.pipe';
import { ArcanePipe } from './pipes/arcane.pipe';
import { NoElementPipe } from './pipes/noelement.pipe';
//SERVICES
import { GetCharactersService } from './services/get-characters.service';
import { GetMapService } from './services/get-map.service';
import { WorldComponent } from './components/body/world/world.component';
import { TeamSimulatorComponent } from './components/body/simulator/team-simulator/team-simulator.component';
import { ItemsComponent } from './components/body/world/items/items.component';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    FooterComponent,
    CharactersComponent,
    MapComponent,
    NotFoundComponent,
    LandingComponent,
    ElementsComponent,
    BestiaryComponent,
    RacesComponent,
    CharacterComponent,
    WorldComponent,
    TeamSimulatorComponent,
    PrimordialPipe,
    ArcanePipe,
    EquilibriumPipe,
    NoElementPipe,
    ItemsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    Ng7DynamicBreadcrumbModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [
    GetCharactersService,
    GetMapService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
