import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import data from "./data";
function App() {
  const [markdown, setMarkdown] = useState(data);

  return (
    <>
      <div>
        <section className="markdown">
          <textarea
            className="input"
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
          ></textarea>
          <article className="result">
            <ReactMarkdown>{markdown}</ReactMarkdown>
          </article>
        </section>
      </div>
    </>
  );
}

export default App;
