import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import CommandSection from './CommandSection';
import './Terminal.css';

const Terminal = () => {
    const asciiArt = `
                ...:--....                                           
           :.         ....                                       
          :.       .:::--=:                                      
          :..:.-.::.   ::                                        
          .:::  -     .:                                         
         :.           :.                 
     :-.::.    .=:  .:                                           
  :.  ...  -. :=                                                 
:  :       .. .::                                                
 :          -: .:=                                                
 ...        :+. .+                           .----:::::--        
 .++        .-.  #                          :---:     -=.        
   .=--:.....-. .-:                        :-==:::   -=          
    .::       :.- ..                      .---:... .-=           
      ::       =...-.........:--:..:=-:  .---.     :=.           
       .:.        ...........     :===**=++=-::::::+.            
         .:.          .....:---=++==+++++++=====+-=:.......      
    `;

    // Strings for output and their states for handling typing effect
    const name = "Jacob Kerames - Software Engineer";
    const [typedName, setTypedName] = useState('');

    const welcome = "\nType \"help\" for a list of commands.";
    const [typedWelcome, setTypedWelcome] = useState('');

    // Hook to navigate between routes programmatically.
    const navigate = useNavigate();

    // States to manage inputs and outputs in the terminal.
    const [input, setInput] = useState('');
    const [outputs, setOutputs] = useState([]);

    // State to indicate when the typing effect is complete.
    const [typingComplete, setTypingComplete] = useState(false);

    // State to control the fade-in effect
    const [fadeIn, setFadeIn] = useState(false);

    // Reference to the end of the terminal for auto-scrolling purposes.
    const endOfTerminalRef = useRef(null);

    // Reference to the input element for focusing.
    const inputRef = useRef(null);

    // Defines the commands and their descriptions for the 'help' command.
    const commandSections = [
        {
            title: '\nTERMINAL\n--------',
            commands: [
                { description: 'Display help menu', command: 'help' },
                { description: 'Clear terminal', command: 'clear' }
            ]
        },
        {
            title: '\nPROJECTS\n--------',
            commands: [
                { description: 'Open this project\'s GitHub repository', command: 'repo' },
                { description: 'Run counter project', command: 'counter' }
            ]
        },
        {
            title: '\nQUALIFICATIONS\n--------------',
            commands: [
                { description: 'Download my resume', command: 'resume' },
                { description: 'Overview of my qualifications', command: 'qualifications' }
            ]
        },
        {
            title: '\nCONNECT\n-------',
            commands: [
                { description: 'Go to LinkedIn profile', command: 'linkedin' },
                { description: 'Go to GitHub profile', command: 'github' }
            ]
        }
    ];

    // Process the entered command after the Enter key is pressed.
    const handleCommand = useCallback((e) => {
        if (e.key === 'Enter') {
            // Add the input command to the outputs array
            setOutputs(outputs => [...outputs, { type: 'string', content: `> ${input}\n` }]);

            // Trim and convert the input to lowercase for command recognition.
            const command = input.trim().toLowerCase();

            // Clear the input field
            setInput('');

            switch (command) {
                // Qualifications commands
                case 'resume':
                    setOutputs(outputs => [...outputs, { type: 'string', content: '\nComing soon...' }]);
                    break;
                case 'qualifications':
                    setOutputs(outputs => [...outputs, { type: 'string', content: `
\n\nWORK EXPERIENCE
    Software Engineer at AKN Realty             September 2023 – Present
                            
EDUCATION
    B.S. in Computer Science Summa Cum Laude                    May 2023
    at Colorado State University Global

SKILLS
    • .NET MVC   • React   • C#   • Java   • Python
    • JavaScript   • MS SQL Server   • Git
    • HTML/Bootstrap/CSS`
                    }]);
                    break;

                // Profile commands
                case 'linkedin':
                    setOutputs(outputs => [...outputs, { type: 'string', content: '\nOpening LinkedIn profile in a new tab...' }]);
                    setTimeout(() => {
                        window.open('https://www.linkedin.com/in/jacob-kerames/', '_blank');
                    }, 1500);
                    break;
                case 'github':
                    setOutputs(outputs => [...outputs, { type: 'string', content: '\nOpening GitHub profile in a new tab...' }]);
                    setTimeout(() => {
                        window.open('https://github.com/JacobKerames', '_blank');
                    }, 1500);
                    break;

                // Project commands
                case 'repo':
                    setOutputs(outputs => [...outputs, { type: 'string', content: '\nOpening the GitHub repository in a new tab...' }]);
                    setTimeout(() => {
                        window.open('https://github.com/JacobKerames/PortfolioWebApp', '_blank');
                    }, 1500);
                    break;
                case 'counter':
                    navigate('/counter');
                    break;

                // Terminal commands
                case 'help':
                    const helpOutput = commandSections.map((section, index) => ({
                        type: 'component',
                        content: <CommandSection key={section.title + index} section={section} />
                    }));
                    setOutputs(outputs => [...outputs, ...helpOutput]);
                    break;
                case 'clear':
                    setOutputs([]);
                    break;
                default:
                    // If the command is not recognized, show an error message
                    setOutputs(outputs => [...outputs, { type: 'string', content: `\nCommand not recognized: ${command}` }]);
                    break;
            }
        }
    }, [input, commandSections, navigate]);

    // Typing effect for name and welcome message
    useEffect(() => {
        const typeOutText = (setText, text, speed, delay = 0, callback = () => { }) => {
            let index = 0;
            let currentText = '';

            const timeoutId = setTimeout(() => {
                const intervalId = setInterval(() => {
                    currentText += text.charAt(index);
                    setText(currentText);
                    index++;

                    if (index >= text.length) {
                        clearInterval(intervalId);
                        callback();
                    }
                }, speed);
            }, delay);

            return () => {
                clearTimeout(timeoutId);
            };
        };

        // Start typing effect for the name and then trigger the fade-in effect
        const clearTypeOutName = typeOutText(setTypedName, name, 100, 0, () => {
            // After typing the name, trigger the fade-in effect for the ASCII art
            setFadeIn(true);

            // Trigger the typing effect for the welcome message
            const delay = (name.length * 50);
            const clearTypeOutWelcome = typeOutText(setTypedWelcome, welcome, 30, delay, () => setTypingComplete(true));
        });

        // Cleanup function
        return () => {
            clearTypeOutName();
        };
    }, []);

    // Auto-scrolling effect to keep the latest terminal output in view.
    useEffect(() => {
        if (endOfTerminalRef.current) {
            endOfTerminalRef.current.scrollIntoView({ behavior: "instant" });
        }
    }, [outputs]);

    // Effect to add and remove a specific CSS class to the body element.
    useEffect(() => {
        document.body.classList.add('is-terminal');

        return () => {
            document.body.classList.remove('is-terminal');
        };
    }, []);

    // Function to focus the input element when the terminal is clicked.
    const focusInput = useCallback(() => {
        inputRef.current && inputRef.current.focus();
    }, []);

    // Effect to attach and detach event listener for focusing the input element.
    useEffect(() => {
        const terminalContainer = document.querySelector('.terminal');
        terminalContainer.addEventListener('click', focusInput);

        // Cleanup function
        return () => {
            terminalContainer.removeEventListener('click', focusInput);
        };
    }, []);

    // Render the Terminal component UI.
    return (
        <div className="terminal">
            <div className="terminal-body">
                <pre className={`ascii-art ${fadeIn ? 'ascii-art-fade-in' : ''}`}>
                    {asciiArt}
                </pre>
                <pre className="ascii-art-name">{typedName}</pre>
                <pre className="typed-welcome">{typedWelcome}</pre>
                <pre className="terminal-output">
                    {outputs.map((output, index) => {
                        if (output.type === 'string') {
                            return <span key={index}>{output.content}</span>;
                        } else if (output.type === 'component') {
                            return <React.Fragment key={index}>{output.content}</React.Fragment>;
                        }
                    })}
                </pre>
                <div ref={endOfTerminalRef} />
                {typingComplete && (
                    <div className="terminal-input-container">
                        <span className="terminal-prompt">> </span>
                        <input
                            ref={inputRef}
                            type="text"
                            className="terminal-input"
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            onKeyDown={handleCommand}
                            placeholder="Type your command..."
                            autoFocus
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Terminal;
