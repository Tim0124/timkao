export default function Home() {
  return (
    <main>
      {/* Hero */}
      <section className="min-h-screen flex flex-col justify-center px-6 md:px-16 max-w-5xl mx-auto">
        <p className="text-sm text-neutral-500 mb-6">
          Tim Kao — Frontend Engineer
        </p>
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-medium leading-tight tracking-tight">
          在 AI 什麼都能做的時代,
          <br />
          我還是相信
          <br />
          <span className="text-neutral-500">「用心做的東西看得出來」</span>
        </h1>
      </section>
    </main>
  );
}
