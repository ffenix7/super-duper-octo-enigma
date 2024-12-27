
const root = document.querySelector(':root')

function toggleTheme(updateSaved) {
	root.classList.toggle('dark')
	
	if (updateSaved) {
		root.classList.add('theme-transition')
		localStorage.setItem('theme', root.classList.contains('dark') ? 'dark' : 'light');
	}
}

let browserTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
const savedTheme = localStorage.getItem('theme');

if (!savedTheme) {
	localStorage.setItem('theme', browserTheme);
} else {
	browserTheme = savedTheme
}

if (browserTheme == 'dark') {
	toggleTheme()
}