// =============================================
// PROJECTS DATA
// =============================================

// This file contains the project data to be rendered by projects.js
// Edit this file to add, remove, or modify projects

const projectsData = [
    {
        icon: '😊',
        title: 'Facial Emotion Recognition',
        description: 'ML model to identify facial expressions using deep learning techniques. Classifies emotions from facial features.',
        technologies: ['Deep Learning', 'Computer Vision', 'TensorFlow'],
        link: 'emotion-recognition.html',
        isLiveDemo: true
    },
    {
        icon: '👁️',
        title: 'Eye Gaze Estimation',
        description: 'RNN-based mechanism for predicting eye gaze using Recurrent Neural Networks for advanced human-computer interaction.',
        technologies: ['RNN', 'Deep Learning', 'Computer Vision'],
        link: 'https://github.com/Grover1204/Eye-Gaze-Estimation'
    },
    {
        icon: '📈',
        title: 'Stock Price Prediction',
        description: 'Predict stock prices of mutual funds and ETFs using machine learning and financial data analysis.',
        technologies: ['ML', 'Finance', 'Time Series'],
        link: 'https://github.com/Grover1204/Stock-price-prediction'
    }
];

// Make it globally available
window.projectsData = projectsData;
