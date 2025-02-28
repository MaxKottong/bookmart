import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Register from './Register';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

global.fetch = jest.fn();

describe('Register Component', () => {

    beforeEach(() => {
        fetch.mockClear();
    });

    test('renders Register form correctly', () => {
        render(
            <BrowserRouter>
                <Register />
            </BrowserRouter>
        );

        expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
    });

    test('shows an error if passwords do not match', async () => {
        render(
            <BrowserRouter>
                <Register />
            </BrowserRouter>
        );

        userEvent.type(screen.getByLabelText(/username/i), 'testuser');
        userEvent.type(screen.getByLabelText(/email/i), 'test@example.com');
        userEvent.type(screen.getByLabelText(/password/i), 'password123');
        userEvent.type(screen.getByLabelText(/confirm password/i), 'differentPassword123');

        userEvent.click(screen.getByRole('button', { name: /register/i }));

        await waitFor(() => expect(screen.getByText(/passwords do not match/i)).toBeInTheDocument());
    });

    test('submits form with correct data and handles success response', async () => {
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({ message: 'Registration Successful!' }),
        });

        render(
            <BrowserRouter>
                <Register />
            </BrowserRouter>
        );

        userEvent.type(screen.getByLabelText(/username/i), 'newuser');
        userEvent.type(screen.getByLabelText(/email/i), 'newuser@example.com');
        userEvent.type(screen.getByLabelText(/password/i), 'password123');
        userEvent.type(screen.getByLabelText(/confirm password/i), 'password123');

        userEvent.click(screen.getByRole('button', { name: /register/i }));

        await waitFor(() => expect(screen.getByText(/registration successful/i)).toBeInTheDocument());
    });

    test('shows an error if the API request fails', async () => {
        fetch.mockResolvedValueOnce({
            ok: false,
            json: async () => ({ message: 'User already exists' }),
        });

        render(
            <BrowserRouter>
                <Register />
            </BrowserRouter>
        );

        userEvent.type(screen.getByLabelText(/username/i), 'existinguser');
        userEvent.type(screen.getByLabelText(/email/i), 'existing@example.com');
        userEvent.type(screen.getByLabelText(/password/i), 'password123');
        userEvent.type(screen.getByLabelText(/confirm password/i), 'password123');

        userEvent.click(screen.getByRole('button', { name: /register/i }));

        await waitFor(() => expect(screen.getByText(/user already exists/i)).toBeInTheDocument());
    });
});
