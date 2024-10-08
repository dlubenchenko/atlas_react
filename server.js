import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors'; // Імпортуємо cors

const app = express();

// Налаштування CORS
const corsOptions = {
    origin: 'http://localhost:5173', // Дозволяємо запити тільки з цього домену
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Дозволяємо тільки ці методи
    allowedHeaders: ['Content-Type'], // Дозволяємо заголовок Content-Type
};

app.use(cors(corsOptions)); // Використовуємо налаштування CORS
app.use(express.json());

// Підключення до MongoDB
const mongoUri = process.env.MONGODB_URI;

mongoose.connect(mongoUri, {})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

// Схема та модель для контактів
const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
});

const Contact = mongoose.model('Contact', contactSchema);

// API маршрути
app.get('/contacts', async (req, res) => {
    const contacts = await Contact.find();
    res.json(contacts);
});

app.post('/contacts', async (req, res) => {
    const newContact = new Contact(req.body);
    await newContact.save();
    res.json(newContact);
});

app.put('/contacts/:id', async (req, res) => {
    const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedContact);
});

app.delete('/contacts/:id', async (req, res) => {
    await Contact.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
});

// Запуск сервера
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
