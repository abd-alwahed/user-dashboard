import { NgModule } from "@angular/core";
import { LoadingComponent } from "./components/loading/loading.component";


@NgModule({
    declarations: [
        LoadingComponent
    ],
    exports: [
        LoadingComponent
    ]
})
export class SharedModule {
}
