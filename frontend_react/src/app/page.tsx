export default function Home() {
  return (
    <>
      <h1>Hello, Next.js!</h1>
      <h1 className="text-3xl font-bold underline font-poppins">
        Hello world! Home
      </h1>
      <section className="bg-background text-text-dark py-20 px-6">
        <h1 className="text-hero text-primary-dark font-extrabold">Design System Hero</h1>
        <p className="text-body text-secondary mt-4 max-w-xl font-body">
          Build consistent interfaces faster with design tokens powered by Tailwind.
        </p>
      </section>
    </>
  );
}
