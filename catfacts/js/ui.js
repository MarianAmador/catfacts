export function showLoading() {
  document.getElementById('status').textContent = 'Loading...';
  document.getElementById('fact').textContent = '';
}

export function showFact(text) {
  const statusElement = document.getElementById('status');
  const factElement = document.getElementById('fact');

  statusElement.textContent = '';
  factElement.textContent = '';

  const safeText = document.createTextNode(text ?? '');
  factElement.appendChild(safeText);
}

export function showError(message) {
  document.getElementById('status').textContent = message;
}