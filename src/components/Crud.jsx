import { useState, useEffect } from "react"; // Импорт необходимых модулей React
import axios from "axios"; // Импорт axios для выполнения HTTP запросов

function Crud() {
  const [notes, setNotes] = useState([]); // Состояние для хранения заметок
  const [newNoteContent, setNewNoteContent] = useState(""); // Состояние для содержания
  // новой заметки

  // Функция для получения всех заметок с сервера
  const fetchNotes = async () => {
    try {
      const response = await axios.get("http://localhost:7070/notes"); // Выполнение GET запроса
      setNotes(response.data); // Обновление состояния заметок
      console.log("заметки обновлены")
    } catch (error) {
      console.error("Ошибка при получении заметок:", error); // Обработка ошибок
    }
  };

  // Функция для добавления новой заметки
  const addNote = async () => {
    if (newNoteContent.trim() === "") return; // Проверка на пустое содержание

    try {
      await axios.post("http://localhost:7070/notes", {
        id: 0,
        content: newNoteContent,
      });
      // Выполнение POST запроса
      setNewNoteContent(""); // Очистка поля ввода
      fetchNotes(); // Обновление списка заметок
    } catch (error) {
      console.error("Ошибка при добавлении заметки:", error); // Обработка ошибок
    }
  };

  // Функция для удаления заметки
  const deleteNote = async (id) => {
    try {
      await axios.delete(`http://localhost:7070/notes/${id}`); // Выполнение DELETE запроса
      fetchNotes(); // Обновление списка заметок
    } catch (error) {
      console.error("Ошибка при удалении заметки:", error); // Обработка ошибок
    }
  };

  // Использование эффекта для получения заметок при загрузке компонента
  useEffect(() => {
    fetchNotes(); // Вызов функции получения заметок
  }, []);

  return (
    <div id="app">
      <div className="header-container">
        <h1>Заметки</h1>
        {/* Кнопка обновления */}
        <button
          className="crud-update-btn"
          id="refresh-btn"
          onClick={fetchNotes}
        ></button>
      </div>
      <div id="notes-container">
        {notes.map(
          (
            note // Перебор заметок для отображения
          ) => (
            <div key={note.id} className="note-card">
              <p>{note.content}</p>
              <button className="crud-off-btn" onClick={() => deleteNote(note.id)}></button>{" "}
              {/* Кнопка удаления */}
            </div>
          )
        )}
      </div>
      <div className="footer-container">
        <p className="footer-title">Новая заметка</p>
        <textarea
          id="new-note-content"
          placeholder="Новая заметка"
          value={newNoteContent}
          // Обновление состояния при вводе текста
          onChange={(e) => setNewNoteContent(e.target.value)}
        />
        <button className="add-button" onClick={addNote}></button> {/* Кнопка добавления */}
      </div>
    </div>
  );
}

export default Crud;
