import { ComponentFixture, TestBed } from '@angular/core/testing';
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
    fixture.detectChanges(); // Initialiser le changement de détection
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have initial count of 0', () => {
    const compiled = fixture.nativeElement;
    const countElement = compiled.querySelector('h1');
    expect(countElement.textContent).toContain('0');
  });

  it('should increment the count', () => {
    const compiled = fixture.nativeElement;
    const incrementButton = compiled.querySelector('button:last-child'); // Le bouton "+"

    incrementButton.click(); // Simuler un clic
    fixture.detectChanges(); // Déclencher le changement de détection

    const countElement = compiled.querySelector('h1');
    expect(countElement.textContent).toContain('1'); // Vérifier que le compteur est incrémenté
  });

  it('should decrement the count', () => {
    component.count = 5; // Préconfigurer le compteur à 5
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    const decrementButton = compiled.querySelector('button:first-child'); // Le bouton "-"

    decrementButton.click(); // Simuler un clic
    fixture.detectChanges(); // Déclencher le changement de détection

    const countElement = compiled.querySelector('h1');
    expect(countElement.textContent).toContain('4'); // Vérifier que le compteur est décrémenté
  });

  it('should disable the decrement button if count is 0', () => {
    component.count = 0; // Préconfigurer le compteur à 0
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    const decrementButton = compiled.querySelector('button:first-child');

    decrementButton.click(); // Simuler un clic
    fixture.detectChanges(); // Déclencher le changement de détection

    expect(component.count).toBe(0); // Vérifier que le compteur reste à 0
  });
});
