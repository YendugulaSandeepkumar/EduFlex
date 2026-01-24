import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";

export default function Quiz() {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    API.get(`/quiz/${id}`).then(res => setQuiz(res.data));
  }, []);

  const submit = async () => {
    const res = await API.post("/quiz/submit", {
      topicId: id,
      answers,
      styleUsed: "R"
    });

    alert(`Score: ${res.data.score}%`);
    if (!res.data.passed) alert("Choose another style");
  };

  if (!quiz) return null;

  return (
    <div>
      <h2>Quiz</h2>
      {quiz.questions.map((q, i) => (
        <div key={i}>
          <p>{q.question}</p>
          {q.options.map((o, j) => (
            <label key={j}>
              <input
                type="radio"
                name={i}
                onChange={() => {
                  const a = [...answers];
                  a[i] = j;
                  setAnswers(a);
                }}
              />
              {o}
            </label>
          ))}
        </div>
      ))}
      <button onClick={submit}>Submit Quiz</button>
    </div>
  );
}
