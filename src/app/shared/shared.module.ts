import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterModule } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
@NgModule({
  declarations: [],
  imports: [
    CommonModule, RouterModule, RouterOutlet,
  ],
  exports: [RouterModule, RouterOutlet, CommonModule ]
})
export class SharedModule  { }
