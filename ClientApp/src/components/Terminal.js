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
-  :       .. .::                                                
  :         -: .:=                                                
 ...        :+. .+                           .----:::::--        
 .++        .-.  #                          :---:     -=.        
   .=--:.....-. .-:                        :-==:::   -=          
    .::       :.- ..                      .---:... .-=           
      ::       =...-.........:--:..:=-:  .---.     :=.           
       .:.        ...........     :===**=++=-::::::+.            
         .:.          .....:---=++==+++++++=====+-=:.......      
    `;
    const navigate = useNavigate();
    const [input, setInput] = useState('');
    const [outputs, setOutputs] = useState(asciiArt); // Start with an empty string
    const [currentText, setCurrentText] = useState(''); // Holds the current text to display
    const welcomeMessage = '\nJacob Kerames - Software Engineer\n\nType "help" for a list of commands.';
    const endOfTerminalRef = useRef(null); // Ref to the end of the terminal
    const Cursor = () => <span className="terminal-cursor">&nbsp;</span>;

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

    const commandSections = [
        {
            title: '\n\nGeneral:',
            commands: [
                { description: 'Display help menu', command: 'help' },
                // Other general commands...
            ],
        },
        {
            title: '\nProjects:',
            commands: [
                { description: 'Counter Project', command: 'counter' },
                // Other project-specific commands...
            ],
        },
        // More sections as needed...
    ];

    const CommandSection = ({ section }) => (
        <>
            {section.title}
            {section.commands.map((cmd, index) => (
                <div key={index} className="command-entry">
                    <span className="command-description">{cmd.description}</span>
                    <span className="command-name">{cmd.command}</span>
                </div>
            ))}
        </>
    );

    // Function to handle command input, modify as needed
    const handleCommand = (e) => {
        if (e.key === 'Enter') {
            // Add the input command to the outputs array
            setOutputs(outputs => [...outputs, `\n> ${input}`]);

            // Process the command
            const command = input.trim().toLowerCase();

            switch (command) {
                case 'help':
                    // Map through each section and create a CommandSection component for each
                    const helpOutput = commandSections.map((section, index) => (
                        <CommandSection key={index} section={section} />
                    ));

                    // Update your output state to include the helpOutput components
                    setOutputs(outputs => [...outputs, ...helpOutput]);
                    break;
                case 'counter':
                    navigate('/counter'); // Navigate to the counter page
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
        // Function to simulate the typing effect
        const typeOutText = (text, index = 0) => {
            if (index < text.length) {
                // Append the next character
                setOutputs(current => current + text[index]);
                setTimeout(() => typeOutText(text, index + 1), 50); // Adjust typing speed as needed
            }
        };
        typeOutText(welcomeMessage); // Start the typing effect
    }, []);

    return (
        <div className="terminal">
            <div className="terminal-body">
                <pre className="terminal-output">{outputs}</pre>
                <div ref={endOfTerminalRef} />
                <div className="terminal-input-container">
                    <span className="terminal-prompt">> </span>
                    <input
                        type="text"
                        className="terminal-input"
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        onKeyDown={handleCommand}
                        placeholder="Type your command..."
                        autoFocus
                    />
                </div>
            </div>
        </div>
    );
};

export default Terminal;
