{/* <p> OUMESSAOUD Azzedine: oumessaoud@hotmail.fr</p>  */}

import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import AdminLoginForm from './AdminLoginForm';

test('LoginForm renders correctly', () => {
  const { getByLabelText, getByText } = render(<AdminLoginForm />);

  const usernameInput = getByLabelText('Identifiant');
  const passwordInput = getByLabelText('Mot de passe');
  const submitButton = getByText('Se connecter');

  expect(usernameInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
  expect(submitButton).toBeInTheDocument();
});

test('LoginForm submits with correct credentials', () => {
  const { getByLabelText, getByText } = render(<AdminLoginForm />);

  const usernameInput = getByLabelText('Identifiant');
  const passwordInput = getByLabelText('Mot de passe');
  const submitButton = getByText('Se connecter');

  // Simuler la saisie d'identifiants corrects
  fireEvent.change(usernameInput, { target: { value: 'admin' } });
  fireEvent.change(passwordInput, { target: { value: 'motdepasse' } });

  // Simuler la soumission du formulaire
  fireEvent.click(submitButton);

  // Vous devriez maintenant vérifier la redirection vers le tableau de bord ou un message de succès
  // en fonction de la manière dont vous gérez la redirection dans votre composant.
});

test('LoginForm displays error with incorrect credentials', () => {
  const { getByLabelText, getByText } = render(<AdminLoginForm />);

  const usernameInput = getByLabelText('Identifiant');
  const passwordInput = getByLabelText('Mot de passe');
  const submitButton = getByText('Se connecter');

  // Simuler la saisie d'identifiants incorrects
  fireEvent.change(usernameInput, { target: { value: 'utilisateurincorrect' } });
  fireEvent.change(passwordInput, { target: { value: 'motdepasseincorrect' } });

  // Simuler la soumission du formulaire
  fireEvent.click(submitButton);

  // Vous devriez maintenant vérifier qu'un message d'erreur est affiché en fonction
  // de la manière dont vous gérez les erreurs dans votre composant.
});
