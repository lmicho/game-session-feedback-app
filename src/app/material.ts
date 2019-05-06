import { NgModule } from '@angular/core';

// Material Imports
import {
    MatSelectModule, MatFormFieldModule, MatInputModule, MatButtonModule
} from '@angular/material'

@NgModule({
    imports: [
        MatSelectModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule
    ],
    exports: [
        MatSelectModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule
    ]
})
export class MaterialModule { }
