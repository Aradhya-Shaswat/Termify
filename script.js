document.addEventListener('DOMContentLoaded', function() {
    const terminalInput = document.getElementById('terminal-input');
    const outputArea = document.querySelector('.output');
    const screen = document.querySelector('.screen'); 

    let commandHistory = [];
    let historyIndex = -1;

    const loaderContainer = document.getElementById('loader-container');
    const terminal = document.getElementById('terminal');
    const shortcutBar = document.getElementById('shortcut-bar');

    const audio = new Audio('/bg.mp3'); 
    audio.loop = true; 
    audio.volume = 0.35; 

    function playBackgroundMusic() {
        if (audio.paused) {
            audio.play();
        }
    }

    function pauseBackgroundMusic() {
        if (!audio.paused) {
            audio.pause();
        }
    }

    function setVolume(level) {
        audio.volume = Math.max(0, Math.min(1, level));
    }

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

    function scrollToBottom() {
        screen.scrollTop = screen.scrollHeight;
    }

    if (terminalInput) {
        terminalInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                const command = terminalInput.value.trim();
                outputArea.innerHTML += `<p><span class="prompt">$</span> ${command}</p>`;

                switch (command.toLowerCase()) {
                    case 'start':
                        outputArea.innerHTML += '<p>About me: I am Aradhya Shaswat, a 15-year-old Software Developer currently living in India. I have researched various topics related to Biotechnology, AgriFarming, Cyber Security, and Data Science. To explore more commands, type "help".</p>';
                        break;
                    case 'clear':
                        outputArea.innerHTML = '';
                        break;
                    case 'help':
                        outputArea.innerHTML += '<p>Available commands:</p>';
                        outputArea.innerHTML += '<ul>';
                        outputArea.innerHTML += '<li>music - Use music play, stop to control background music</li>';
                        outputArea.innerHTML += '<li>volume up - Increase the volume of background music</li>';
                        outputArea.innerHTML += '<li>volume down - Decrease the volume of background music</li>';
                        outputArea.innerHTML += '<li>start - Display information about me</li>';
                        outputArea.innerHTML += '<li>clear - Clear the screen</li>';
                        outputArea.innerHTML += '<li>help - Display this help message</li>';
                        outputArea.innerHTML += '<li>cont - Display the contact information</li>';
                        outputArea.innerHTML += '<li>prj - Display past projects</li>';
                        outputArea.innerHTML += '<li>exp - Display experience level</li>';
                        outputArea.innerHTML += '<li>tools - Display tools</li>';
                        outputArea.innerHTML += '</ul>';
                        break;
                    case 'cont':
                        outputArea.innerHTML += '<p>Email: trentarev@gmail.com</p>';
                        break;
                    case 'prj':
                        outputArea.innerHTML += '<p>Projects:</p>';
                        outputArea.innerHTML += '<ul>';
                        outputArea.innerHTML += '<li><b>TRENTAREV.com:</b> Anonymous Stock Calling Platform</li>';
                        outputArea.innerHTML += '<li><b>Friendbase.tech:</b> A social platform for connecting you with yourself.</li>';
                        outputArea.innerHTML += '<li><b>DiskDefender.IO:</b> A industry ready PC Optimizer</li>';
                        outputArea.innerHTML += '</ul>';
                        break;
                    case 'exp':
                        outputArea.innerHTML += '<p>Experience:</p>';
                        outputArea.innerHTML += '<ul>';
                        outputArea.innerHTML += '<li><b>COO at TRENTAREV:</b> Leading operations and strategic initiatives.</li>';
                        outputArea.innerHTML += '<li><b>Software Developer at Kasper Infotech:</b> Developing software solutions for various clients.</li>';
                        outputArea.innerHTML += '<li><b>CEO at Friendbase:</b> Managing the overall direction and strategy of the company.</li>';
                        outputArea.innerHTML += '</ul>';
                        break;
                    case 'tools':
                        outputArea.innerHTML += '<p>Programming Languages and Tools:</p>';
                        outputArea.innerHTML += '<ul>';
                        outputArea.innerHTML += '<li><b>Languages:</b> C++, C#, C, Python, JavaScript</li>';
                        outputArea.innerHTML += '<li><b>Frameworks:</b> Flutter, Ruby on Rails, MERN Stack, Next.JS, Django</li>';
                        outputArea.innerHTML += '<li><b>Design Tools:</b> Figma</li>';
                        outputArea.innerHTML += '<li><b>Development Tools:</b> NeoVim, Visual Studio Code, Visual Studio, Unity3D, Unreal Engine</li>';
                        outputArea.innerHTML += '<li><b>Other Tools:</b> Discord.py, Discord.js</li>';
                        outputArea.innerHTML += '</ul>';
                        break;
                    case 'music play':
                        playBackgroundMusic();
                        outputArea.innerHTML += '<p>Background music started.</p>';
                        break;
                    case 'music stop':
                        pauseBackgroundMusic();
                        outputArea.innerHTML += '<p>Background music paused.</p>';
                        break;
                    case 'volume up':
                        setVolume(audio.volume + 0.1);
                        outputArea.innerHTML += `<p>Volume increased to ${(audio.volume * 100).toFixed(0)}%.</p>`;
                        break;
                    case 'volume down':
                        setVolume(audio.volume - 0.1);
                        outputArea.innerHTML += `<p>Volume decreased to ${(audio.volume * 100).toFixed(0)}%.</p>`;
                        break;
                    default:
                        outputArea.innerHTML += `<p>${command}: command not found</p>`;
                        break;
                }

                commandHistory.push(command);
                historyIndex = commandHistory.length;

                terminalInput.value = '';

                setTimeout(scrollToBottom, 0);
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
