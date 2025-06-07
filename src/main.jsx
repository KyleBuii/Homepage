import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Homepage from './Homepage.jsx';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <h1 className='screen-reader-only'>Homepage</h1>
        <Homepage/>
    </StrictMode>
);