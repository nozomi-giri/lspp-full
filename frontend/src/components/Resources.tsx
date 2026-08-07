import { resources } from "../data/resources";

function Resources() {
  return (
    <section className="max-w-container mx-auto px-8 py-16 text-center" id="resources">
      <h2 className="mb-3 text-3xl text-primary">Resources</h2>
      <p className="mb-10 text-text-muted">
        Take a 'byte' into what we cook — explore some great resources to get
        started.
      </p>
      <div className="flex flex-wrap justify-center gap-6">
        {resources.map((resource) => (
          <div
            className="max-w-[250px] flex-1 basis-[220px] cursor-pointer rounded-card border-l-[3px] border-l-accent bg-primary-light px-6 py-7 text-left dark:bg-bg-secondary"
            key={resource.title}
          >
            <div className="mb-5 text-accent">{resource.icon}</div>
            <h3 className="mb-2.5 text-[1.05rem]">{resource.title}</h3>
            <span className="text-sm font-semibold text-accent">
              {resource.linkText} →
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Resources;
