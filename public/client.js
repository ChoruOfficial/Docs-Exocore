document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const contentWrapper = document.getElementById('content-wrapper');
    const contentContainer = document.getElementById('content');
    const navLinksContainer = document.getElementById('nav-links');
    const searchInput = document.getElementById('search-input');
    const searchResultsContainer = document.getElementById('search-results');
    const searchModal = document.getElementById('search-modal');
    const searchButton = document.getElementById('search-button');
    const searchModalBackdrop = document.getElementById('search-modal-backdrop');
    const sidebar = document.getElementById('sidebar');
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const sidebarCloseButton = document.getElementById('sidebar-close-button');
    let searchTimeout;

    // --- SVG Icons ---
    const categoryIcons = {
        'Getting Started': `<svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M13.494 11.516c.124.08.25.158.372.239.124.08.245.16.363.242.12.083.235.168.348.255.114.087.223.176.33.268.106.09.208.184.306.28.1.096.192.196.282.298.088.102.17.208.248.316.078.108.15.22.215.335.065.116.123.235.176.357.052.122.098.248.138.375.04.128.073.26.1.394.026.134.045.27.058.408.012.138.018.278.018.42v.328a.75.75 0 01-1.5 0v-.328c0-.11-.005-.218-.014-.324a2.934 2.934 0 00-.188-1.018 3.033 3.033 0 00-1.4-1.62c-.155-.09-.314-.176-.477-.258l-.02-.01a9.002 9.002 0 01-4.43-3.633c-.398-.67-.73-1.423-.986-2.247a.75.75 0 011.45-.386c.242.77.55 1.474.924 2.102a7.502 7.502 0 003.81 3.25zM4.646 4.646a.75.75 0 011.06 0l1.018 1.018a.75.75 0 01-1.06 1.06L4.646 5.707a.75.75 0 010-1.06zm13.688 1.018a.75.75 0 011.06-1.06l1.018 1.018a.75.75 0 01-1.06 1.06l-1.018-1.018zM4.5 12.75a.75.75 0 000 1.5h1.25a.75.75 0 000-1.5H4.5zm15 0a.75.75 0 000 1.5h1.25a.75.75 0 000-1.5H19.5zM7.5 18a.75.75 0 01.146-1.018l1.018-1.018a.75.75 0 011.06 1.06l-1.018 1.018A.75.75 0 017.5 18zm8.854-.872a.75.75 0 011.06-1.06l1.018 1.018a.75.75 0 11-1.06 1.06l-1.018-1.018z"></path></svg>`,
        'API Reference': `<svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path fill-rule="evenodd" d="M8.25 5.25a3 3 0 013-3h1.5a3 3 0 013 3v.5a.75.75 0 01-1.5 0V5.25a1.5 1.5 0 00-1.5-1.5h-1.5a1.5 1.5 0 00-1.5 1.5v13.5a1.5 1.5 0 001.5 1.5h1.5a1.5 1.5 0 001.5-1.5v-.5a.75.75 0 011.5 0v.5a3 3 0 01-3 3h-1.5a3 3 0 01-3-3V5.25z" clip-rule="evenodd"></path><path d="M15.75 9a.75.75 0 01.75-.75h1.5a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-.75h-.75a.75.75 0 01-.75-.75z" clip-rule="evenodd"></path><path d="M5.25 9a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5H6.75v.75a.75.75 0 01-1.5 0V9z"></path><path d="M6 12.75a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0v-1.5z"></path><path d="M15.75 12a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5h-1.5a.75.75 0 01-.75-.75z"></path><path d="M18.75 15a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5h-1.5a.75.75 0 01-.75-.75z"></path><path d="M5.25 15a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5H6a.75.75 0 01-.75-.75z"></path></svg>`,
        'default': `<svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path fill-rule="evenodd" d="M4.125 3C3.089 3 2.25 3.84 2.25 4.875V18a3 3 0 003 3h15a3 3 0 003-3V8.625a3 3 0 00-3-3H9.375a3 3 0 00-3-3H4.125zm0 1.5h2.25a1.5 1.5 0 011.5 1.5H6.375a3 3 0 00-3 3V18a1.5 1.5 0 01-1.5-1.5V4.875C3.375 3.839 3.375 3 4.125 3z" clip-rule="evenodd"></path></svg>`
    };
    const copyIconSVG = `<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" class="w-4 h-4"><path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/><path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zM-1 7a.5.5 0 0 1 .5-.5h15a.5.5 0 0 1 0 1H-.5A.5.5 0 0 1-1 7z"/></svg>`;
    const checkIconSVG = `<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="w-4 h-4 text-green-400" viewBox="0 0 16 16"><path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/></svg>`;
    const chevronIcon = `<svg class="w-4 h-4 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>`;


    // --- Functions ---

    function revealNavLink(linkElement) {
        if (!linkElement) return;
        let parent = linkElement.closest('.folder-links');
        while (parent) {
            parent.classList.remove('hidden');
            const header = parent.previousElementSibling;
            if (header && header.matches('.folder-header')) {
                const icon = header.querySelector('.folder-toggle-icon svg');
                if (icon) icon.classList.add('rotate-90');
            }
            parent = parent.parentElement.closest('.folder-links');
        }
    }

    async function loadContent(filePath, linkElement) {
        if (!filePath) return;
        try {
            contentWrapper.classList.remove('content-animate');
            void contentWrapper.offsetWidth;

            const response = await fetch(`/api/content?path=${encodeURIComponent(filePath)}`);
            if (!response.ok) throw new Error('Failed to fetch content.');

            const markdown = await response.text();
            contentContainer.innerHTML = marked.parse(markdown);

            contentContainer.querySelectorAll(':scope > *').forEach((child, index) => {
                child.style.setProperty('--child-index', index);
            });

            contentContainer.querySelectorAll('pre').forEach(pre => {
                const code = pre.querySelector('code');
                const lang = code.className.replace('language-', '') || 'shell';
                pre.setAttribute('data-lang', lang);
                hljs.highlightElement(code);

                const copyButton = document.createElement('button');
                copyButton.innerHTML = copyIconSVG;
                copyButton.className = 'absolute top-2 right-2 p-1.5 bg-stone-700/50 hover:bg-stone-600/70 rounded-md text-stone-300 transition';
                copyButton.ariaLabel = 'Copy code';
                pre.appendChild(copyButton);

                copyButton.addEventListener('click', () => {
                    navigator.clipboard.writeText(code.innerText).then(() => {
                        copyButton.innerHTML = checkIconSVG;
                        setTimeout(() => { copyButton.innerHTML = copyIconSVG; }, 2000);
                    });
                });
            });

            contentWrapper.classList.add('content-animate');

            document.querySelectorAll('.nav-link').forEach(el => el.classList.remove('active'));
            if (linkElement) {
                linkElement.classList.add('active');
                revealNavLink(linkElement);
            }

            closeSearchModal();
            if (window.innerWidth < 1024) closeSidebar();

            contentWrapper.scrollTo(0, 0);

        } catch (error) {
            console.error('Error loading content:', error);
            contentContainer.innerHTML = '<h1>Error</h1><p>Could not load the document.</p>';
        }
    }

    function buildNav(structure, container) {
        const sortedKeys = Object.keys(structure).sort((a, b) => {
            const aIsFile = a.endsWith('.md');
            const bIsFile = b.endsWith('.md');
            if (aIsFile && !bIsFile) return 1;
            if (!aIsFile && bIsFile) return -1;
            return a.localeCompare(b, undefined, { numeric: true });
        });

        sortedKeys.forEach(key => {
            const value = structure[key];
            if (typeof value === 'object' && Object.keys(value).length > 0) {
                const folderWrapper = document.createElement('div');
                folderWrapper.className = 'folder mt-4 first:mt-0';

                const folderHeader = document.createElement('button');
                folderHeader.className = 'folder-header flex items-center justify-between w-full gap-3 text-sm font-semibold text-stone-400 hover:text-white uppercase py-2 px-2 rounded-md hover:bg-stone-800/60 transition';
                const icon = categoryIcons[key] || categoryIcons['default'];
                folderHeader.innerHTML = `
                    <div class="flex items-center gap-3">
                        ${icon}
                        <span>${key}</span>
                    </div>
                    <span class="folder-toggle-icon">${chevronIcon}</span>
                `;

                const linksWrapper = document.createElement('div');
                linksWrapper.className = 'folder-links pl-4 border-l border-stone-700 ml-4 mt-1 hidden';

                folderWrapper.appendChild(folderHeader);
                folderWrapper.appendChild(linksWrapper);
                container.appendChild(folderWrapper);

                folderHeader.addEventListener('click', () => {
                    linksWrapper.classList.toggle('hidden');
                    folderHeader.querySelector('.folder-toggle-icon svg').classList.toggle('rotate-90');
                });

                buildNav(value, linksWrapper);
            } else if (typeof value === 'string') {
                const link = document.createElement('a');
                link.href = '#';
                link.textContent = key.replace(/(\d+-|\.md)/g, '').replace(/[-_]/g, ' ').trim();
                link.className = 'nav-link block px-3 py-2 rounded-md text-stone-300 hover:bg-stone-700 hover:text-white transition-colors duration-200';
                link.dataset.path = value;
                link.addEventListener('click', e => {
                    e.preventDefault();
                    loadContent(value, link);
                });
                container.appendChild(link);
            }
        });
    }

    async function performSearch() {
        const query = searchInput.value.trim().toLowerCase();
        if (query.length < 2) {
            searchResultsContainer.innerHTML = '';
            return;
        }

        try {
            const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
            const results = await response.json();

            searchResultsContainer.innerHTML = '';
            if (results.length > 0) {
                results.forEach(result => {
                    const item = document.createElement('a');
                    item.href = '#';
                    item.className = 'block p-4 border-b border-stone-700 hover:bg-purple-600/20 rounded-md transition-colors';
                    item.innerHTML = `
                        <div class="font-bold text-purple-300">${result.title}</div>
                        <div class="text-sm text-stone-400 mt-1">${result.context}</div>
                    `;
                    item.addEventListener('click', (e) => {
                       e.preventDefault();
                       const linkElement = document.querySelector(`.nav-link[data-path="${CSS.escape(result.path)}"]`);
                       loadContent(result.path, linkElement);
                    });
                    searchResultsContainer.appendChild(item);
                });
            } else {
                searchResultsContainer.innerHTML = `<div class="p-4 text-center text-stone-500">No results found for "${query}".</div>`;
            }
        } catch (error) {
            console.error('Search failed:', error);
            searchResultsContainer.innerHTML = `<div class="p-4 text-center text-red-400">Search failed. Please try again.</div>`;
        }
    }

    const openSearchModal = () => { searchModal.classList.remove('hidden'); searchInput.focus(); };
    const closeSearchModal = () => { searchModal.classList.add('hidden'); searchInput.value = ''; searchResultsContainer.innerHTML = ''; };
    const openSidebar = () => sidebar.classList.remove('-translate-x-full');
    const closeSidebar = () => sidebar.classList.add('-translate-x-full');

    // --- Event Listeners & Initialization ---

    searchButton.addEventListener('click', openSearchModal);
    searchModalBackdrop.addEventListener('click', closeSearchModal);
    mobileMenuButton.addEventListener('click', openSidebar);
    sidebarCloseButton.addEventListener('click', closeSidebar);

    window.addEventListener('keydown', e => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') { e.preventDefault(); openSearchModal(); }
        if (e.key === 'Escape' && !searchModal.classList.contains('hidden')) { closeSearchModal(); }
    });

    searchInput.addEventListener('keyup', () => { 
        clearTimeout(searchTimeout); 
        searchTimeout = setTimeout(performSearch, 250); 
    });

    async function initialize() {
        try {
            await fetch('/api/docs').then(res => res.json()).then(structure => {
                buildNav(structure, navLinksContainer);
            });

            // **BAGONG LOGIC: Check for URL parameter to open a specific file**
            const urlParams = new URLSearchParams(window.location.search);
            const openPath = urlParams.get('open');

            if (openPath) {
                // Use CSS.escape to handle special characters in paths
                const targetLink = document.querySelector(`.nav-link[data-path="${CSS.escape(openPath)}"]`);
                if (targetLink) {
                    loadContent(targetLink.dataset.path, targetLink);
                    return; // Stop here if we loaded from the URL
                }
            }

            // **FALLBACK: Load default file if no valid 'open' parameter is found**
            const defaultFileLink = 
                document.querySelector('.nav-link[data-path*="introduction.md"]') ||
                document.querySelector('.nav-link[data-path*="started.md"]') ||
                document.querySelector('.nav-link');

            if (defaultFileLink) {
                loadContent(defaultFileLink.dataset.path, defaultFileLink);
            }

        } catch (error) { console.error('Failed to initialize navigation:', error); }
    }

    initialize();
});