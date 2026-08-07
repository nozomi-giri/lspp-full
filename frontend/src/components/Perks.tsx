import { perks } from "../data/perks";

function Perks() {
  return (
    <section className="max-w-container mx-auto px-8 py-16 text-center" id="perks">
      <h2 className="mb-10 text-3xl text-primary">What are the perks?</h2>
      <div className="flex flex-wrap justify-center gap-6">
        {perks.map((perk) => (
          <div
            className="max-w-[280px] flex-1 basis-[260px] rounded-card border border-border border-l-[3px] border-l-accent bg-card-bg p-6 text-left max-[900px]:basis-[45%] max-[900px]:max-w-[45%] max-[500px]:basis-full max-[500px]:max-w-full"
            key={perk.title}
          >
            <div className="mb-3 text-accent">{perk.icon}</div>
            <h3>{perk.title}</h3>
            <p>{perk.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Perks;
