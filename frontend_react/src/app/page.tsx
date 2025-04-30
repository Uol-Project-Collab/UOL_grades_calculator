export default function Home() {
  return (
    <>
      <h1>Hello, Next.js!</h1>
      <h1 className="font-poppins text-3xl font-bold underline">
        Hello world! Home
      </h1>
      <section className="bg-background text-text-dark px-6 py-20">
        <h1 className="text-hero text-primary-dark font-extrabold">
          Design System Hero
        </h1>
        <p className="text-body text-secondary font-body mt-4 max-w-xl">
          Build consistent interfaces faster with design tokens powered by
          Tailwind.
        </p>
      </section>
    </>
  );
}
