import { Button, Container } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="border-b border-line bg-white ">
      <Container className="py-32 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-navy-700">404</p>
        <h1 className="mt-4 text-4xl font-extrabold sm:text-5xl">We couldn&apos;t find that page.</h1>
        <p className="mt-4 text-body">It may have moved. Try the home page or talk to our team.</p>
        <div className="mt-8 flex justify-center gap-3">
          <Button href="/" variant="accent">Go home</Button>
          <Button href="/book-demo" variant="outline">Book a Demo</Button>
        </div>
      </Container>
    </section>
  );
}
