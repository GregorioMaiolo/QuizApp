
import { Component } from '@angular/core';

type Category = 'Informatik' | 'Allgemeinwissen';
type Screen = 'start' | 'quiz' | 'result';

interface Question {
  category: Category;
  text: string;
  answers: string[];
  correctAnswer: number;
}

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  screen: Screen = 'start';

  selectedCategory: Category = 'Informatik';
  questions: Question[] = [];
  currentIndex = 0;
  selectedAnswer: number | null = null;
  score = 0;

  allQuestions: Question[] = [
    {
      category: 'Informatik',
      text: 'Was bedeutet HTML?',
      answers: [
        'HyperText Markup Language',
        'High Transfer Machine Language',
        'Home Tool Management Language',
        'Hyperlink Text Main Language'
      ],
      correctAnswer: 0
    },
    {
      category: 'Informatik',
      text: 'Welche Sprache wird häufig für Webseiten verwendet?',
      answers: ['Java', 'JavaScript', 'C++', 'SQL'],
      correctAnswer: 1
    },
    {
      category: 'Informatik',
      text: 'Was ist eine Variable?',
      answers: [
        'Ein Speicherplatz für einen Wert',
        'Ein Computerbildschirm',
        'Ein Internetbrowser',
        'Ein Betriebssystem'
      ],
      correctAnswer: 0
    },
    {
      category: 'Informatik',
      text: 'Wofür steht CSS?',
      answers: [
        'Computer Style System',
        'Creative Software Setup',
        'Cascading Style Sheets',
        'Code Styling Service'
      ],
      correctAnswer: 2
    },
    {
      category: 'Informatik',
      text: 'Was ist ein Array?',
      answers: [
        'Eine Datenbank',
        'Eine Sammlung von Werten',
        'Eine Programmiersprache',
        'Ein HTML-Element'
      ],
      correctAnswer: 1
    },
    {
      category: 'Allgemeinwissen',
      text: 'Wie viele Kantone hat die Schweiz?',
      answers: ['20', '24', '26', '28'],
      correctAnswer: 2
    },
    {
      category: 'Allgemeinwissen',
      text: 'Welcher Planet ist der Sonne am nächsten?',
      answers: ['Mars', 'Venus', 'Erde', 'Merkur'],
      correctAnswer: 3
    },
    {
      category: 'Allgemeinwissen',
      text: 'Wie viele Minuten hat eine Stunde?',
      answers: ['30', '45', '60', '100'],
      correctAnswer: 2
    },
    {
      category: 'Allgemeinwissen',
      text: 'Welche Farbe entsteht aus Blau und Gelb?',
      answers: ['Grün', 'Violett', 'Orange', 'Rot'],
      correctAnswer: 0
    },
    {
      category: 'Allgemeinwissen',
      text: 'Wie viele Tage hat ein Schaltjahr?',
      answers: ['364', '365', '366', '367'],
      correctAnswer: 2
    }
  ];

  get currentQuestion(): Question {
    return this.questions[this.currentIndex];
  }

  get progress(): number {
    return ((this.currentIndex + 1) / this.questions.length) * 100;
  }

  get resultPercentage(): number {
    return Math.round((this.score / this.questions.length) * 100);
  }

  startQuiz(): void {
    this.questions = this.allQuestions.filter(
      question => question.category === this.selectedCategory
    );

    this.currentIndex = 0;
    this.selectedAnswer = null;
    this.score = 0;
    this.screen = 'quiz';
  }

  selectAnswer(index: number): void {
    if (this.selectedAnswer !== null) {
      return;
    }

    this.selectedAnswer = index;

    if (index === this.currentQuestion.correctAnswer) {
      this.score++;
    }
  }

  nextQuestion(): void {
    if (this.selectedAnswer === null) {
      return;
    }

    if (this.currentIndex < this.questions.length - 1) {
      this.currentIndex++;
      this.selectedAnswer = null;
    } else {
      this.screen = 'result';
    }
  }

  restartQuiz(): void {
    this.screen = 'start';
    this.selectedAnswer = null;
    this.currentIndex = 0;
    this.score = 0;
  }
}
