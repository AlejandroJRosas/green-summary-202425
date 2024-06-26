import { Component, Input } from '@angular/core'
import { DropdownModule } from 'primeng/dropdown'
import { ChipModule } from 'primeng/chip'
import {
  AutoCompleteCompleteEvent,
  AutoCompleteModule,
  AutoCompleteSelectEvent
} from 'primeng/autocomplete'
import { Category } from '../../../../../../../shared/types/category.type'

@Component({
  selector: 'app-category-selector',
  standalone: true,
  imports: [DropdownModule, ChipModule, AutoCompleteModule],
  templateUrl: './category-selector.component.html'
})
export class CategorySelectorComponent {
  @Input() department = {
    id: 0,
    name: ''
  }
  // Todas las aategorias que se le pueden asignar a un departamento
  @Input() categories: Category[] = []
  // Arreglo en donde se le van agregando las categorías que se van seleccionando
  @Input() selectedCategories: Category[] = []
  // Arreglo de categorías filtradas al comienzo tendrá todas
  filteredCategories: Category[] = []
  // Mensaje que se muestra en el dropdown de categorías cuando no se encuentran y cuando ya se seleccionaron todas
  message = 'No se encontraron categorías'

  //Función de primeNG para el componente Autocomplete en función de lo que se escriba te muestra las categorías
  filterCategories(event: AutoCompleteCompleteEvent) {
    const filtered = []
    const query = event.query

    for (let i = 0; i < this.categories.length; i++) {
      const category = this.categories[i]
      if (category.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(category)
      }
    }
    //Si seleccionó una categoría no me la muestres en el dropdown del autocomplete
    this.filteredCategories = filtered.filter(
      (category) => !this.selectedCategories.includes(category)
    )
    //Si ya seleccionó todas las categorías muestra el mensaje
    if (this.selectedCategories.length === this.categories.length) {
      this.message = 'Todas las categorías han sido seleccionadas'
    } else {
      this.message = 'No se encontraron categorías'
    }
  }
  //Función que se ejecuta cuando se selecciona una categoría
  onSelectCategory(event: AutoCompleteSelectEvent) {
    this.selectedCategories.push(event.value)
  }
  //Función que se ejecuta cuando se elimina una categoría
  removeCategory(id: number) {
    const categoryToRemoveIndex = this.selectedCategories.findIndex(
      (sc) => sc.id === id
    )

    this.selectedCategories.splice(categoryToRemoveIndex, 1)
  }
}
