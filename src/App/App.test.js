import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';



describe("App Component", () => {
  describe("Pomodoro btn", () => {
    it("should be in the document", () => {
      render(<App />);
      const pomodoroBtn = screen.getByText("Pomodoro");
      expect(pomodoroBtn).toBeInTheDocument();
    });

    it("should change the pageType state to 'Pomodoro' when clicked", () => {
      render(<App />);
      const pomodoroBtn = screen.getByText("Pomodoro");
      const appContainer = screen.getByTestId("app-container")
      fireEvent.click(pomodoroBtn);
      expect(appContainer).toHaveClass("container pomodoro")
    })

    it("should stop the timer when clicked", () => {
      render(<App />);
      const setIsTimerActiveMock = jest.spyOn(global, 'setIsTimerActive');
      const pomodoroBtn = screen.getByText("Pomodoro");
      fireEvent.click(pomodoroBtn);
      expect(setIsTimerActiveMock).toHaveBeenCalled()
    })
  })
})
