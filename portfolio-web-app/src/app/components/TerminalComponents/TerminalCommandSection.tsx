import React from 'react';

interface Command {
    command: string;
    description: string;
}

interface TerminalCommandSectionProps {
    section: {
        title: string;
        commands: Command[];
    };
}

const TerminalCommandSection: React.FC<TerminalCommandSectionProps> = ({ section }) => (
    <>
        <span className="command-section">{section.title}</span>
        {section.commands.map((cmd: Command) => (
            <div key={cmd.command} className="command-entry">
                <span className="command-name">{cmd.command}</span>
                <span className="command-description">{cmd.description}</span>
            </div>
        ))}
    </>
);

export default TerminalCommandSection;
