import { is } from './is';

export function printElement(elementId: string, callback?: Function) {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error(`Element with id "${elementId}" not found`);
    return;
  }

  let ElementToPrint = document.getElementById('fat-element-to-print');

  if (!ElementToPrint) {
    ElementToPrint = document.createElement('div');
    ElementToPrint.id = 'fat-element-to-print';
    document.body.appendChild(ElementToPrint);
  }

  ElementToPrint.textContent = '';
  ElementToPrint.appendChild(element.cloneNode(true));
  window.print();

  if (is.function(callback)) {
    setTimeout(callback, 500);
  }

  document.body.removeChild(ElementToPrint);
}
