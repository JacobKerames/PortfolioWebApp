import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
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
    const [typedArt, setTypedArt] = useState('');
    const name = "Jacob Kerames - Software Engineer";
    const [typedName, setTypedName] = useState('');
    const welcome = "\nType \"help\" for a list of commands.";
    const [typedWelcome, setTypedWelcome] = useState('');

    const navigate = useNavigate();
    const [input, setInput] = useState('');
    const [outputs, setOutputs] = useState('');
    const [typingComplete, setTypingComplete] = useState(false);
    
    const endOfTerminalRef = useRef(null); // Ref to the end of the terminal
    const inputRef = useRef(null);

    const commandSections = [
        {
            title: '\nPROFILES',
            commands: [
                { description: 'Open LinkedIn profile', command: 'linkedin' },
                { description: 'Open GitHub profile', command: 'github' },
                // Other project-specific commands...
            ],
        },
        {
            title: '\nPROJECTS',
            commands: [
                { description: 'Open this project\'s GitHub repository', command: 'repo' },
                { description: 'Run counter Project', command: 'counter' },
                // Other project-specific commands...
            ],
        },
        {
            title: '\nTERMINAL',
            commands: [
                { description: 'Display help menu', command: 'help' },
                { description: 'Clear terminal input and output', command: 'clear' },
                // Other general commands...
            ],
        },
        // More sections as needed...
    ];

    const CommandSection = ({ section }) => (
        <>
            {section.title}
            {section.commands.map((cmd, index) => (
                <div key={index} className="command-entry">
                    <span className="command-name">{cmd.command}</span>
                    <span className="command-description">{cmd.description}</span>
                </div>
            ))}
        </>
    );

    // Function to handle command input, modify as needed
    const handleCommand = (e) => {
        if (e.key === 'Enter') {
            // Add the input command to the outputs array
            setOutputs(outputs => [...outputs, `> ${input}\n`]);

            // Process the command
            const command = input.trim().toLowerCase();

            switch (command) {
                // Profile commands
                case 'linkedin':
                    setOutputs(outputs => [...outputs, '\nOpening LinkedIn profile in a new tab...']);
                    setTimeout(() => {
                        window.open('https://www.linkedin.com/in/jacob-kerames/', '_blank');
                    }, 1500);
                    break;
                case 'github':
                    setOutputs(outputs => [...outputs, '\nOpening GitHub profile in a new tab...']);
                    setTimeout(() => {
                        window.open('https://github.com/JacobKerames', '_blank');
                    }, 1500);
                    break;

                // Project commands
                case 'repo':
                    setOutputs(outputs => [...outputs, '\nOpening the GitHub repository in a new tab...']);
                    setTimeout(() => {
                        window.open('https://github.com/JacobKerames/PortfolioWebApp', '_blank');
                    }, 1500);
                    break;
                case 'counter':
                    navigate('/counter'); // Navigate to the counter page
                    break;

                // Terminal commands
                case 'help':
                    // Map through each section and create a CommandSection component for each
                    const helpOutput = commandSections.map((section, index) => (
                        <CommandSection key={index} section={section} />
                    ));
                    // Update your output state to include the helpOutput components
                    setOutputs(outputs => [...outputs, ...helpOutput]);
                    break;
                case 'clear':
                    setOutputs([]);
                    break;
                default:
                    // If the command is not recognized, show an error message
                    setOutputs(outputs => [...outputs, `\nCommand not recognized: ${command}`]);
                    break;
            }

            // Clear the input field
            setInput('');
        }
    };

    useEffect(() => {
        // Define the typeOutText inside useEffect to capture the latest state with each render
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

        // Start typing effects
        const clearTypeOutName = typeOutText(setTypedName, name, 50);
        let delay = (name.length * 50);
        const clearTypeOutArt = typeOutText(setTypedArt, asciiArt, 1, delay);
        delay += (asciiArt.length * 4) + 10;
        const clearTypeOutWelcome = typeOutText(setTypedWelcome, welcome, 50, delay, () => setTypingComplete(true));

        // Cleanup function
        return () => {
            // Clear timeouts set by typeOutText
            clearTypeOutName();
            clearTypeOutArt();
            clearTypeOutWelcome();
        };
    }, [name, asciiArt, welcome]); // Ensure these are not undefined

    // Scroll to the bottom of the terminal output
    useEffect(() => {
        if (endOfTerminalRef.current) {
            endOfTerminalRef.current.scrollIntoView({ behavior: "instant" });
        }
    }, [outputs]); // Runs every time outputs changes

    useEffect(() => {
        // Add the 'is-terminal' class to the body when the terminal mounts
        document.body.classList.add('is-terminal');

        // Clean up: Remove the class when the terminal unmounts
        return () => {
            document.body.classList.remove('is-terminal');
        };
    }, []);

    // This function focuses the input element
    const focusInput = () => {
        inputRef.current && inputRef.current.focus();
    };

    useEffect(() => {
        const terminalContainer = document.querySelector('.terminal'); // Adjust the selector to your terminal container
        terminalContainer.addEventListener('click', focusInput);

        // Cleanup function
        return () => {
            terminalContainer.removeEventListener('click', focusInput);
        };
    }, []);

    return (
        <div className="terminal">
            <div className="terminal-body">
                <pre className="ascii-art">{typedArt}</pre>
                <pre className="ascii-art-name">{typedName}</pre>
                <pre className="typed-welcome">{typedWelcome}</pre>
                <pre className="terminal-output">{outputs}</pre>
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
