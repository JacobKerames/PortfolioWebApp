import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import TerminalCommandSection from './TerminalCommandSection';
import './Terminal.css';

const Terminal = () => {
    const asciiArt =`
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
         .:.          .....:---=++==+++++++=====+-=:.......`;

    // Strings for output and their states for handling typing effect
    const name = "Jacob Kerames - Software Engineer";
    const [typedName, setTypedName] = useState('');

    const welcome = "Type 'help' for a list of commands.";
    const [typedWelcome, setTypedWelcome] = useState('');

    // Hook to navigate between routes programmatically.
    const navigate = useNavigate();

    // States to manage inputs and outputs in the terminal.
    const [input, setInput] = useState('');
    const [outputs, setOutputs] = useState([]);

    // State to indicate when the typing effect is complete.
    const [typingComplete, setTypingComplete] = useState(false);

    // Reference to the end of the terminal for auto-scrolling purposes.
    const endOfTerminalRef = useRef(null);

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
                    setOutputs(outputs => [...outputs, { type: 'string', content: 'Opening resume in a new tab...\n' }]);
                    setTimeout(() => {
                        fetch('https://localhost:7130/Pdf/get-pdf', {
                            method: 'GET',
                        })
                        .then(response => response.blob())
                        .then(blob => {
                            const pdfUrl = window.URL.createObjectURL(blob);
                            window.open(pdfUrl, '_blank');
                        })
                        .catch(error => console.error('Error:', error));
                    }, 1500);
                    break;

                // Connect commands
                case 'linkedin':
                    setOutputs(outputs => [...outputs, { type: 'string', content: 'Opening LinkedIn profile in a new tab...\n' }]);
                    setTimeout(() => {
                        window.open('https://www.linkedin.com/in/jacob-kerames/', '_blank');
                    }, 1500);
                    break;
                case 'github':
                    setOutputs(outputs => [...outputs, { type: 'string', content: 'Opening GitHub profile in a new tab...\n' }]);
                    setTimeout(() => {
                        window.open('https://github.com/JacobKerames', '_blank');
                    }, 1500);
                    break;

                // Project commands
                case 'repo':
                    setOutputs(outputs => [...outputs, { type: 'string', content: 'Opening the GitHub repository in a new tab...\n' }]);
                    setTimeout(() => {
                        window.open('https://github.com/JacobKerames/PortfolioWebApp', '_blank');
                    }, 1500);
                    break;
                case 'stock':
                    setOutputs(outputs => [...outputs, { type: 'string', content: 'Starting the Stock Trading Sim...\n' }]);
                    setTimeout(() => {
                        navigate('/stock-trading-sim');
                    }, 1500);
                    break;

                // Terminal commands
                case 'help':
                    // Defines the commands and their descriptions for the 'help' command.
                    const commandSections = [
                        {
                            title: 'ABOUT ME',
                            commands: [
                                { description: 'Download resume', command: 'resume' }
                            ]
                        },
                        {
                            title: 'CONNECT',
                            commands: [
                                { description: 'View my LinkedIn profile', command: 'linkedin' },
                                { description: 'View my GitHub profile', command: 'github' },
                                { description: 'Send me an email', command: 'email' }
                            ]
                        },
                        {
                            title: 'PROJECTS',
                            commands: [
                                { description: 'Open this project\'s GitHub repository', command: 'repo' },
                                { description: 'Run stock trading simulator', command: 'stock' }
                            ]
                        },
                        {
                            title: 'TERMINAL',
                            commands: [
                                { description: 'Display help menu', command: 'help' },
                                { description: 'Clear terminal', command: 'clear' }
                            ]
                        },
                    ];
                    const helpOutput = commandSections.map((section, index) => ({
                        type: 'component',
                        content: <TerminalCommandSection key={section.title + index} section={section} />
                    }));
                    setOutputs(outputs => [...outputs, ...helpOutput]);
                    break;
                case 'clear':
                    setOutputs([]);
                    break;

                // If the command is not recognized, show an error message
                default:
                    setOutputs(outputs => [...outputs, { type: 'string', content: `Command not recognized: ${command}\n` }]);
                    break;
            }
        }
    }, [input, navigate]);

    // Typing effect for name and welcome message
    useEffect(() => {
        const typeOutText = (setText, text, speed, callback = () => { }) => {
            let index = 0;
            let currentText = '';

            const intervalId = setInterval(() => {
                currentText += text.charAt(index);
                setText(currentText);
                index++;

                if (index >= text.length) {
                    clearInterval(intervalId);
                    callback();
                }
            }, speed);

            // Return a cleanup function
            return () => clearInterval(intervalId);
        };

        // Start typing effect for the name and then trigger the fade-in effect
        const clearTypeOutName = typeOutText(setTypedName, name, 80, () => {
            // Trigger the typing effect for the welcome message
            typeOutText(setTypedWelcome, welcome, 40, () => setTypingComplete(true));
        });

        // Cleanup function
        return () => {
            if (clearTypeOutName) {
                clearTypeOutName(); // Call the cleanup function
            }
        };
    }, []);

    // Auto-scrolling effect to keep the latest terminal output in view.
    useEffect(() => {
        if (endOfTerminalRef.current) {
            endOfTerminalRef.current.scrollIntoView({ behavior: "instant" });
        }
    }, [outputs]);

    // Render the Terminal component UI.
    return (
        <div className="terminal">
            <pre className="ascii-art">{asciiArt}</pre>
            <div className="ascii-art-name">{typedName}</div>
            <div className="typed-welcome">{typedWelcome}</div>
            <div className="terminal-output">
                {outputs.map((output, index) => {
                    if (output.type === 'string') {
                        return <span key={index}>{output.content}</span>;
                    } else if (output.type === 'component') {
                        return <React.Fragment key={index}>{output.content}</React.Fragment>;
                    } else {
                        return null;
                    }
                })}
            </div>
            <div ref={endOfTerminalRef} />
            {typingComplete && (
                <div className="terminal-input-container">
                    <span className="terminal-prompt">> </span>
                    <input
                        type="text"
                        className="terminal-input"
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        onKeyDown={handleCommand}
                        autoFocus
                    />
                </div>
            )}
        </div>
    );
};

export default Terminal;
