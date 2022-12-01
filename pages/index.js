import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [animalInput, setAnimalInput] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ animal: animalInput }),
    });
    
    const data = await response.json();
    
    data.result.replace(/(?:\r\n|\r|\n)/g, "<br>");
    setResult(data.result);
    setAnimalInput("");
  }

  return (
    <div>
      <Head>
        <title>Lawra</title>
        {/* <link rel="icon" href="/dog.png" /> */}
      </Head>

      <main className={styles.main}>
       
        <h3>Lawra</h3>
        <h5>Crie uma petição a partir de um resumo</h5>
        <form onSubmit={onSubmit}>
          <textarea
          rows="5" cols="80"
            type="text"
            name="animal"
            placeholder="Descreva o caso"
            value={animalInput}
            onChange={(e) => setAnimalInput(e.target.value)}
          />
          <input type="submit" value="Gerar petição" />
        </form>
        <div className={styles.result}>{
          result && <div className='result' dangerouslySetInnerHTML={{ __html: result }} />
        }</div>
      </main>
    </div>
  );
}
