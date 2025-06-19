    import { render, screen } from '@testing-library/react';
    import { describe, it, expect } from 'vitest';
    import Header from './../components/Header';
    import AppkitProvider from './../context';

    describe('Header', () => {
      it('renders C.A.T logo', () => {
        render(
        <AppkitProvider>
           <Header />
        </AppkitProvider>
        );
        expect(screen.getByText('C.A.T')).toBeInTheDocument();
      });
    });