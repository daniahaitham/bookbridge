export async function getRandomQuote() {
  const base = import.meta.env.VITE_QUOTES_API_BASE;

  try {
        const res = await fetch(`${base}/quotes/random?tags=inspirational`);
 
    if (!res.ok) 
        throw new Error(res.status);

    const data = await res.json();
    return data[0].content; 
  } catch (e) {
     return "Keep turning pages. Every chapter counts.";
    console.log(e.message);
  }
}
