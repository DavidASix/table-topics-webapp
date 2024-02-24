const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const fs = require('fs');

admin.initializeApp();
const db = admin.firestore();

// exports.importQuestions = functions.https.onRequest(async (request, response) => {
//     try {
//       // Read questions from JSON file
//       const questionsData = fs.readFileSync('./questions3.json', 'utf-8');
//       const questions = JSON.parse(questionsData);
  
//       // Add questions to Firestore
//       const batch = admin.firestore().batch();
//       questions.forEach(question => {
//         const docRef = admin.firestore().collection('questions').doc();
//         batch.set(docRef, question);
//       });
//       await batch.commit();
  
//       // Get total document count in 'questions' collection
//       const collectionSnapshot = await admin.firestore().collection('questions').get();
//       const totalDocuments = collectionSnapshot.size;
  
//       response.json({
//         totalDocuments,
//         documentsAdded: questions.length
//       });
//     } catch (error) {
//       console.error('Error importing questions:', error);
//       response.status(500).send('Error importing questions');
//     }
//   });

// Endpoint 1: Return unique category values
exports.getUniqueCategories = functions.https.onRequest(async (request, response) => {
    try {
        const snapshot = await admin.firestore().collection('questions').select('category').get();
        const categories = new Set(snapshot.docs.map(doc => doc.data().category));
        response.json(Array.from(categories));
    } catch (error) {
        console.error('Error getting unique categories:', error);
        response.status(500).send('Error fetching categories');
    }
});

// Endpoint 2: Return one random category
exports.getRandomCategory = functions.https.onRequest(async (request, response) => {
    try {
        const snapshot = await admin.firestore().collection('questions').get();
        const documents = snapshot.docs;

        if (documents.length === 0) {
            response.status(404).send('No categories found');
            return;
        }

        const randomIndex = Math.floor(Math.random() * documents.length);
        const randomCategory = documents[randomIndex].data().category;
        response.json(randomCategory);
    } catch (error) {
        console.error('Error getting random category:', error);
        response.status(500).send('Error fetching category');
    }
});

exports.getQuestionByCategory = functions.https.onRequest(async (request, response) => {
    try {
        // Get and clean category from request body
        const rawCategory = request.body.category;
        if (!rawCategory || typeof rawCategory !== 'string') {
            throw new Error('Missing or invalid "category" in request body');
        }
        const category = rawCategory.trim();

        // Fetch matching questions
        const questionsSnapshot = await admin
            .firestore()
            .collection('questions')
            .where('category', '==', category)
            .get();

        if (questionsSnapshot.empty) {
            response.status(404).send('No questions found for this category');
            return;
        }

        // Select a random question
        const randomIndex = Math.floor(Math.random() * questionsSnapshot.size);
        const randomQuestion = questionsSnapshot.docs[randomIndex].data();

        response.json(randomQuestion);
    } catch (error) {
        console.error('Error getting question by category:', error);
        response.status(500).send('Error fetching question');
    }
});

// Endpoint: Fetch all documents from the 'questions' collection
exports.getQuestions = functions.https.onRequest(async (request, response) => {
    try {
        const questionsSnapshot = await admin.firestore().collection('questions').get();
        const questions = questionsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        response.json(questions);
    } catch (error) {
        console.error('Error fetching questions:', error);
        response.status(500).send('Error fetching questions');
    }
});
