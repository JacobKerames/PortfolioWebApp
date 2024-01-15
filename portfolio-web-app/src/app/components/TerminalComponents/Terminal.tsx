"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useTerminalContext } from "./TerminalContext";
import TerminalCommandSection from "./TerminalCommandSection";

interface TerminalOutput {
  type: string;
  content: string | React.ReactNode;
}

interface Command {
  description: string;
  command: string;
}

interface CommandSection {
  title: string;
  commands: Command[];
}

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
             .:.          .....:---=++==+++++++=====+-=:.......      `;

  // Strings for output and their states for handling typing effect
  const name = "\nJacob Kerames - Software Engineer";
  const [typedName, setTypedName] = useState("");

  const welcome = "Type 'help' for a list of commands.";
  const [typedWelcome, setTypedWelcome] = useState("");

  const router = useRouter();
  const pathname = usePathname();

  // States to manage inputs and outputs in the terminal.
  const [input, setInput] = useState("");

  const {
    setIsTerminalVisible,
    terminalOutputs,
    addTerminalOutput,
    clearTerminalOutputs,
    setIsInputFocused,
  } = useTerminalContext();

  // State to indicate when the typing effect is complete.
  const [typingComplete, setTypingComplete] = useState(false);

  // Reference to the end of the terminal for auto-scrolling purposes.
  const endOfTerminalRef = useRef<HTMLDivElement>(null);

  // Process the entered command after the Enter key is pressed.
  const handleCommand = useCallback(
    (e: { key: string }) => {
      if (e.key === "Enter") {
        // Add the input command to the outputs array
        addTerminalOutput(`> ${input}\n`, "string");

        // Trim and convert the input to lowercase for command recognition.
        const command = input.trim().toLowerCase();

        // Clear the input field
        setInput("");

        switch (command) {
          // Qualifications commands
          case "resume":
            addTerminalOutput("Opening resume in a new tab...\n", "string");
            const pdfUrl =
              "https://portfoliowebapp-backend.azurewebsites.net/Pdf/get-pdf";
            window.open(pdfUrl, "_blank");
            break;

          // Connect commands
          case "linkedin":
            addTerminalOutput(
              "Opening LinkedIn profile in a new tab...\n",
              "string"
            );
            window.open("https://www.linkedin.com/in/jacob-kerames/", "_blank");
            break;
          case "github":
            addTerminalOutput(
              "Opening GitHub profile in a new tab...\n",
              "string"
            );
            window.open("https://github.com/JacobKerames", "_blank");
            break;

          // Project commands
          case "repo":
            addTerminalOutput(
              "Opening the GitHub repository in a new tab...\n",
              "string"
            );
            window.open(
              "https://github.com/JacobKerames/PortfolioWebApp",
              "_blank"
            );
            break;
          case "skills":
            addTerminalOutput(
              "Opening SkillsScope in a new tab...\n",
              "string"
            );
            window.open("https://skillsscope.com/", "_blank");
            break;
          case "stocks":
            addTerminalOutput("Coming soon!\n", "string");
            /*
            addTerminalOutput("Starting the Stock Trading Sim...\n", "string");
            setTimeout(() => {
              router.push("/stocks");
              setIsTerminalVisible(false);
              addTerminalOutput("Stock Trading Sim started.\n", "string");
            }, 1000);
						*/
            break;

          // Terminal commands
          case "help":
            // Defines the commands and their descriptions for the 'help' command.
            const commandSections: CommandSection[] = [
              {
                title: "ABOUT ME",
                commands: [
                  { description: "Download resume", command: "resume" },
                ],
              },
              {
                title: "CONNECT",
                commands: [
                  {
                    description: "View my LinkedIn profile",
                    command: "linkedin",
                  },
                  { description: "View my GitHub profile", command: "github" },
                  { description: "Send me an email", command: "email" },
                ],
              },
              {
                title: "PROJECTS",
                commands: [
                  {
                    description: "Open this project's GitHub repository",
                    command: "repo",
                  },
                  {
                    description: "Open SkillsScope",
                    command: "skills",
                  },
                  {
                    description: "Run stock trading simulator",
                    command: "stocks",
                  },
                ],
              },
              {
                title: "TERMINAL",
                commands: [
                  { description: "Display help menu", command: "help" },
                  { description: "Clear terminal", command: "clear" },
                ],
              },
            ];
            const helpOutput = commandSections.map((section, index) => ({
              type: "component",
              content: (
                <TerminalCommandSection
                  key={section.title + index}
                  section={section}
                />
              ),
            }));
            helpOutput.forEach((output) =>
              addTerminalOutput(output.content, output.type)
            );
            break;
          case "clear":
            clearTerminalOutputs();
            break;

          // If the command is not recognized, show an error message
          default:
            addTerminalOutput(`Command not recognized: ${command}\n`, "error");
            break;
        }
      }
    },
    [
      input,
      router,
      setIsTerminalVisible,
      addTerminalOutput,
      clearTerminalOutputs,
    ]
  );

  // Typing effect for name and welcome message
  useEffect(() => {
    if (pathname === "/") {
      const typeOutText = (
        setText: (value: string) => void,
        text: string,
        speed: number,
        delay: number = 0,
        callback: () => void = () => {}
      ) => {
        let index = 0;
        let currentText = "";

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

        // Return a cleanup function
        return () => {
          clearTimeout(timeoutId);
        };
      };

      // Start typing effect for the name and then trigger the fade-in effect
      const clearTypeOutName = typeOutText(setTypedName, name, 50, 0, () => {
        // Trigger the typing effect for the welcome message
        const delay = name.length * 10;
        typeOutText(setTypedWelcome, welcome, 20, delay, () =>
          setTypingComplete(true)
        );
      });

      // Cleanup function
      return () => {
        if (clearTypeOutName) {
          clearTypeOutName(); // Call the cleanup function
        }
      };
    } else {
      // Directly set the values without typing effect
      setTypedName(name);
      setTypedWelcome(welcome);
      setTypingComplete(true);
    }
  }, [pathname]);

  // Auto-scrolling effect to keep the latest terminal output in view.
  useEffect(() => {
    if (endOfTerminalRef.current) {
      endOfTerminalRef.current.scrollIntoView({ behavior: "instant" });
    }
  }, [terminalOutputs]);

  // Render the Terminal component UI.
  return (
    <div className="terminal">
      <pre className="ascii-art">{asciiArt}</pre>
      <div className="ascii-art-name">{typedName}</div>
      <div className="typed-welcome">{typedWelcome}</div>
      <div className="terminal-output">
        {terminalOutputs.map((output: TerminalOutput, index: number) => {
          if (output.type === "string") {
            return <span key={index}>{output.content}</span>;
          } else if (output.type === "error") {
            return (
              <span key={index}>
                <span style={{ color: "#F52814" }}>ERR! </span>
                {output.content}
              </span>
            );
          } else if (output.type === "component") {
            return (
              <React.Fragment key={index}>{output.content}</React.Fragment>
            );
          } else {
            return null;
          }
        })}
      </div>
      <div ref={endOfTerminalRef} />
      {typingComplete && (
        <div className="terminal-input-container">
          <span className="terminal-prompt">&gt; </span>
          <input
            type="text"
            className="terminal-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleCommand}
            autoFocus
            onFocus={() => setIsInputFocused(true)}
            onBlur={() => setIsInputFocused(false)}
          />
        </div>
      )}
    </div>
  );
};

export default Terminal;
