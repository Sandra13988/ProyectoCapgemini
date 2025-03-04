import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GameService } from '../game.service';
import { Game } from '../model/Game';
import { AuthorService } from '../../author/author.service';
import { Author } from '../../author/model/Author';
import { CategoryService } from '../../category/category.service';
import { Category } from '../../category/model/Category';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
    selector: 'app-game-edit',
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule ],
    templateUrl: './game-edit.component.html',
    styleUrl: './game-edit.component.scss',
})
export class GameEditComponent implements OnInit {
    game: Game;
    authors: Author[];
    categories: Category[];

    constructor(
        public dialogRef: MatDialogRef<GameEditComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private gameService: GameService,
        private categoryService: CategoryService,
        private authorService: AuthorService
    ) {}

    ngOnInit(): void {
        this.game = this.data.game ? Object.assign({}, this.data.game) : new Game();

        this.categoryService.getCategories().subscribe((categories) => {
            this.categories = categories;

            if (this.game.category != null) {
                const categoryFilter: Category[] = categories.filter(
                    (category) => category.id == this.data.game.category.id
                );
                if (categoryFilter != null) {
                    this.game.category = categoryFilter[0];
                }
            }
        });

        this.authorService.getAllAuthors().subscribe((authors) => {
            
            this.authors = authors; // Guarda TODOS los autores en la lista del dropdown

    if (this.game.author) { 
        // Si el juego ya tiene un autor asignado, lo busca en la lista
        this.game.author = authors.find(auth => auth.id === this.data.game.author?.id) || null;
    }
        });          
        
    }

    onSave() {
        this.gameService.saveGame(this.game).subscribe((result) => {
            this.dialogRef.close();
        });
    }

    onClose() {
        this.dialogRef.close();
    }
}