import React from 'react';

const CommandSection = ({ section }) => (
    <>
        {section.title}
        {section.commands.map(cmd => (
            <div key={cmd.command} className="command-entry">
                <span className="command-name">{cmd.command}</span>
                <span className="command-description">{cmd.description}</span>
            </div>
        ))}
    </>
);

export default CommandSection;
