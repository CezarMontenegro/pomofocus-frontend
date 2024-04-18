// Header.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Header from '../components/Header/Header';

const mockedOpenSettings = jest.fn()

describe('Header', () => {
  it("should exist a logo named Pomofocus", () => {
    render(<Header openSettings={mockedOpenSettings} dynamicBarLength={60} />);
    expect(screen.getByText("Pomofocus")).toBeInTheDocument();
  })

  it("should exist a button named settings", () => {
    render(<Header openSettings={mockedOpenSettings} dynamicBarLength={60}/>)
    expect(screen.getByText('Settings')).toBeInTheDocument();
  })

  it("should settings container on click in settings button", () => {
    render(<Header openSettings={mockedOpenSettings} dynamicBarLength={60}/>)
    
    const settings = screen.getByText('Settings');

    fireEvent.click(settings);

    expect(mockedOpenSettings).toHaveBeenCalled();
  })



})