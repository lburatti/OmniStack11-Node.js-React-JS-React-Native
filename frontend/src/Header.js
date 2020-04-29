import React from 'react';

// exportando esse arquivo para outros + criando função
export default function Header({ children }) {
    return (
        <header>
            {/* chamando propriedade, SEMPRE entre '{}' */}
            <h1>{children}</h1>
        </header>
    );
}
