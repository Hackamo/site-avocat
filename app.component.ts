import { ChangeDetectionStrategy, Component } from '@angular/core'
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatButtonModule } from '@angular/material/button'

@Component({
	selector: 'app-root',
	imports: [RouterOutlet, RouterLink, RouterLinkActive, MatToolbarModule, MatButtonModule],
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './src/app/app.html',
	styleUrl: './src/app/app.scss',
})
export class AppComponent {}
