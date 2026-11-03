import { DOCUMENT } from '@angular/common';
import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ViewTransitionInfo } from '@angular/router';

function routeDepth(snapshot: ActivatedRouteSnapshot): number {
  let deepest = snapshot;
  while (deepest.firstChild) {
    deepest = deepest.firstChild;
  }
  return deepest.pathFromRoot.reduce(
    (depth, route) => depth + route.url.length,
    0,
  );
}

export function handleViewTransition({
  transition,
  from,
  to,
}: ViewTransitionInfo): void {
  const root = inject(DOCUMENT).documentElement;
  root.dataset['direccion'] =
    routeDepth(to) >= routeDepth(from) ? 'adelante' : 'atras';
  void transition.finished.then(
    () => delete root.dataset['direccion'],
    () => delete root.dataset['direccion'],
  );
}
