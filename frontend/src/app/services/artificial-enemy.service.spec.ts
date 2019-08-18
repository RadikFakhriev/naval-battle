import { TestBed, inject } from '@angular/core/testing';

import { ArtificialEnemyService } from './artificial-enemy.service';

describe('ArtificialEnemyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ArtificialEnemyService]
    });
  });

  it('should be created', inject([ArtificialEnemyService], (service: ArtificialEnemyService) => {
    expect(service).toBeTruthy();
  }));
});
