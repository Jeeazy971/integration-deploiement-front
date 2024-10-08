import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CounterComponent } from './counter.component';

describe('CounterComponent', () => {
  let component: CounterComponent;
  let fixture: ComponentFixture<CounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CounterComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have an initial count of 0', () => {
    const countElement = fixture.debugElement.query(By.css('h1')).nativeElement;
    expect(countElement.textContent).toContain('0');
  });

  it('should increment the count when the increment button is clicked', async () => {
    const incrementButton = fixture.debugElement.queryAll(By.css('button'))[1]
      .nativeElement; // Sélectionner le deuxième bouton
    expect(incrementButton).not.toBeNull(); // Vérifier que le bouton existe
    incrementButton.click(); // Simuler un clic
    fixture.detectChanges(); // Déclencher la détection des changements
    await fixture.whenStable(); // Attendre que tout soit stable
    expect(component.count).toBe(1); // Vérifier que la valeur a bien été incrémentée
  });

  it('should decrement the count when the decrement button is clicked', async () => {
    component.count = 1; // S'assurer que le compteur n'est pas 0 pour décrémenter
    fixture.detectChanges(); // Déclencher la détection des changements
    const decrementButton = fixture.debugElement.queryAll(By.css('button'))[0]
      .nativeElement; // Sélectionner le premier bouton
    expect(decrementButton).not.toBeNull(); // Vérifier que le bouton existe
    decrementButton.click(); // Simuler un clic
    fixture.detectChanges(); // Déclencher la détection des changements
    await fixture.whenStable(); // Attendre que tout soit stable
    expect(component.count).toBe(0); // Vérifier que la valeur a bien été décrémentée
  });

  it('should disable the decrement button when the count is 0', async () => {
    component.count = 0; // Préconfigurer le compteur à 0
    fixture.detectChanges(); // Déclencher la détection des changements
    await fixture.whenStable(); // Attendre que tout soit stable
    const decrementButton = fixture.debugElement.queryAll(By.css('button'))[0]
      .nativeElement; // Sélectionner le premier bouton
    expect(decrementButton).not.toBeNull(); // Vérifier que le bouton existe
    expect(decrementButton.disabled).toBeTrue(); // Vérifier que le bouton est désactivé
  });
});
