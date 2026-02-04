export function showLoading() {
  document.getElementById('status').textContent = 'Loading...';
  document.getElementById('fact').textContent = '';
}

export function showFact(text) {
  document.getElementById('status').textContent = '';
  document.getElementById('fact').textContent = text;
}

export function showError(message) {
  document.getElementById('status').textContent = message;
}
