document.addEventListener('DOMContentLoaded', function() {
    const terminalInput = document.getElementById('terminal-input');
    const outputArea = document.querySelector('.output');

    let commandHistory = [];
    let historyIndex = -1;

    const loaderContainer = document.getElementById('loader-container');
    const terminal = document.getElementById('terminal');
    const shortcutBar = document.getElementById('shortcut-bar');

    setTimeout(function() {
        if (loaderContainer) loaderContainer.style.display = 'none';
        if (terminal) terminal.style.display = 'block';
        if (shortcutBar) shortcutBar.style.display = 'block';
    }, 6000);

    document.addEventListener('click', function() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().then(() => {
                document.documentElement.classList.add('fullscreen');
                if (terminalInput) terminalInput.focus();
            });
        }
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && document.fullscreenElement) {
            document.exitFullscreen().then(() => {
                document.documentElement.classList.remove('fullscreen');
                document.documentElement.style.cursor = 'auto';
            });
        }
    });
    if (terminalInput) {
        terminalInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                const command = terminalInput.value.trim();
                outputArea.innerHTML += `<p><span class="prompt">$</span> ${command}</p>`;

                switch (command.toLowerCase()) {
                    case 'start':
                        outputArea.innerHTML += '<p>About me: I am Aradhya Shaswat, a 15 year old Software Developer currently living in India. I have researched on various topics related to Biotechonlogy, AgriFarming, Cyber Security and Data Science. To explore more commands, type "help".</p>';
                        break;
                    case 'clear':
                        outputArea.innerHTML = '';
                        break;
                    case 'help':
                        outputArea.innerHTML += '<p>Available commands:</p>';
                        outputArea.innerHTML += '<ul>';
                        outputArea.innerHTML += '<li>start - Display information about me</li>';
                        outputArea.innerHTML += '<li>clear - Clear the screen</li>';
                        outputArea.innerHTML += '<li>help - Display this help message</li>';
                        outputArea.innerHTML += '<li>cont - Display the contact information</li>';
                        outputArea.innerHTML += '<li>prj - Display past projects</li>';
                        outputArea.innerHTML += '<li>exp - Display experience level</li>';
                        outputArea.innerHTML += '<li>tools - Display tools</li>';
                        outputArea.innerHTML += '<li>neofetch - About PC</li>';
                        outputArea.innerHTML += '</ul>';
                        break;
                    case 'cont':
                        outputArea.innerHTML += '<p>Email: trentarev@gmail.com</p>';
                    case 'prj':
                        outputArea.innerHTML += '<p>TRENTAREV.com, Friendbase.tech, DiskDefender.IO</p>';
                    case 'exp':
                        outputArea.innerHTML += '<p>COO at TRENTAREV, Software Developer at Kasper Infotech, CEO at Friendbase</p>';
                    case 'tools':
                        outputArea.innerHTML += '<p>C++, C#, C, Python, JS, Flutter, Ruby on Rails, Flutter, Figma, MERN Stack, Next.JS, Django, Discord.py, NeoVim, VSC, VS, Unity3D, Unreal Engine.</p>';
                    default:
                        outputArea.innerHTML += `<p>${command}: command not found</p>`;
                        break;
                }

                commandHistory.push(command);
                historyIndex = commandHistory.length;

                terminalInput.value = '';
            } else if (e.key === 'ArrowUp') {
                if (historyIndex > 0) {
                    historyIndex--;
                    terminalInput.value = commandHistory[historyIndex];
                }
            } else if (e.key === 'ArrowDown') {
                if (historyIndex < commandHistory.length - 1) {
                    historyIndex++;
                    terminalInput.value = commandHistory[historyIndex];
                } else {
                    historyIndex = commandHistory.length;
                    terminalInput.value = '';
                }
            }
        });
    }
});
